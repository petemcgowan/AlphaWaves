package com.buachaillmaith.rainnoiseapp;

import android.net.Uri;
import android.util.Log;

import com.facebook.react.bridge.ReadableMap;
import com.google.android.exoplayer2.MediaItem;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableType;
import java.util.ArrayList;
import java.util.List;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.exoplayer2.PlaybackException;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;


public class ExoPlayerModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;
    private SimpleExoPlayer player;
    private float[] volumes;
    ExoPlayerModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "ExoPlayerModule";
    }


    // Add the MediaItems to player as soon as one has all of them
@ReactMethod
public void preparePlaylist(ReadableArray playlist) {
    Log.d("ExoPlayerModule", "Received playlist strings: " + playlist.toString());

    if (player == null) {
        List<MediaItem> mediaItems = new ArrayList<>();
        volumes = new float[playlist.size()];

        for (int i = 0; i < playlist.size(); i++) {
            ReadableMap item = playlist.getMap(i);
            String uriString = item.getString("name");
            volumes[i] = (float) item.getDouble("volume"); // Store the volumes for later

            int resourceId = reactContext.getResources().getIdentifier(uriString, "raw", reactContext.getPackageName());
            Uri uri = Uri.parse("android.resource://" + reactContext.getPackageName() + "/" + resourceId);
            MediaItem mediaItem = MediaItem.fromUri(uri);
            mediaItems.add(mediaItem);
        }

        try {
            player = new SimpleExoPlayer.Builder(reactContext).build();
            player.setRepeatMode(Player.REPEAT_MODE_ONE);
            player.setMediaItems(mediaItems);
            player.prepare();
        } catch (Exception e) {
            Log.e("ExoPlayerModule", "Error preparing player: " + e.getMessage());
        }

        // Set up the onPositionDiscontinuity listener
        try {
            Player exoPlayer = player;
            exoPlayer.addListener(new Player.Listener() {
                @Override
                public void onPositionDiscontinuity(@Player.DiscontinuityReason int reason) {
                    int currentWindowIndex = player.getCurrentMediaItemIndex();
                    float volume = volumes[currentWindowIndex];
                    player.setVolume(volume);                }
            });
        } catch (Exception e) {
            Log.e("ExoPlayerModule", "Error preparing player: " + e.getMessage());
        }
    }
}
    // Call this method to switch the currently playing track
    @ReactMethod
    public void switchTrack(int index) {
      Log.d("ExoPlayerModule", "Switching to track index: " + index);
        player.seekTo(index, 0);
    }

    @ReactMethod
    public void pauseTrack() {
        if (player != null) {
            player.setPlayWhenReady(false);
        }
    }

    @ReactMethod
    public void playTrack() {
        if (player != null) {
            player.setPlayWhenReady(true);
        }
    }

    @ReactMethod
    public void isTrackPlaying(Callback callback) {
        boolean isPlaying = false;
        if (player != null) {
            isPlaying = player.isPlaying();
        }
        callback.invoke(isPlaying);
    }
}
