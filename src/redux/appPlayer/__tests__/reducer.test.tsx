import { PlayerState } from '../types';
import { SHOW_MINI_PLAYER, SELECTED_TRACK, IS_PLAYING, SHOW_CONTROL } from "../actionType"
import appPlayer from '../reducer'

describe('appPlayer reducer', () => {
    let initialState: PlayerState;
  
    beforeEach(() => {
      initialState = {
        showMiniPlayer: true,
        selectedTrack: [],
        isPlaying: true,
        showControl: true,
      };
    });

    test('Check SHOW_MINI_PLAYER', () => {
      const nextState = appPlayer(initialState, {
        type: SHOW_MINI_PLAYER,
        payload: {showMiniPlayer: true},
      });
      expect(nextState.showMiniPlayer).toBe(true);
    });
  
    test('Check SELECTED_TRACK ', () => {
      const nextState = appPlayer(initialState, {
        type: SELECTED_TRACK,
        payload: {selectedTrack: ''},
      });
      expect(nextState.selectedTrack).toBe('');
    });
  
    test('Check IS_PLAYING', () => {
      const nextState = appPlayer(initialState, {
        type: IS_PLAYING,
        payload: {isPlaying: true},
      });
      expect(nextState.isPlaying).toBe(true);
    });
  
    test('Check SHOW_CONTROL', () => {
      const nextState = appPlayer(initialState, {
        type: SHOW_CONTROL,
        payload: {showControl: true},
      });
      expect(nextState.showControl).toBe(true);
    });
  });
  