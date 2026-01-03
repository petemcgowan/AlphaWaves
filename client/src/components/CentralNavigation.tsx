import React, {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {MatrixPlayer} from '../screens/MatrixPlayer.tsx'
import OnboardingDeck from '../screens/OnboardingDeck'
import {useSelector, useDispatch} from 'react-redux'
import {rainSounds, noiseSounds, thetaSounds} from '../model/data'
import {AudioManager} from 'react-native-audio-playback'

import {
  initVideoDirectory,
  checkFileExists,
  downloadVideo,
} from '../services/FileService'
import {soundManager} from '../services/SoundManager'
import {
  setFileDownloaded,
  setInitialCacheState,
} from '../redux/slices/cacheSlice'
import {PermissionsAndroid, Platform} from 'react-native'

const AppStack = createStackNavigator()

export default function CentralNavigation() {
  const hasSeenIntro = useSelector((state: State) => state.hasSeenIntro)
  console.log('hasSeenIntro:', hasSeenIntro)
  // const hasSeenIntro = false;
  const dispatch = useDispatch()
  const downloadQueue = []

  React.useEffect(() => {
    const bootstrapApp = async () => {
      console.log('CentralNavigation: Bootstrapping App...')

      // --- AUDIO ENGINE (RAM) ---
      const allSoundItems: any[] = []
      const maxLength = Math.max(
        rainSounds.length,
        noiseSounds.length,
        thetaSounds.length,
      )

      for (let i = 0; i < maxLength; i++) {
        if (rainSounds[i]) allSoundItems.push(rainSounds[i])
        if (noiseSounds[i]) allSoundItems.push(noiseSounds[i])
        if (thetaSounds[i]) allSoundItems.push(thetaSounds[i])
      }

      soundManager
        .preloadSounds(allSoundItems)
        .catch(e => console.error('Audio Preload Failed:', e))

      // --- VIDEO/AUDIO DISK CACHE ---
      await initVideoDirectory()

      const cacheMap: Record<string, boolean> = {}
      const downloadList: string[] = []

      // Helper to extract valid URLs for downloading
      const addToQueue = (items: any[]) => {
        items.forEach(item => {
          // Video URL?
          if (item.videoFile?.uri) {
            downloadList.push(item.videoFile.uri)
          }
          // Audio URL?
          if (Platform.OS === 'android' && item.remoteAudioUrl) {
            downloadList.push(item.remoteAudioUrl)
          }
        })
      }

      addToQueue(rainSounds)
      addToQueue(noiseSounds)
      addToQueue(thetaSounds)

      // Check existing files
      for (const url of downloadList) {
        const exists = await checkFileExists(url)
        if (exists) cacheMap[url] = true
      }

      dispatch(setInitialCacheState(cacheMap))

      // Start Downloads
      processDownloadQueue(downloadList)
    }

    bootstrapApp()
  }, [dispatch])

  const processDownloadQueue = async (urls: string[]) => {
    for (const url of urls) {
      if (!url) continue

      const alreadyExists = await checkFileExists(url)

      if (!alreadyExists) {
        const success = await downloadVideo(url)
        if (success) {
          dispatch(setFileDownloaded(url))
        }
        // Small delay to prevent UI stutter
        await new Promise(r => setTimeout(r, 500))
      }
    }
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!hasSeenIntro && (
          <AppStack.Screen name="Onboarding" component={OnboardingDeck} />
        )}
        <AppStack.Screen
          name="MatrixPlayer"
          component={MatrixPlayer}
          options={{gestureEnabled: false}}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}
