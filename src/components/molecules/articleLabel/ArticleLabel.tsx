import React, { FC } from 'react';
import { View, StyleSheet, StyleProp, ViewProps } from 'react-native';
import { Label, LiveBlogTag } from 'src/components/atoms';
import { isIOS, isNotEmpty, normalize } from 'src/shared/utils';
import { DisplayTypes, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { Styles } from 'src/shared/styles';
import { fonts } from 'src/shared/styles/fonts';
import { colors } from 'src/shared/styles/colors';

type ArticleLabelTypes = {
    displayType?: string;
    enableTopMargin?: boolean;
    enableBottomMargin?: boolean;
    labelContainer?: StyleProp<ViewProps>
}

export const ArticleLabel: FC<ArticleLabelTypes> = ({
    displayType,
    enableTopMargin = false,
    enableBottomMargin = false,
    labelContainer
}) => {
    if (!isNotEmpty(displayType)) {
        return null;
    }

    const ANALYSIS_TITLE = TranslateConstants({ key: TranslateKey.ANALYSIS_TAG_TITLE });
    const SPECIAL_TITLE = TranslateConstants({ key: TranslateKey.SPECIAL_TAG_TITLE });
    const BREAKING_NEWS_TITLE = TranslateConstants({ key: TranslateKey.BREAKING_NEWS_TAG_TITLE });

    const renderLabel = (tagName: string, bgColor: string) => {
        const labelContainerStyle = StyleSheet.flatten([style.tagContainer,
        enableTopMargin && style.topMargin, enableBottomMargin && style.bottomMargin,labelContainer]);
        return (
            <View style={style.labelContainer} testID = {'labelId'}>
                <View style={[labelContainerStyle, { backgroundColor: bgColor }]}>
                    <Label children={tagName}
                        style={style.tagText}
                    />
                </View>
            </View>
        )
    }

    switch (displayType?.toLowerCase()) {
        case DisplayTypes.liveCoverage:
            return <LiveBlogTag enableTopMargin={enableTopMargin}
                enableBottomMargin={enableBottomMargin}
            />
        case DisplayTypes.analysis:
            return renderLabel(ANALYSIS_TITLE, colors.seaTurtleGreen);
        case DisplayTypes.special:
            return renderLabel(SPECIAL_TITLE, colors.richBlack);
        case DisplayTypes.breakingNews:
            return renderLabel(BREAKING_NEWS_TITLE, colors.darkWineRed);
        default:
            return null;
    }
}

const style = StyleSheet.create({
    tagContainer: {
        backgroundColor: Styles.color.greenishBlue,
        flexWrap: 'wrap',
    },
    tagText: {
        paddingVertical: normalize(3),
        paddingHorizontal: normalize(7),
        color: Styles.color.white,
        fontFamily: fonts.Effra_Arbc_Regular,
        fontSize: 12,
        lineHeight: isIOS ? 18 : 22,
    },
    topMargin: {
        marginTop: 10
    },
    bottomMargin: {
        marginBottom: 10
    },
    labelContainer: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
})

