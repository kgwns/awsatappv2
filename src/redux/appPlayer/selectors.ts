import {AppState, Selector} from 'src/redux/rootReducer';


export const getPlayerControl: Selector<boolean> = (state: AppState) => state.appPlayer.showMiniPlayer

export const getSelectedTrack: Selector<any> = (state: AppState) => state.appPlayer.selectedTrack

export const getIsPlaying: Selector<any> = (state: AppState) => state.appPlayer.isPlaying

export const getControlState: Selector<any> = (state: AppState) => state.appPlayer.showControl
