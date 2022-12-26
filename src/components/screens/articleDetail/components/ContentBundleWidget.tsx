import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Label, LabelTypeProp } from 'src/components/atoms/label/Label';
import { TitleWithUnderLine } from 'src/components/atoms/titleWithUnderLine/TitleWithUnderLine';
import { Image } from 'src/components/atoms/image/Image';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors';
import { decodeHTMLTags, isObjectNonEmpty, normalize, screenWidth } from 'src/shared/utils';
import { fonts } from 'src/shared/styles/fonts';
import { ArticleContentDataInfoType } from 'src/redux/articleDetail/types';
import { ImageResize } from 'src/shared/styles/text-styles';
import { decode } from 'html-entities';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName, Styles } from 'src/shared/styles';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useArticleDetail } from 'src/hooks/useArticleDetail';

type ContentBundleWidgetProps = {
    title: string;
    data: ArticleContentDataInfoType;
}

export const ContentBundleWidget = ({
    title,
    data,
}: ContentBundleWidgetProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const style = useThemeAwareObject(customStyle)

    const CONST_MORE = TranslateConstants({ key: TranslateKey.CONST_MORE })

    const { emptyAllData } = useArticleDetail()

    const onPress = () => {
        if (data.nid) {
            emptyAllData()
            navigation.push(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: data.nid, hasHTMLContent: true });
        }
    };

    const buttonWithArrow = () => {
        return (
            <View style={style.arrowButtonContainer}>
                <Label style={style.buttonTitle} children={CONST_MORE} labelType={LabelTypeProp.p3}
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

    if(!isObjectNonEmpty(data)) {
        return null
    }

    return (
        <View>
            <TitleWithUnderLine title={title} />
            <View style={style.bodyBackgroundContainer}>
                <TouchableOpacity testID='ContentBundleWidgetTO1' activeOpacity={0.8} style={style.contentListContainer} onPress={onPress}>
                    <Image
                        resizeMode={ImageResize.COVER}
                        style={style.image}
                        url={data.image}
                        fallback
                    />
                    <Label children={data.title} style={style.articleTitle} />
                    <Label children={decode(decodeHTMLTags(data.body))}
                        style={style.articleDescription}
                        numberOfLines={10}
                    />
                    {buttonWithArrow()}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    bodyBackgroundContainer: {
        backgroundColor: theme.whiteSurface,
        paddingBottom: 15,
    },
    contentListContainer: {
        padding: 0.04 * screenWidth,
    },
    contentText: {
        fontFamily: fonts.Effra_Arbc_Medium
    },
    image: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1.82,
    },
    articleTitle: {
        fontFamily: fonts.AwsatDigital_Bold,
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'left',
        paddingVertical: 8,
        color: theme.primaryBlack
    },
    articleDescription: {
        fontFamily: fonts.Effra_Arbc_Regular,
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'justify',
        direction: 'rtl',
        writingDirection: 'rtl',
        color: Styles.color.davyGrey,
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
})
