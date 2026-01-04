import {Platform} from 'react-native'
import RNFS from 'react-native-fs'
import {AudioManager, Player} from 'react-native-audio-playback' // iOS Lib
import GaplessAudio from '../native/GaplessAudio' // Android Native Module (Your new code)
import {getLocalPath} from './FileService'

class SoundManager {
  // --- iOS STATE (Preserved) ---
  private iosPlayers: Map<number | string, Player> = new Map()
  private iosLoadingPromises: Map<number | string, Promise<Player | null>> =
    new Map()

  // --- SHARED STATE ---
  private activeSoundId: number | string | null = null

  public async preloadSounds(sounds: any[]) {
    // ===========================
    // ANDROID PATH (Native Service)
    // ===========================
    if (Platform.OS === 'android') {
      // We don't need to "setup" the native service ahead of time.
      // It starts automatically when we call 'prepare' in the play method.
      return
    }

    // ===========================
    // iOS PATH (Parallel Preload - Preserved)
    // ===========================
    console.log(`[SoundManager-iOS] 🚀 Starting Parallel Preload...`)
    const startTime = performance.now()

    try {
      await AudioManager.shared.setupAudioStream({
        sampleRate: 44100,
        channelCount: 2,
      })
      await AudioManager.shared.openAudioStream()
    } catch (e) {}

    const criticalBatch = sounds.slice(0, 4)
    const backgroundBatch = sounds.slice(4)

    await Promise.all(criticalBatch.map(sound => this.loadIosSound(sound)))

    Promise.all(backgroundBatch.map(sound => this.loadIosSound(sound))).then(
      () => {
        const totalTime = (performance.now() - startTime).toFixed(0)
        console.log(
          `[SoundManager-iOS] 🏁 Full Preload Complete in ${totalTime}ms`,
        )
      },
    )
  }

  // --- iOS INTERNAL LOADER (Preserved) ---
  private async loadIosSound(sound: any): Promise<Player | null> {
    const sourceKey = sound.audioFile || sound.remoteAudioUrl
    if (!sourceKey) return null

    if (this.iosPlayers.has(sourceKey)) return this.iosPlayers.get(sourceKey)!
    if (this.iosLoadingPromises.has(sourceKey))
      return this.iosLoadingPromises.get(sourceKey)!

    const loadPromise = (async () => {
      try {
        const player = await AudioManager.shared.loadSound(sourceKey)
        if (player) {
          player.loopSound(true)
          player.setVolume(sound.volume || 1.0)
          this.iosPlayers.set(sourceKey, player)
          return player
        }
      } catch (e) {
        console.error(`[iOS] Failed to load ${sound.id}`, e)
      }
      return null
    })()

    this.iosLoadingPromises.set(sourceKey, loadPromise)
    return loadPromise
  }

  // --- THE PLAY METHOD ---
  public async play(sound: any, volume: number = 1.0) {
    const sourceKey = sound.audioFile || sound.remoteAudioUrl
    if (!sourceKey) return

    this.activeSoundId = sourceKey

    // ===========================
    // ANDROID PATH (Custom Native Module)
    // ===========================
    if (Platform.OS === 'android') {
      const url = sound.remoteAudioUrl
      if (!url) return

      // Resolve Path (Disk vs Network)
      const localPath = getLocalPath(url)
      const finalPath = (await RNFS.exists(localPath)) ? localPath : url

      console.log('[Android] Native Module Loading:', finalPath)

      // Call your Kotlin Module
      // This starts the AudioService foreground service automatically
      try {
        await GaplessAudio.prepare(finalPath, volume)
        // GaplessAudio.play() is called implicitly by prepare in our POC logic,
        // but we can call it explicitly if your module requires it.
        GaplessAudio.play()
      } catch (e) {
        console.error('Native Audio Failed', e)
      }
      return
    }

    // ===========================
    // iOS PATH (Library - Preserved)
    // ===========================
    let player = this.iosPlayers.get(sourceKey)

    if (!player) {
      player = (await this.loadIosSound(sound)) || undefined
    }

    if (this.activeSoundId !== sourceKey) return

    if (player) {
      this.iosPlayers.forEach((p, k) => {
        if (k !== sourceKey) p.pauseSound()
      })

      player.setVolume(volume)
      player.playSound()
    }
  }

  // --- THE PAUSE METHOD ---
  public pause(requestingSound?: any) {
    const requestingId = requestingSound
      ? requestingSound.audioFile || requestingSound.remoteAudioUrl
      : null

    if (requestingId && requestingId !== this.activeSoundId) return

    if (Platform.OS === 'android') {
      GaplessAudio.pause()
    } else {
      if (this.activeSoundId && this.iosPlayers.has(this.activeSoundId)) {
        this.iosPlayers.get(this.activeSoundId)?.pauseSound()
      }
    }
  }
}

export const soundManager = new SoundManager()
