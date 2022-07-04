import { View } from 'react-native'
import React, { useState } from 'react'
import { PopulateWidget } from 'src/components/molecules'
import { isNonEmptyArray, isObjectNonEmpty } from 'src/shared/utils'
import TrackPlayer, { RepeatMode, State, usePlaybackState } from 'react-native-track-player'

export interface DynamicWidgetProps {
    data: any[],
    onPressBookmark: (item: any) => void
}

export const DynamicWidget = ({
    data,
    onPressBookmark
}: DynamicWidgetProps) => {
    const [selectedTrack, setSelectedTrack] = useState<any>(null);
    const playbackState = usePlaybackState();

    const togglePlayback = async (nid: string, mediaData: any) => {
        let playList = isNonEmptyArray(mediaData.playlist) ? mediaData.playlist[0] : {};

        if (!isObjectNonEmpty(playList) || !isObjectNonEmpty(mediaData)) {
        return
        }

        const id = nid
        const media = playList.sources[0]?.file ? playList.sources[0]?.file : '';
        const title = mediaData.title ? mediaData.title : '';

        let setupPlayer = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({ stopWithApp: true });
        await TrackPlayer.add({
            id: id,
            url: media,
            title: title,
            artist: title,
        });
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        await TrackPlayer.play();
        }

        if(selectedTrack == nid){
        if (playbackState === State.Playing) {
            await TrackPlayer.pause();
        }
        else if (playbackState === State.Paused) {
            await TrackPlayer.play();
        }
        else if ( playbackState === State.Paused ||  playbackState == State.None || playbackState == State.Stopped) {
            setupPlayer()
        }
        }else{
            await TrackPlayer.reset();
            setupPlayer()
        }
        setSelectedTrack(nid) 
    }
    
    if(!isNonEmptyArray(data)) return null
    return (
        <View>
            {
                data.map((item: any, index: number) => {
                    return <PopulateWidget key={index} {...item} onPressBookmark={() => onPressBookmark(item)} togglePlayback={togglePlayback}
                    selectedTrack={selectedTrack} />
                })
            }
        </View>
    )
}
