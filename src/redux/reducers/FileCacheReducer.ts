import RNFS from 'react-native-fs';
import {ActionType} from '../action-types';

interface FileCache {
  [fileUrl: string]: string | null; // key: fileUrl, value: cachedFilePath (null if not cached)
}

const initialState: FileCache = {};

const downloadNextFile = async (currentFileIndex, fileUrls, newState) => {
  if (currentFileIndex >= fileUrls.length) {
    console.debug('downloadNextFile, All files have been downloaded');
    return;
  }
  if (currentFileIndex === 0) {
    const localAssetPath = 'assets/videos/RainInACarAltHD.mp4';
  } else {
    const fileUrl = fileUrls[currentFileIndex];
    const cachedFilePath = `${RNFS.CachesDirectoryPath}/${fileUrl.split('/').pop()}`;
    try {
      const fileExists = await RNFS.exists(cachedFilePath);
      if (fileExists) {
        // If the file exists, it means the download has started or completed, so we don't need to download again
        newState[fileUrl] = cachedFilePath;
        // console.debug(`FILECACHEREDUCER: File exists: ${cachedFilePath}`);
      } else {
        // If the file doesn't exist (at all), we initiate the download
        console.debug(`FILECACHEREDUCER: Downloading file: ${fileUrl}`);
        await RNFS.downloadFile({fromUrl: fileUrl, toFile: cachedFilePath}).promise;
        newState[fileUrl] = cachedFilePath;
      }
    } catch (err) {
      console.error(`FILECACHEREDUCER: Error caching file ${fileUrl}: ${err}`);
      newState[fileUrl] = null;
    }
  } // if

  if (currentFileIndex === 1) {
    await delay(7000); // Delay of 10 seconds before downloading next file
  } else if (currentFileIndex > 1) {
    await delay(4000); // Delay of 5 seconds before downloading next file
  }
  const nextIndex = currentFileIndex + 1;
  downloadNextFile(nextIndex, fileUrls, newState); // Recursive call to download the next file
};

// Helper function to introduce a delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fileCacheReducer = (state = initialState, action: any) => {
  const fileUrls = action.payload;
  let newState;
  let currentFileIndex;

  switch (action.type) {
    case ActionType.DOWNLOAD_AND_CACHE_FILES:
      newState = {...state};
      currentFileIndex = 0;
      downloadNextFile(currentFileIndex, fileUrls, newState); // Start downloading the first file
      return newState;
    default:
      return state;
  }
};
