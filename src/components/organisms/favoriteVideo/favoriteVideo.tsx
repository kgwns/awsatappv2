import { View, ListRenderItem, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { VideoItem, VideoItemProps } from 'src/components/molecules'
import { normalize } from 'src/shared/utils'

interface FavoriteVideoProps {
    data: VideoItemProps[]
}

export const FavoriteVideo = ({
    data
}: FavoriteVideoProps) => {

    const renderItem: ListRenderItem<VideoItemProps> = ({ item }) => {
        return (
            <VideoItem
                title={item.title}
                imageUrl={item.imageUrl}
                videoLabel={item.videoLabel}
                time={item.time}
                des={item.des}
                date={item.date}
                views={item.views}
                toWatchTitle={item.toWatchTitle}
            />
        );
    };

    return (
        <View style={styles.mainContainer}>
            <FlatList
                style={styles.container}
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        top: normalize(10)
    },
    mainContainer: {
        flex: 1
    }
});
