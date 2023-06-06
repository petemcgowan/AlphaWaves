package com.buachaillmaith.rainnoiseapp;

import android.net.Uri;
import android.util.Log;

import com.google.android.exoplayer2.MediaItem;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableType;
import java.util.ArrayList;
import java.util.List;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.SimpleExoPlayer;


public class ExoPlayerModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;
    private SimpleExoPlayer player;

    ExoPlayerModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "ExoPlayerModule";
    }


    // Add the MediaItems to  player as soon as one has all of them
    @ReactMethod
    public void preparePlaylist(ReadableArray uriStrings) {

        if (player == null) {
            List<MediaItem> mediaItems = new ArrayList<>();

            for (int i = 0; i < uriStrings.size(); i++) {
                if (uriStrings.getType(i) == ReadableType.String) {
                    String uriString = uriStrings.getString(i);
                    int resourceId = reactContext.getResources().getIdentifier(uriString, "raw", reactContext.getPackageName());
                    Uri uri = Uri.parse("android.resource://" + reactContext.getPackageName() + "/" + resourceId);
                    MediaItem mediaItem = MediaItem.fromUri(uri);
                    mediaItems.add(mediaItem);
                }
            }

            player = new SimpleExoPlayer.Builder(reactContext).build();
            player.setRepeatMode(Player.REPEAT_MODE_ONE);

            player.setMediaItems(mediaItems);
            player.prepare();
        }
    }

    // Call this method to switch the currently playing track
    @ReactMethod
    public void switchTrack(int index) {
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
