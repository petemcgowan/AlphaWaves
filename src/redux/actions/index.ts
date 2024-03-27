import {ActionType} from '../action-types';

interface HasSeenIntroAction {
  type: ActionType.UPDATE_HAS_SEEN_INTRO_VALUE;
  payload: boolean;
}

export type IntroAction = HasSeenIntroAction;
