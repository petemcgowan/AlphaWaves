// import {ActionType} from './action-types/index';
import {ActionType} from './action-types';

export const UPDATE_HAS_SEEN_INTRO = 'UPDATE_HAS_SEEN_INTRO';
// export const DOWNLOAD_AND_CACHE_FILES = 'DOWNLOAD_AND_CACHE_FILES';

export const downloadAndCacheFiles = (fileUrls: string[]) => ({
  type: ActionType.DOWNLOAD_AND_CACHE_FILES,
  payload: fileUrls,
});

export const updateHasSeenIntro = (booleanValueToChange: boolean) => ({
  type: UPDATE_HAS_SEEN_INTRO,
  payload: {
    booleanValueToChange,
  },
});
