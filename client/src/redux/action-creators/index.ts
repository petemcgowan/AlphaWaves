import {Dispatch} from 'redux';
import {ActionType} from '../action-types/index';

export const downloadAndCacheFiles = (fileUrls: string[]) => ({
  type: ActionType.DOWNLOAD_AND_CACHE_FILES,
  payload: fileUrls,
});

export const updateHasSeenIntro = (hasSeenIntro: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_HAS_SEEN_INTRO_VALUE,
      payload: hasSeenIntro,
    });
  };
};
