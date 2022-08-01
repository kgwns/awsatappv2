import { View,StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FilterComponent, FilterDataType, PopulateWidgetType } from 'src/components/molecules'
import { isArray, isNonEmptyArray, isTab, normalize, screenHeight, screenWidth } from 'src/shared/utils'
import { useBookmark } from 'src/hooks'
import { DynamicWidget } from 'src/components/organisms'
import { Label, LabelTypeProp, LoadingState } from 'src/components/atoms'
import { useIsFocused } from '@react-navigation/native'

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

    const widgetNameByIndex = (index: number) => {
        switch (index) {
            case 1: return PopulateWidgetType.ARTICLE
            case 2: return PopulateWidgetType.VIDEO
            case 3: return PopulateWidgetType.OPINION
            case 4: return PopulateWidgetType.PODCAST
            default: return PopulateWidgetType.ARTICLE
        }
    }

    //Hooks
    const {
        getBookmarkedId, removeBookmarkedInfo,
        getBookmarkDetailData, getSpecificBundleFavoriteDetail,
        bookmarkDetail, bookmarkLoading,
        isAllBookmarkFetched, filterBookmarkDetailInfo,
        bookmarkIdInfo, canRefreshBookmarkDetail,
    } = useBookmark()

    //State
    const [filterItem, setFilterItem] = useState<FilterDataType[]>(filterData);
    const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);
    const selectedDataRef = useRef(true);
    const [filteredData, setFilteredData] = useState(bookmarkDetail)
    const [initialLoading, setInitialLoading] = useState(true)

    useEffect(() => {
        const isAllDataFetched = isArray(bookmarkIdInfo) && isArray(bookmarkDetail) && bookmarkIdInfo.length == bookmarkDetail.length
        if (isFocused && canRefreshBookmarkDetail && !isAllDataFetched) {
           getBookmarkedId()
            if (tabSelectedIndex != 0) {
                getSpecificBundleFavoriteDetail(widgetNameByIndex(tabSelectedIndex), 0)
            }
            setInitialLoading(isFocused)
        }
    }, [isFocused])

    useEffect(() => {
        if (isNonEmptyArray(bookmarkDetail) ||
            !isNonEmptyArray(bookmarkDetail) && isNonEmptyArray(filteredData) || isAllBookmarkFetched) {
            updateBookmarkDetailInfo(tabSelectedIndex)
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

    useEffect(() => {
        updatedBundleFilterBookmarkDetail()
    }, [filterBookmarkDetailInfo])

    const updatedBundleFilterBookmarkDetail = () => {
        if (!bookmarkLoading && isArray(filterBookmarkDetailInfo) && tabSelectedIndex != 0) {
            setFilteredData(filterBookmarkDetailInfo)
            setInitialLoading(false)
        }
    }

    const returnItems = (data:any) => {
        if(isNonEmptyArray(data)){
            return data.map((item:any)=>{
                return item.tid
            })
        } else {
            return [];
        }
    }

    const updateBookmarkDetailInfo = (index: number) => {
        updateFilterComponent(index)
        updatedFilteredData(index)
    }

    const updateFilterComponent = (index: number) => {
        const filterItemData = [...filterItem]
        filterItemData[tabSelectedIndex].isSelected = false;
        filterItemData[index].isSelected = true;
        setFilterItem(filterItemData)
        setTabSelectedIndex(index);
    }

    const onPressFilterItem = (index: number) => {
        if (index === 0 || isAllBookmarkFetched) {
            updateBookmarkDetailInfo(index)
        } else {
            updateFilterComponent(index)
            setInitialLoading(true)
            getSpecificBundleFavoriteDetail(widgetNameByIndex(index), 0)
        }
    }

    const updatedFilteredData = (index: number) => {
        const data = getFilteredData(index)
        setFilteredData(data)
        setInitialLoading(false)
    }

    const removeBookmarkItem = (removeItem: any) => {
        const data = (tabSelectedIndex === 0 || isAllBookmarkFetched) ? [...bookmarkDetail] : [...filterBookmarkDetailInfo]
        const removeIndex = data.findIndex((item) => item.nid == removeItem.nid)
        if (removeIndex >= 0) {
            removeBookmarkedInfo({ nid: removeItem.nid })
        }
    }

    const getFilteredData = (index: number) => {
        if (!isNonEmptyArray(bookmarkDetail)) {
            return null
        }
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

    const onEndReachList = () => {
        if (!bookmarkLoading) {
            if (tabSelectedIndex === 0 && !isAllBookmarkFetched) {
                getBookmarkDetailData()
            } else if (tabSelectedIndex !== 0) {
                const bundleName = widgetNameByIndex(tabSelectedIndex)
                const bundleBookmarkList = bookmarkIdInfo.filter((item) => item.bundle === bundleName)
                if (filterBookmarkDetailInfo.length < bundleBookmarkList.length) {
                    getSpecificBundleFavoriteDetail(bundleName)
                }
            }
        }
    }

    const loadingView = () => (
        <View style={styles.container}>
            <LoadingState />
        </View>
    )

    const emptyFavoriteData = () => {
        if (isNonEmptyArray(filteredData)) {
            return null
        }
        return <View
            style={styles.noFavoriteMessage}>
            <Label children={'لم يتم حفظ أي شيء حتى الآن'} labelType={LabelTypeProp.h1} />
        </View>
    }

    return (
        <View style={styles.contentContainer}>
            <View style={styles.filterContainer}>
                <FilterComponent data={filterItem} onPress={onPressFilterItem} />
            </View>
            {!initialLoading ?
                <>
                    {isNonEmptyArray(filteredData) &&
                        <DynamicWidget data={filteredData}
                            onPressBookmark={removeBookmarkItem}
                            onEndReached={onEndReachList}
                            isLoading={bookmarkLoading}
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
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.80 * screenHeight
    },
    filterContainer : {
        paddingStart: isTab ? normalize(0.02 * screenWidth) : 0.04 * screenWidth,
        marginTop: 10,
        marginBottom: 18 
    },
    contentContainer: {
        flex: 1
    }
})
