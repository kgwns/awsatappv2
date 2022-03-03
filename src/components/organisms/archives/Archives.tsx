import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArchivesPodcast, FilterComponent, FilterDataType } from 'src/components/molecules'
import { screenWidth } from 'src/shared/utils'
import { FavoriteVideo } from '../favoriteVideo/favoriteVideo'
import { videoArchiveData } from 'src/constants/SampleData'
import { useBookmark } from 'src/hooks'

export const Archives = () => {
    const [t] = useTranslation()

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
            name: t('favorite.filters.podcast'),
            isSelected: false
        }
    ]

    const [filterItem, setFilterItem] = useState<FilterDataType[]>(filterData);
    const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);

    const { getBookmarkedId } = useBookmark()

    useEffect(() => {
        getBookmarkedId()
    },[])

    const onPressFilterItem = (index: number) => {
        const filterItemData = filterItem
        filterItemData[tabSelectedIndex].isSelected = false;
        filterItemData[index].isSelected = true;
        setFilterItem(filterItemData)
        setTabSelectedIndex(index);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 0.04 * screenWidth }}>
                <FilterComponent data={filterItem} onPress={onPressFilterItem} />
                <FavoriteVideo data={videoArchiveData} />
            </View>
            <ArchivesPodcast />
        </View>
    )
}