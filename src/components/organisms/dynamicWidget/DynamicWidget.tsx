import { ActivityIndicator, FlatList, ListRenderItem, View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PopulateWidget } from 'src/components/molecules'
import { isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { useAppPlayer } from 'src/hooks'
import { ARCHIVES_UNIT_ID, FAVORITE_FIRST_INDEX } from 'src/hooks/useAds'
import { AdContainer, AdContainerSize } from 'src/components/atoms/adContainer/AdContainer'

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
    const { showMiniPlayer } = useAppPlayer()

    const listFooterComponent = () => {
        if (!isLoading) {
            return null
        }
        return (
            <View style={styles.loaderContainer} testID={'loadingId'}>
                <ActivityIndicator size={'small'} color={themeData.primary} />
            </View>
        )
    }

    const renderItem: ListRenderItem<any> = ({ item, index }) => {
        return (
            <>
                <PopulateWidget key={index} {...item}
                    onPressBookmark={() => onPressBookmark(item)}
                    selectedTrack={selectedTrack} />
                {index == (FAVORITE_FIRST_INDEX - 1) && 
                    <AdContainer style={{marginBottom: 20}} unitId={ARCHIVES_UNIT_ID} size={AdContainerSize.MEDIUM}/>
                }            
            </>
        )
    }

    const [items, setItems] = useState<any[]>();
    useEffect(() => {
        if (isNonEmptyArray(data)) {
            setItems([...data, {type: 'ad'}])
        }
    }, data);
    
    if(!isNonEmptyArray(data)) {
        return null
    }

    return(
        <FlatList 
           style={styles.container}
           data={items}
           keyExtractor={(_,index) => index.toString()}
           renderItem={renderItem}
           numColumns={isTab ? 2 : 1}
           showsVerticalScrollIndicator={false}
           onEndReachedThreshold={0.5}
           onEndReached={onEndReached}
           ListFooterComponent={listFooterComponent}
           contentContainerStyle={showMiniPlayer && styles.contentContainer}
           columnWrapperStyle={isTab && styles.columnWrapper}
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
    },
    columnWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 0.02 * screenWidth,
    },
})
