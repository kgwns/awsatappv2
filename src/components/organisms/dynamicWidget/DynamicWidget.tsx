import { ActivityIndicator, FlatList, ListRenderItem, View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { PopulateWidget } from 'src/components/molecules'
import { isNonEmptyArray, isObjectNonEmpty, normalize } from 'src/shared/utils'
import TrackPlayer, { RepeatMode, State, usePlaybackState } from 'react-native-track-player'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { useAppPlayer } from 'src/hooks'

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
    const { showMiniPlayer } = useAppPlayer()

    const listFooterComponent = () => {
        if (!isLoading) {
            return null
        }
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size={'small'} color={themeData.primary} />
            </View>
        )
    }

    const renderItem: ListRenderItem<any> = ({ item, index }) => {
        return (
            <PopulateWidget key={index} {...item}
                onPressBookmark={() => onPressBookmark(item)}
                selectedTrack={selectedTrack} />
        )
    }
    
    if(!isNonEmptyArray(data)) {
        return null
    }

    return(
        <FlatList 
           style={styles.container}
           data={data}
           keyExtractor={(_,index) => index.toString()}
           renderItem={renderItem}
           showsVerticalScrollIndicator={false}
           onEndReachedThreshold={0.5}
           onEndReached={onEndReached}
           ListFooterComponent={listFooterComponent}
            contentContainerStyle={showMiniPlayer && styles.contentContainer}
        />
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: normalize(80)
    },
    loaderContainer: {
        margin: normalize(28) 
    },
    container: {
        flex: 1
    }
})