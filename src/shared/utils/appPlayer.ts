import TrackPlayer, { Capability } from 'react-native-track-player';

class AppPlayer {
    static selectedTrack: null;

    static initializePlayer = async () => {
        try {
            await TrackPlayer.updateOptions({
                stopWithApp: true, // false=> music continues in background even when app is closed
                // Media controls capabilities
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.Stop,
                    Capability.SeekTo,
                ],
            });

            await TrackPlayer.setupPlayer();
        } catch (e) {
            console.log(e);
            // to-do handle error
        }
    };
}

export default AppPlayer;