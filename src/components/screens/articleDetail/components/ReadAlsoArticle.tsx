import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Label, LabelTypeProp, TitleWithUnderLine } from 'src/components/atoms';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { CustomThemeType } from 'src/shared/styles/colors';
import { decodeHTMLTags, screenWidth } from 'src/shared/utils';
import { Styles } from 'src/shared/styles';
import { decode } from 'html-entities';
import { fonts } from 'src/shared/styles/fonts';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { ScreensConstants } from 'src/constants/Constants';
import { useArticleDetail } from 'src/hooks/useArticleDetail';

export type ReadAlsoDataType = {
    title: string;
    nid: string;
}

type ReadAlsoArticleProps = {
    title: string;
    data: ReadAlsoDataType[];
}

export const ReadAlsoArticle = ({
    title,
    data,
}: ReadAlsoArticleProps) => {
    const navigation = useNavigation<StackNavigationProp<any>>();
    const style = useThemeAwareObject(customStyle)

    const { emptyAllData } = useArticleDetail()

    const onPress = (item: ReadAlsoDataType) => {
        if (item.nid) {
            emptyAllData()
            navigation.push(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: item.nid, hasHTMLContent: true });
        }
    };

    return (
        <View>
            <TitleWithUnderLine title={title} />
            <View style={style.bodyBackgroundContainer}>
                <View style={style.readAlsoListContainer}>
                    {
                        data.map((item, index) => {
                            const showDivider = data.length > index + 1
                            return (
                                <TouchableOpacity testID='ReadAlsoArticleTO1' activeOpacity={0.8} onPress={() => onPress(item)}>
                                    <Label children={decode(decodeHTMLTags(item.title))}
                                        labelType={LabelTypeProp.p2}
                                        color={Styles.color.greenishBlue}
                                        style={style.contentText}
                                    />
                                    {showDivider && <View style={style.divider} />}
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    bodyBackgroundContainer: {
        backgroundColor: theme.whiteSurface,
        paddingBottom: 15,
    },
    readAlsoListContainer: {
        padding: 0.04 * screenWidth,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: theme.dividerColor,
        marginVertical: 15,
    },
    contentText: {
        fontFamily: fonts.Effra_Arbc_Medium
    }
})
