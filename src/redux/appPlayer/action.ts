import { SHOW_MINI_PLAYER, SELECTED_TRACK, IS_PLAYING, SHOW_CONTROL } from "./actionType"
import { ShowMiniPlayerType, SelectedTrackType, SelectedTrackPlayingType, TrackControlVisibleType } from "./types"


export const setPlayerControl = (showPlayer: boolean): ShowMiniPlayerType => {
    return {
        type: SHOW_MINI_PLAYER,
        payload: { showMiniPlayer: showPlayer }
    }
}

export const setSelectedTrack = (track: any): SelectedTrackType => {
    return {
        type: SELECTED_TRACK,
        payload: { selectedTrack: track }
    }
}

export const setIsPlaying = (isPlayingProps: boolean): SelectedTrackPlayingType => {
    return {
        type: IS_PLAYING,
        payload: { isPlaying: isPlayingProps }
    }
}

export const setTrackControl = (visible: boolean): TrackControlVisibleType => {
    return {
        type: SHOW_CONTROL,
        payload: { showControl: visible }
    }
}
