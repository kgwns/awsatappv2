import TrackPlayer, { AppKilledPlaybackBehavior, Capability } from 'react-native-track-player';

class AppPlayer {
    static selectedTrack: null;

    static initializePlayer = async () => {
        try {
            await TrackPlayer.setupPlayer({waitForBuffer: true});
            await TrackPlayer.updateOptions({                
                android: {
                    appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback // music continues in background even when app is closed
                    // Enable Pause On Interruption
                    // alwaysPauseOnInterruption: true, 
                },
                // Media controls capabilities
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.Stop,
                    Capability.SeekTo,
                ],
                compactCapabilities: [Capability.Play, Capability.Pause],
                notificationCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                  ],
            });
        } catch (e) {
            console.error(e);
            // to-do handle error
        }
    };
}

export default AppPlayer;
