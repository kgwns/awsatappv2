import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { TitleWithUnderLine, Image, Label, LabelTypeProp } from 'src/components/atoms'
import { RichHTMLOpinionDataType } from 'src/redux/articleDetail/types'
import { ImagesName, Styles } from 'src/shared/styles'
import { normalize, screenWidth } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { fonts } from 'src/shared/styles/fonts'
import { getSvgImages } from 'src/shared/styles/svgImages';
import { CustomThemeType } from 'src/shared/styles/colors'
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants'

type RichHTMLOpinonWidgetProps = {
    data: RichHTMLOpinionDataType
}

export const RichHTMLOpinonWidget = ({
    data
}: RichHTMLOpinonWidgetProps) => {
    const style = useThemeAwareObject(customStyle)
    const navigation = useNavigation<StackNavigationProp<any>>()

    const CONST_READ_ARTICLE_TITLE = TranslateConstants({ key: TranslateKey.CONST_READ_ARTICLE })
    const CONST_OPINION_TITLE = TranslateConstants({ key: TranslateKey.RICH_OPINION_TITLE })

    const { themeData } = useTheme()

    const onPressWriter = () => {
        if (data.writerId) {
            navigation.navigate(ScreensConstants.WRITERS_DETAIL_SCREEN, { tid: data.writerId })
        }
    }

    const onPressOpinion = () => {
        if (data.nid) {
            navigation.navigate(ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN, { nid: data.nid })
        }
    }

    const buttonWithArrow = () => {
        return (
            <View style={style.arrowButtonContainer}>
                <Label style={style.buttonTitle} children={CONST_READ_ARTICLE_TITLE}
                    labelType={LabelTypeProp.p3}
                    color={Styles.color.greenishBlue}
                />
                {
                    getSvgImages({
                        name: ImagesName.greenArrowLeft,
                        width: 5,
                        height: 8
                    })
                }
            </View>
        )
    }

    return (
        <View>
            <TitleWithUnderLine title={CONST_OPINION_TITLE} />
            <View style={style.mainContainer}>
                <TouchableOpacity testID='RichHTMLOpinonWidgetTO1' style={style.innerContainer} activeOpacity={0.9}
                    onPress={onPressOpinion}>
                    <View style={style.rightContainer}>
                        <TouchableOpacity testID='RichHTMLOpinonWidgetTO2' onPress={onPressWriter}>
                            <Image url={data.image}
                                size={normalize(80)}
                                resizeMode={'cover'}
                                type={'round'}
                                fallback={true}
                                fallbackName={ImagesName.authorDefaultName}
                            />
                        </TouchableOpacity>
                        <Label testID='RichHTMLOpinonWidgetLabel1' children={data.name} labelType={LabelTypeProp.p4}
                            style={style.authorName}
                            color={themeData.authorTitle}
                            numberOfLines={1} onPress={onPressWriter}
                            suppressHighlighting={true}
                        />
                    </View>
                    <View style={style.leftContainer}>
                        <Label testID='RichHTMLOpinonWidgetLabel2' children={data.title} labelType={LabelTypeProp.h2}
                            style={style.authorTitle}
                            color={themeData.authorTitle}
                            numberOfLines={3} onPress={onPressOpinion}
                            suppressHighlighting={true}
                        />
                        {buttonWithArrow()}
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    mainContainer: {
        backgroundColor: theme.whiteSurface,
        paddingHorizontal: 0.04 * screenWidth,
    },
    innerContainer: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: theme.whiteSurface,
        paddingVertical: 25,
        overflow: 'hidden',
    },
    rightContainer: {
        paddingRight: 30,
    },
    authorName: {
        textAlign: 'center',
        paddingVertical: 10,
    },
    authorTitle: {
        overflow: 'hidden',
    },
    arrowButtonContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    buttonTitle: {
        fontSize: normalize(15),
        lineHeight: normalize(36),
        marginRight: normalize(10),
        fontFamily: fonts.Effra_Arbc_Medium,
    },
    leftContainer: {
        width: '100%',
        justifyContent: 'space-between',
        overflow: 'hidden',
        flex: 1,
    }
})
