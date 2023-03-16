import { useDispatch, useSelector } from "react-redux"
import { setPlayerControl, setSelectedTrack, setIsPlaying, setTrackControl } from "src/redux/appPlayer/action";
import { getPlayerControl, getSelectedTrack, getIsPlaying, getControlState } from "../redux/appPlayer/selectors"

export interface UseAppPlayerReturn {
    showMiniPlayer: boolean;
    isPlaying: boolean;
    selectedTrack: any;
    showControls: boolean,
    setControlState(value: boolean): void;
    setShowMiniPlayer(value: boolean): void;
    setPlay(value: boolean): void;
    setPlayerTrack(track: any): void;
}

export const useAppPlayer = (): UseAppPlayerReturn => {
    const dispatch = useDispatch()

    const showMiniPlayer = useSelector(getPlayerControl)
    const selectedTrack = useSelector(getSelectedTrack)
    const isPlaying = useSelector(getIsPlaying)
    const showControls = useSelector(getControlState)

    const setShowMiniPlayer = (value: boolean) => {
        dispatch(setPlayerControl(value))
    }

    const setPlayerTrack = (item: any) => {
        dispatch(setSelectedTrack(item))
    }

    const setPlay = (value: boolean) => {
        dispatch(setIsPlaying(value))
    }

    const setControlState = (visible: boolean) => {
        dispatch(setTrackControl(visible))
    }

    return {
        showMiniPlayer,
        selectedTrack,
        setShowMiniPlayer,
        setPlayerTrack,
        isPlaying,
        setPlay,
        showControls,
        setControlState
    }
}
