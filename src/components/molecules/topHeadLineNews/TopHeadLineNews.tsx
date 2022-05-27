import { View, FlatList, ListRenderItem, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Label } from 'src/components/atoms'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { isIOS, isNotEmpty, isTab, normalize } from 'src/shared/utils'
import { ScreensConstants } from 'src/constants'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainSectionBlockType } from '~/redux/latestNews/types'
import { fonts } from 'src/shared/styles/fonts'
import { decode } from 'html-entities'


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
            <TouchableOpacity activeOpacity={0.7} style={style.rowItem}
                onPress={() => onPress(item.nid)}>
                <View style={style.circleContainer}>
                    <View style={style.circle} />
                </View>
                <View style={style.titleContainer}>
                    <Label children={decode(item.title)} style={style.title} />
                </View>
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
        marginTop: isIOS ? normalize(9) : normalize(12),
        marginLeft: 2,
    },
    title: {
        fontSize: 15,
        lineHeight: 24,
        textAlign: 'left',
        color: theme.primaryBlack,
        fontFamily: fonts.AwsatDigitalBetav10_Bold,
    },
    circleContainer: {
        width:'5%'
    },
    titleContainer: {
        width:'94%'
    }
})