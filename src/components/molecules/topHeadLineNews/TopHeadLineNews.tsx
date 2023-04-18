import { View, FlatList, ListRenderItem, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { Label } from 'src/components/atoms/label/Label'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors'
import { isIOS, isNotEmpty, isTab, normalize } from 'src/shared/utils'
import { ScreensConstants } from 'src/constants/Constants'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainSectionBlockType } from 'src/redux/latestNews/types'
import { fonts } from 'src/shared/styles/fonts'
import { decode } from 'html-entities'
import FixedTouchable from 'src/shared/utils/FixedTouchable'
import { ArticleLabel } from '../articleLabel/ArticleLabel'


export type TopHeadLineNewsProps = {
    data: MainSectionBlockType[],
    tabContainerStyle?: StyleProp<ViewStyle>
}

export const TopHeadLineNews = ({
    data,
    tabContainerStyle
}: TopHeadLineNewsProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const style = useThemeAwareObject(customStyle)

    const onPress = (nId: string) => {
        if (isNotEmpty(nId)) {
            navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nId })
        }
    }

    const renderItem: ListRenderItem<MainSectionBlockType> = ({ item }) => {
        return (
            <FixedTouchable activeOpacity={0.7} style={style.rowItem}
                onPress={() => onPress(item.nid)}>
                <View style={style.rowContainer}>
                    <View style={style.circleContainer}>
                        <View style={style.circle} />
                    </View>
                    <View style={style.titleContainer}>
                        <View style={{ paddingRight: normalize(8) }}>
                            <ArticleLabel displayType={item.displayType} />
                        </View>
                        <Label children={decode(item.title)} style={isTab ? style.tabTitle : style.title} />
                    </View>
                </View>
            </FixedTouchable>
        )

    }
    return (
        <View style={[style.container,tabContainerStyle]}>
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
    },
    rowItem: {
        justifyContent: 'center',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.primaryBlack,
        marginTop: isIOS ?  isTab ? normalize(5) : normalize(9) : normalize(12),
        marginLeft: 2,
        marginRight: isTab ? 10 : 0,
    },
    title: {
        fontSize: isTab ? 18 : 15,
        lineHeight: isTab ? 26 : 24,
        textAlign: 'left',
        color: theme.primaryBlack,
        fontFamily: fonts.AwsatDigital_Bold,
        flex: 1,
        flexWrap: 'wrap',
    },
    tabTitle: {
        fontSize: 18,
        lineHeight: 29,
        textAlign: 'left',
        color: theme.primaryBlack,
        fontFamily: fonts.AwsatDigital_Bold,
        flex: 1,
        flexWrap: 'wrap',
        fontWeight: '700'
    },
    circleContainer: {
        width: isTab ? 'auto' :'5%'
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    rowContainer: {
        flexDirection: 'row',
        paddingVertical: normalize(7),
    }
})
