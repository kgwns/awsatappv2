import { View, FlatList, ListRenderItem, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Label } from 'src/components/atoms'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { isNotEmpty, isTab, normalize } from 'src/shared/utils'
import { ScreensConstants } from 'src/constants'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainSectionBlockType } from '~/redux/latestNews/types'


export type TopHeadLineNewsProps = {
    data: MainSectionBlockType[]
}

export const TopHeadLineNews = ({
    data
}: TopHeadLineNewsProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const style = useThemeAwareObject(customStyle)

    const onPress = (nid: string) => {
        if (isNotEmpty(nid)) navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid })
    }

    const renderItem: ListRenderItem<MainSectionBlockType> = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.7} style={[style.rowItem, isTab && { alignSelf: 'center' }]}
                onPress={() => onPress(item.nid)}>
                <View style={style.circle} />
                <Label children={item.title} style={style.title} />
            </TouchableOpacity>
        )

    }
    return (
        <View style={[style.container, isTab && {alignItems: 'center'}]}>
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
        paddingTop: isTab ? normalize(10) : 0,
    },
    rowItem: {
        flexDirection: 'row',
        paddingVertical: normalize(7),
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.primaryBlack,
        marginRight: normalize(10),
        marginTop: normalize(10),
        marginLeft: 2,
    },
    title: {
        fontSize: normalize(15),
        lineHeight: normalize(24),
        textAlign: 'left',
        color: theme.primaryBlack,
        fontWeight: 'bold'
    }
})