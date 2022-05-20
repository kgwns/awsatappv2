import { SHOW_MINI_PLAYER, SELECTED_TRACK, IS_PLAYING, SHOW_CONTROL } from './actionType';
import { AppCommonAction, PlayerState } from './types';

const initialAuthState: PlayerState = {
  showMiniPlayer: false,
  selectedTrack: null,
  isPlaying: false,
  showControl: false
};

export default (state = initialAuthState, action: AppCommonAction) => {
  switch (action.type) {
    case SHOW_MINI_PLAYER:
      return {
        ...state,
        showMiniPlayer: action.payload.showMiniPlayer
      }
    case SELECTED_TRACK:
      return {
        ...state,
        selectedTrack: action.payload.selectedTrack
      }
    case IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload.isPlaying
      }
    case SHOW_CONTROL:
      return {
        ...state,
        showControl: action.payload.showControl
      }
    default:
      return {...state}
  }
}
