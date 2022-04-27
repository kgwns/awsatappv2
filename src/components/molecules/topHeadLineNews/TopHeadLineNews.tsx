import { View, FlatList, ListRenderItem, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Label } from 'src/components/atoms'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { normalize } from 'src/shared/utils'

export type TopNewsItemProps = {
    title: string
}

export type TopHeadLineNewsProps = {
    data: TopNewsItemProps[]
}

export const TopHeadLineNews = ({
    data
}: TopHeadLineNewsProps) => {
    const style = useThemeAwareObject(customStyle)

    const renderItem: ListRenderItem<TopNewsItemProps> = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.8} style={style.rowItem}>
                <View style={style.circle} />
                <Label children={item.title} style={style.title} numberOfLines={1} />
            </TouchableOpacity>
        )

    }
    return (
        <FlatList
            keyExtractor={(_, index) => index.toString()}
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        />
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: normalize(14),
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.primaryBlack,
        marginRight: normalize(8),
    },
    title: {
        fontSize: normalize(15),
        lineHeight: normalize(24),
        textAlign: 'left',
        color: theme.primaryBlack,
        fontWeight: 'bold'
    }
})