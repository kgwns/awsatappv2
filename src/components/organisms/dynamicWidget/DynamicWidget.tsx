import { ActivityIndicator, FlatList, ListRenderItem, View } from 'react-native'
import React, { useState } from 'react'
import { PopulateWidget } from 'src/components/molecules'
import { isNonEmptyArray, isObjectNonEmpty, normalize } from 'src/shared/utils'
import TrackPlayer, { RepeatMode, State, usePlaybackState } from 'react-native-track-player'
import { useTheme } from 'src/shared/styles/ThemeProvider'

export interface DynamicWidgetProps {
    data: any[],
    onPressBookmark: (item: any) => void
    onEndReached: () => void;
    isLoading: boolean;
}

export const DynamicWidget = ({
    data,
    onPressBookmark,
    onEndReached,
    isLoading,
}: DynamicWidgetProps) => {
    const { themeData } = useTheme()

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

    const listFooterComponent = () => {
        if (!isLoading) return null
        return (
            <View style={{ margin: normalize(28) }}>
                <ActivityIndicator size={'small'} color={themeData.primary} />
            </View>
        )
    }

    const renderItem: ListRenderItem<any> = ({ item, index }) => {
        return (
            <PopulateWidget key={index} {...item}
                onPressBookmark={() => onPressBookmark(item)}
                togglePlayback={togglePlayback}
                selectedTrack={selectedTrack} />
        )
    }
    
    if(!isNonEmptyArray(data)) return null

    return(
        <FlatList 
           style={{flex: 1}}
           data={data}
           keyExtractor={(_,index) => index.toString()}
           renderItem={renderItem}
           showsVerticalScrollIndicator={false}
           onEndReachedThreshold={0.5}
           onEndReached={onEndReached}
           ListFooterComponent={listFooterComponent}
        />
    )
}
