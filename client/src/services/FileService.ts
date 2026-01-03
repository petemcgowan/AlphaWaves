import RNFS from 'react-native-fs'
import {rainSounds, noiseSounds} from '../model/data'

// Where we store videos
const VIDEO_DIR = `${RNFS.DocumentDirectoryPath}/videos`

// Ensure directory exists
export const initVideoDirectory = async () => {
  const exists = await RNFS.exists(VIDEO_DIR)
  if (!exists) {
    await RNFS.mkdir(VIDEO_DIR)
  }
}

// Get local path for a specific URL
export const getLocalPath = (remoteUri: string) => {
  const filename = remoteUri.split('/').pop() // e.g., "RainInACar.mp4"
  return `${VIDEO_DIR}/${filename}`
}

// Check if we have the file AND it matches expected size
export const checkFileExists = async (
  remoteUri: string,
  expectedSize?: number,
) => {
  const localPath = getLocalPath(remoteUri)
  try {
    const exists = await RNFS.exists(localPath)
    if (!exists) return false

    if (expectedSize) {
      const stat = await RNFS.stat(localPath)
      // Allow a small buffer or exact match
      return Number(stat.size) === expectedSize
    }
    return true
  } catch (e) {
    return false
  }
}

// Download Logic
export const downloadVideo = async (remoteUri: string): Promise<boolean> => {
  const localPath = getLocalPath(remoteUri)

  // Find its expected videoFileSize
  const allSounds = [...rainSounds, ...noiseSounds]
  const targetSound = allSounds.find(s => s.videoFile.uri === remoteUri)
  const expectedSize = targetSound?.videoFileSize

  // Check if already exists to save bandwidth
  if (await RNFS.exists(localPath)) {
    if (expectedSize) {
      const stat = await RNFS.stat(localPath)
      console.log(`[Sound  File Check] ${localPath} - Size: ${stat.size}`)
      // If file is too small (e.g. a 404 error page is usually < 5KB), delete it
      if (Number(stat.size) !== expectedSize) {
        console.log(
          `[Cache] Found corrupt/partial file. Deleting: ${Number(
            stat.size,
          )} != ${expectedSize}`,
        )
        await RNFS.unlink(localPath)
        // Proceed to download below...
      } else {
        console.log(`[Cache] Valid file already exists: ${localPath}`)
        return true
      }
    } else {
      // Fallback if we forgot to set size in data.ts (Safety check)
      console.log('NOT EXPECTED SIZE: localPath:', localPath)
      const stat = await RNFS.stat(localPath)
      console.log(`[Sound File Check] ${localPath} - Size: ${stat.size}`)
      if (Number(stat.size) < 10000) {
        // If < 10KB, it's definitely not a video
        await RNFS.unlink(localPath)
      } else {
        return true
      }
    }
  }
  console.log(`[Cache] Starting download: ${remoteUri}`)

  try {
    const options = {
      fromUrl: remoteUri,
      toFile: localPath,
      background: true,
      discretionary: true,
    }

    const result = await RNFS.downloadFile(options).promise

    if (result.statusCode === 200) {
      // Double check size one last time
      const stat = await RNFS.stat(localPath)
      if (expectedSize && Number(stat.size) !== expectedSize) {
        console.log('[Cache] Download finished but size mismatch. Deleting.')
        await RNFS.unlink(localPath)
        return false
      }

      console.log(`[Cache] Download complete & verified: ${localPath}`)
      return true
    } else {
      console.log(
        `[Cache] Server returned ${result.statusCode}. Deleting file.`,
      )
      await RNFS.unlink(localPath)
      return false
    }
  } catch (err) {
    console.log('[Cache] Download error:', err)
    return false
  }
}
