package com.buachaillmaith.rainnoiseapp

//import android.app.NotificationChannel
//import android.app.NotificationManager
//import android.app.PendingIntent
//import android.content.Context
//import android.graphics.Bitmap
//import android.net.Uri
//import android.os.Build
//import androidx.annotation.Nullable
//import com.facebook.react.bridge.*


import android.content.Intent
import android.net.Uri
import android.os.Build
import com.facebook.react.bridge.*


// Media3 Imports
//import androidx.media3.common.MediaItem
//import androidx.media3.common.Player
//import androidx.media3.exoplayer.ExoPlayer
//import androidx.media3.ui.PlayerNotificationManager

class GaplessAudioModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

//    private var player: ExoPlayer? = null
//    private var playerNotificationManager: PlayerNotificationManager? = null
//    private val NOTIFICATION_CHANNEL_ID = "alphawaves_audio_channel"
//    private val NOTIFICATION_ID = 123

    override fun getName(): String {
        return "GaplessAudio"
    }

    @ReactMethod
    fun prepare(path: String, volume: Double, promise: Promise) {
        try {
            val context = reactApplicationContext
            val intent = Intent(context, AudioService::class.java)
            intent.action = "PLAY"
            intent.putExtra("URL", path)
            intent.putExtra("VOLUME", volume.toFloat())

            // Start the Service
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(intent)
            } else {
                context.startService(intent)
            }
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("error", e.message)
        }
    }

    @ReactMethod
    fun play() {
//        UiThreadUtil.runOnUiThread {
//            player?.play()
//        }
    }

    @ReactMethod
    fun pause() {
        val intent = Intent(reactApplicationContext, AudioService::class.java)
        intent.action = "PAUSE"
        reactApplicationContext.startService(intent)
    }

    @ReactMethod
    fun stop() {
        val intent = Intent(reactApplicationContext, AudioService::class.java)
        intent.action = "STOP"
        reactApplicationContext.startService(intent)
    }

    @ReactMethod
    fun setVolume(volume: Double) { // FIXED: Input is Double
//        UiThreadUtil.runOnUiThread {
//            player?.volume = volume.toFloat()
//        }
    }

    // Cleanup on reload/exit
//    override fun onCatalystInstanceDestroy() {
//        UiThreadUtil.runOnUiThread {
//            playerNotificationManager?.setPlayer(null)
//            player?.release()
//            player = null
//        }
//    }
}