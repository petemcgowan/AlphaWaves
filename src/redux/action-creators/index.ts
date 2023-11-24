import {Dispatch} from 'redux';

import {ActionType} from '../action-types/index';


export const updateHasSeenIntro = (hasSeenIntro: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.UPDATE_HAS_SEEN_INTRO_VALUE,
      payload: hasSeenIntro,
    });
  };
};
