import { View,StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FilterComponent, FilterDataType, PopulateWidgetType } from 'src/components/molecules'
import { isArray, isInvalidOrEmptyArray, isNonEmptyArray, isTab, normalize, screenHeight, screenWidth } from 'src/shared/utils'
import { useBookmark } from 'src/hooks'
import { DynamicWidget } from 'src/components/organisms'
import { Label, LabelTypeProp, LoadingState } from 'src/components/atoms'
import { useIsFocused } from '@react-navigation/native'
import { TranslateConstants, TranslateKey } from 'src/constants/Constants'
import { colors } from 'src/shared/styles/colors'
import { ARCHIVES_UNIT_ID } from 'src/hooks/useAds'
import { AdContainer, AdContainerSize } from 'src/components/atoms/adContainer/AdContainer'

export const Archives = () => {
    const isFocused = useIsFocused()
    const FAVORITE_FILTERS_EVERYONE = TranslateConstants({key:TranslateKey.FAVORITE_FILTERS_EVERYONE})
    const FAVORITE_FILTERS_ARTICLES = TranslateConstants({key:TranslateKey.FAVORITE_FILTERS_ARTICLES})
    const FAVORITE_FILTERS_VIDEO = TranslateConstants({key:TranslateKey.FAVORITE_FILTERS_VIDEO})
    const FAVORITE_FILTERS_OPINION = TranslateConstants({key:TranslateKey.FAVORITE_FILTERS_OPINION})
    const FAVORITE_FILTERS_PODCAST = TranslateConstants({key:TranslateKey.FAVORITE_FILTERS_PODCAST})
    const FAVORITE_FILTERS_ALBUM = TranslateConstants({key:TranslateKey.FAVORITE_FILTERS_ALBUM})

    const filterData: FilterDataType[] = [
        {
            name: FAVORITE_FILTERS_EVERYONE,
            isSelected: true,
            count: 0,
            isVisible: isTab ? false : true,
        },
        {
            name: FAVORITE_FILTERS_ARTICLES,
            isSelected: false,
            count: 0,
        },
        {
            name: FAVORITE_FILTERS_VIDEO,
            isSelected: false,
            count: 0,
        },
        {
            name: FAVORITE_FILTERS_OPINION,
            isSelected: false,
            count: 0,
        },
        {
            name: FAVORITE_FILTERS_PODCAST,
            isSelected: false,
            count: 0,
        },
        {
            name: FAVORITE_FILTERS_ALBUM,
            isSelected: false,
            count: 0,
        }
    ]

    const widgetNameByIndex = (index: number) => {
        switch (index) {
            case 1: return PopulateWidgetType.ARTICLE
            case 2: return PopulateWidgetType.VIDEO
            case 3: return PopulateWidgetType.OPINION
            case 4: return PopulateWidgetType.PODCAST
            case 5: return PopulateWidgetType.ALBUM
            default: return PopulateWidgetType.ARTICLE
        }
    }

    //Hooks
    const {
        getBookmarkedId, removeBookmarkedInfo,
        getBookmarkDetailData, getSpecificBundleFavoriteDetail,
        getSpecificBundleArticleCount,
        bookmarkDetail, bookmarkLoading,
        isAllBookmarkFetched, filterBookmarkDetailInfo,
        bookmarkIdInfo, canRefreshBookmarkDetail,
    } = useBookmark()

    //State
    const [filterItem, setFilterItem] = useState<FilterDataType[]>(filterData);
    const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(isTab ? 1 : 0);
    const selectedDataRef = useRef(true);
    const [filteredData, setFilteredData] = useState(bookmarkDetail)
    const [initialLoading, setInitialLoading] = useState(true)

    useEffect(() => {
        const isAllDataFetched = isArray(bookmarkIdInfo) && isArray(bookmarkDetail) && bookmarkIdInfo.length === bookmarkDetail.length
        if (isFocused && !isAllDataFetched) {
            if (isTab && (canRefreshBookmarkDetail || isInvalidOrEmptyArray(filterBookmarkDetailInfo))) {
                onPressFilterItem(tabSelectedIndex);
                getBookmarkedId()
                setInitialLoading(isFocused)
            } else if (canRefreshBookmarkDetail) {
                updateFilterComponent(0) //We switch to all tab when bookmark add newly
                getBookmarkedId()
                setInitialLoading(isFocused)
            }
        }
    }, [isFocused])

    useEffect(() => {
        if (isFocused) {
            updateArticleCount([...filterItem]);
        }
    }, [isFocused, bookmarkIdInfo]);

    const updateArticleCount = (data: FilterDataType[]) => {
        if (isFocused) {
            const updatedFilterData = data.map((item: FilterDataType, index: number) => ({
                ...item,
                count: index === 0 ? isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.length
                    : 0 : getSpecificBundleArticleCount(widgetNameByIndex(index))
            }));
            setFilterItem([...updatedFilterData]);
        }
    };

    useEffect(() => {
        if ((isTab && isAllBookmarkFetched) || (!isTab && isNonEmptyArray(bookmarkDetail) ||
            !isNonEmptyArray(bookmarkDetail) && isNonEmptyArray(filteredData) || isAllBookmarkFetched)) {
            updateBookmarkDetailInfo(tabSelectedIndex)
        }
    }, [bookmarkDetail])
    
    useEffect(() => {
        if (selectedDataRef.current) {
            selectedDataRef.current = false;
        } else {
            const dataSelected = returnItems(bookmarkDetail.data)
            if( JSON.stringify(dataSelected) !== JSON.stringify(filteredData)){
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
        if (!bookmarkLoading && isArray(filterBookmarkDetailInfo) && tabSelectedIndex !== 0 && !isAllBookmarkFetched) {
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
        if (isNonEmptyArray(filterItemData) && typeof tabSelectedIndex == 'number') {
            filterItemData[tabSelectedIndex].isSelected = false;
            filterItemData[index].isSelected = true;
            updateArticleCount(filterItemData);
            setTabSelectedIndex(index);
        }
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
        const removeIndex = data.findIndex((item) => item.nid === removeItem.nid)
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
                return data.filter((item: any) => item.type === PopulateWidgetType.ARTICLE)
            case 2:
                return data.filter((item: any) => item.type === PopulateWidgetType.VIDEO)
            case 3:
                return data.filter((item: any) => item.type === PopulateWidgetType.OPINION)
            case 4:
                return data.filter((item: any) => item.type === PopulateWidgetType.PODCAST)
            case 5:
                return data.filter((item: any) => item.type === PopulateWidgetType.ALBUM)
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

    const noContentTitle = TranslateConstants({
        key: TranslateKey.NO_CONTENT_TITLE,
    });

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
            <Label style={{marginBottom: 20}} children={noContentTitle} labelType={LabelTypeProp.h1} />
            <AdContainer unitId={ARCHIVES_UNIT_ID} size={AdContainerSize.MEDIUM}/>
        </View>
    }

    return (
        <View style={styles.contentContainer}>
            <View style={styles.filterContainer}>
                <FilterComponent
                    data={filterItem}
                    selectedColor={isTab ? colors.greenishBlue : undefined}
                    showSelectedBorder={false}
                    onPress={onPressFilterItem}
                />
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
