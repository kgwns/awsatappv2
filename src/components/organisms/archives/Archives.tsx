import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FilterComponent, FilterDataType } from 'src/components/molecules'
import { isNonEmptyArray, screenHeight, screenWidth } from 'src/shared/utils'
import { useBookmark } from 'src/hooks'
import { DynamicWidget } from 'src/components/organisms'
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget'
import { Label, LabelTypeProp } from 'src/components/atoms'

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
            name: t('favorite.filters.opinion'),
            isSelected: false
        }
    ]

    const [filterItem, setFilterItem] = useState<FilterDataType[]>(filterData);
    const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);

    const { getBookmarkedId, removeBookmarkedInfo, updateBookDetailInfo, bookmarkDetail } = useBookmark()
    const [filteredData, setFilteredData] = useState(bookmarkDetail)

    useEffect(() => {
        getBookmarkedId()
    }, [])

    useEffect(() => {
        if (isNonEmptyArray(bookmarkDetail)) {
            onPressFilterItem(tabSelectedIndex)
        } else if(!isNonEmptyArray(bookmarkDetail) && isNonEmptyArray(filteredData)){
            onPressFilterItem(tabSelectedIndex)
        }
    }, [bookmarkDetail])

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
    }

    const removeBookmarkItem = (removeItem: any) => {
        const data = [...bookmarkDetail]
        const index = data.findIndex((item) => item.nid == removeItem.nid)
        if (index >= 0) {
            const updatedInfo = data.filter((bookmarkedItem) => bookmarkedItem.nid != removeItem.nid)
            updateBookDetailInfo(updatedInfo)
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
            default: return null
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 0.04 * screenWidth }}>
                <FilterComponent data={filterItem} onPress={onPressFilterItem} />
                {isNonEmptyArray(filteredData) && <DynamicWidget data={filteredData}
                    onPressBookmark={removeBookmarkItem}
                />}
            </View>
            {!isNonEmptyArray(filteredData) && <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 0.32 * screenHeight
                }}>
                <Label children={'لم يتم حفظ أي شيء حتى الآن'} labelType={LabelTypeProp.h1} />
            </View>
            }
        </View>
    )
}