import { View, FlatList, ListRenderItem, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Label } from 'src/components/atoms'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { isNotEmpty, isTab, normalize } from 'src/shared/utils'
import { ScreensConstants } from 'src/constants'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export type TopNewsItemProps = {
    title: string;
    nid: string
}

export type TopHeadLineNewsProps = {
    data: TopNewsItemProps[]
}

export const TopHeadLineNews = ({
    data
}: TopHeadLineNewsProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const style = useThemeAwareObject(customStyle)

    const onPress = (nid: string) => {
        if (isNotEmpty(nid)) navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid })
    }

    const renderItem: ListRenderItem<TopNewsItemProps> = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.7} style={style.rowItem}
                onPress={() => onPress(item.nid)}>
                <View style={style.circle} />
                <Label children={item.title} style={style.title} numberOfLines={1} />
            </TouchableOpacity>
        )

    }
    return (
        <View style={style.container}>
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                data={data}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        paddingBottom: isTab ? 0 : normalize(15),
        alignItems: 'center',
        paddingTop: isTab ? normalize(10) : 0
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: normalize(7),
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