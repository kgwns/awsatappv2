import { FlatList, View } from 'react-native'
import React from 'react'
import { PopulateWidget } from 'src/components/molecules'
import { isNonEmptyArray } from 'src/shared/utils'

export interface DynamicWidgetProps {
    data: any[],
    onPressBookmark: (item: any) => void
}

export const DynamicWidget = ({
    data,
    onPressBookmark
}: DynamicWidgetProps) => {
    if(!isNonEmptyArray(data)) return null
    return (
        <View>
            {
                data.map((item, index) => {
                    return <PopulateWidget key={index} {...item} onPressBookmark={() => onPressBookmark(item)}/>
                })
            }
            {/* <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => <PopulateWidget key={index} {...item} />}
            /> */}
        </View>
    )
}
