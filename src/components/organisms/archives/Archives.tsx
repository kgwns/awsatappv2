import { View,StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FilterComponent, FilterDataType } from 'src/components/molecules'
import { isNonEmptyArray, isTab, normalize, screenHeight, screenWidth } from 'src/shared/utils'
import { useBookmark } from 'src/hooks'
import { DynamicWidget } from 'src/components/organisms'
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget'
import { Label, LabelTypeProp, LoadingState } from 'src/components/atoms'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';

export const Archives = () => {
    const [t] = useTranslation()
    const isFocused = useIsFocused()

    const filterData: FilterDataType[] = [
        {
            name: t('favorite.filters.everyone'),
            isSelected: true
        },
        {
            name: t('favorite.filters.articles'),
            isSelected: false
        },
        {
            name: t('favorite.filters.video'),
            isSelected: false
        },
        {
            name: t('favorite.filters.opinion'),
            isSelected: false
        },
        {
            name: t('favorite.filters.podcast'),
            isSelected: false
        }
    ]

    const [filterItem, setFilterItem] = useState<FilterDataType[]>(filterData);
    const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);
    const playbackState = usePlaybackState();
    const selectedDataRef = useRef(true);
    const { getBookmarkedId, removeBookmarkedInfo, bookmarkDetail } = useBookmark()
    const [filteredData, setFilteredData] = useState(bookmarkDetail)
    const [initialLoading, setInitialLoading] = useState(true)

    useEffect(() => {
        getBookmarkedId()
    }, [])

    useEffect(() => {
        isFocused && getBookmarkedId()
        setInitialLoading(isFocused)
    }, [isFocused])

    useEffect(() => {
        if (isNonEmptyArray(bookmarkDetail) ||
            !isNonEmptyArray(bookmarkDetail) && isNonEmptyArray(filteredData)) {
            onPressFilterItem(tabSelectedIndex)
        }
    }, [bookmarkDetail])
    
    useEffect(() => {
        if (selectedDataRef.current) {
            selectedDataRef.current = false;
        } else {
            const dataSelected = returnItems(bookmarkDetail.data)
            if( JSON.stringify(dataSelected) != JSON.stringify(filteredData)){
                if (!isNonEmptyArray(bookmarkDetail.data)) {
                    setInitialLoading(false)
                }             
            } else {
                setInitialLoading(false)
            }
        }
    }, [bookmarkDetail]);  

    const returnItems = (data:any) => {
        if(isNonEmptyArray(data)){
            return data.map((item:any)=>{
                return item.tid
            })
        } else {
            return [];
        }
    }

    const onPressFilterItem = (index: number) => {
        const filterItemData = [...filterItem]
        filterItemData[tabSelectedIndex].isSelected = false;
        filterItemData[index].isSelected = true;
        setFilterItem(filterItemData)
        setTabSelectedIndex(index);
        updatedFilteredData(index)
    }

    const updatedFilteredData = (index: number) => {
        const data = getFilteredData(index)
        setFilteredData(data)
        setInitialLoading(false)
    }

    const removeBookmarkItem = (removeItem: any) => {
        const data = [...bookmarkDetail]
        const index = data.findIndex((item) => item.nid == removeItem.nid)
        if (index >= 0) {
            removeBookmarkedInfo({ nid: removeItem.nid })
        }
    }

    const getFilteredData = (index: number) => {
        if (!isNonEmptyArray(bookmarkDetail)) return null
        const data = [...bookmarkDetail]
        
        switch (index) {
            case 0:
                return data
            case 1:
                return data.filter((item: any) => item.type == PopulateWidgetType.ARTICLE)
            case 2:
                return data.filter((item: any) => item.type == PopulateWidgetType.VIDEO)
            case 3:
                return data.filter((item: any) => item.type == PopulateWidgetType.OPINION)
            case 4:
                return data.filter((item: any) => item.type == PopulateWidgetType.PODCAST)
            default: return null
        }
    }

    const loadingView = () => (
        <View style={styles.container}>
            <LoadingState />
        </View>
    )

    const emptyFavoriteData = () => {
        if (isNonEmptyArray(filteredData)) return null
        return <View
            style={styles.noFavoriteMessage}>
            <Label children={'لم يتم حفظ أي شيء حتى الآن'} labelType={LabelTypeProp.h1} />
        </View>
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingStart: isTab ? normalize(0.02 * screenWidth) : 0.04 * screenWidth }}>
                <FilterComponent data={filterItem} onPress={onPressFilterItem} />
            </View>
            {!initialLoading ?
                <>
                    {isNonEmptyArray(filteredData) &&
                        <DynamicWidget data={filteredData}
                            onPressBookmark={removeBookmarkItem}
                        />
                    }
                    {emptyFavoriteData()}
                </> :
                loadingView()
            }
        </View>
    )
}

const styles = StyleSheet.create({
    noFavoriteMessage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0.32 * screenHeight
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.80 * screenHeight
    },
})