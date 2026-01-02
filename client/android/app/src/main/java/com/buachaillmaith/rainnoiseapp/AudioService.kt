package com.buachaillmaith.rainnoiseapp

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import androidx.media3.common.MediaItem
import androidx.media3.common.Player
import androidx.media3.exoplayer.ExoPlayer

class AudioService : Service() {
    private var player: ExoPlayer? = null
    private val CHANNEL_ID = "AlphaWaves_Background"
    private val NOTIFICATION_ID = 1

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val action = intent?.action
        val url = intent?.getStringExtra("URL")
        val volume = intent?.getFloatExtra("VOLUME", 1.0f) ?: 1.0f

        when (action) {
            "PLAY" -> if (url != null) play(url, volume)
            "PAUSE" -> player?.pause()
            "STOP" -> stopAudio()
        }
        return START_STICKY
    }

    private fun play(url: String, volume: Float) {
        // 1. Create Channel
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(CHANNEL_ID, "Background Audio", NotificationManager.IMPORTANCE_LOW)
            getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
        }

        // 2. Build Notification
        val notification: Notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Alpha Waves")
            .setContentText("Playing...")
            .setSmallIcon(R.mipmap.ic_launcher) // Use your app icon
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()

        // 3. START FOREGROUND (Stops the 20s Crash)
        startForeground(NOTIFICATION_ID, notification)

        // 4. Init Player
        if (player == null) {
            player = ExoPlayer.Builder(this).build()
        }

        val uri = if (url.startsWith("http")) Uri.parse(url) else Uri.parse("file://$url")
        val mediaItem = MediaItem.fromUri(uri)

        player?.setMediaItem(mediaItem)
        player?.repeatMode = Player.REPEAT_MODE_ONE
        player?.volume = volume
        player?.prepare()
        player?.play()
    }

    private fun stopAudio() {
        player?.release()
        player = null
        stopForeground(STOP_FOREGROUND_REMOVE)
        stopSelf()
    }

    override fun onDestroy() {
        player?.release()
        super.onDestroy()
    }
}