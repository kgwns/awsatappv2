import {setPlayerControl, setSelectedTrack, setIsPlaying, setTrackControl}  from "../action"
import { SHOW_MINI_PLAYER, SELECTED_TRACK, IS_PLAYING, SHOW_CONTROL } from "../actionType"

describe('<AppPlayerAction', () => {
    const playerControl: boolean = true

    it('Check Player Control', () => {
        const result = setPlayerControl(playerControl)
        expect(result.type).toEqual(SHOW_MINI_PLAYER)
        expect(result.payload.showMiniPlayer).toEqual(playerControl)
    })

    it('Check Selected Track', () => {
        const result = setSelectedTrack([])
        expect(result.type).toEqual(SELECTED_TRACK)
        expect(result.payload.selectedTrack).toEqual([])
    })

    it('Check is Playing', () => {
        const result = setIsPlaying(playerControl)
        expect(result.type).toEqual(IS_PLAYING)
        expect(result.payload.isPlaying).toEqual(playerControl)
    })

    it('Check TrackControl', () => {
        const result = setTrackControl(playerControl)
        expect(result.type).toEqual(SHOW_CONTROL)
        expect(result.payload.showControl).toEqual(playerControl)
    })
})