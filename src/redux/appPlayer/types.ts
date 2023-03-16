import { SHOW_MINI_PLAYER, SELECTED_TRACK , IS_PLAYING, SHOW_CONTROL} from "./actionType"


export type PlayerState = {
    showMiniPlayer: boolean,
    selectedTrack: any,
    isPlaying: boolean,
    showControl: boolean,
  }


export type ShowMiniPlayerPayloadType = {
    showMiniPlayer: boolean
  }
  
  export type ShowMiniPlayerType = {
    type: typeof SHOW_MINI_PLAYER,
    payload: ShowMiniPlayerPayloadType
  }
  
  export type SelectedTrackPayloadType = {
    selectedTrack: any
  }
  
  export type SelectedTrackType = {
    type: typeof SELECTED_TRACK,
    payload: SelectedTrackPayloadType
  }

  export type SelectedTrackPlayingPayload = {
    isPlaying: boolean
  }
  
  export type SelectedTrackPlayingType = {
    type: typeof IS_PLAYING,
    payload: SelectedTrackPlayingPayload
  }

  export type TrackControlVisiblePayload = {
    showControl: boolean
  }
  
  export type TrackControlVisibleType = {
    type: typeof SHOW_CONTROL,
    payload: TrackControlVisiblePayload
  }
  
  
  export type AppCommonAction = ShowMiniPlayerType
    | SelectedTrackType
    | SelectedTrackPlayingType
    | TrackControlVisibleType
