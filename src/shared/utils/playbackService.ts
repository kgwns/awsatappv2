import TrackPlayer, {Event} from "react-native-track-player";

module.exports = async function () {
    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
    // TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.stop());
    TrackPlayer.addEventListener(Event.RemoteDuck, () => TrackPlayer.pause());
}