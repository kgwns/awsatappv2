import { View, StyleSheet } from 'react-native';
import React from 'react';
import { ButtonImage } from 'src/components/atoms/button-image/ButtonImage';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles';
import { isIOS, normalize, recordLogEvent } from 'src/shared/utils';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import Share from 'react-native-share'
import { ArticleDetailDataType } from 'src/redux/articleDetail/types';
import AdjustAnalyticsManager, { AdjustEventID } from 'src/shared/utils/AdjustAnalyticsManager';
import { getShareUrl } from 'src/shared/utils/utilities';

export const ArticleDetailFooter = ({
    articleDetailData,
    isBookmarked,
    onPressSave,
    onPressFontChange
}: {
    articleDetailData: ArticleDetailDataType,
    isBookmarked: boolean
    onPressSave: () => void,
    onPressFontChange: () => void
}) => {
    const articleSaveIcon = isBookmarked ? ImagesName.bookMarkActiveSVG : ImagesName.bookmark

    // const onPressThemeChange = () => {
    //     const isDark = isDarkTheme(theme)
    //     const updateTheme = isDark ? Theme.LIGHT : Theme.DARK
    //     dispatch(storeAppTheme(updateTheme))
    // }

    const onPressShare = async () => {
        const { title, view_node, shortUrl, nid } = articleDetailData
        recordLogEvent('Share_Article', {articleId: nid});
        await Share.open({
            title,
            url: getShareUrl(shortUrl,view_node),
            failOnCancel: true,
            subject: title
        }).then(response => {
            AdjustAnalyticsManager.trackEvent(AdjustEventID.SHARE_ARTICLE)
            console.log('Shared successfully :::', response)
        }).catch((error) => {
            console.log('Cancelled share request :::', error)
        })
    }

    const { themeData } = useTheme()
    const style = useThemeAwareObject(customStyle)
    return (
        <View style={style.container}>
            <ButtonImage icon={() => {
                return getSvgImages({
                    name: ImagesName.fontScaling,
                    size: normalize(21),
                    fill: themeData.primaryBlack
                });
            }} onPress={onPressFontChange}
            />
            <ButtonImage icon={() => {
                return getSvgImages({
                    name: ImagesName.share,
                    size: normalize(18),
                });
            }} onPress={onPressShare}
            />
            <ButtonImage icon={() => {
                return getSvgImages({
                    name: articleSaveIcon,
                    size: normalize(18),
                });
            }} onPress={onPressSave}
            />
        </View>
    );
};

const customStyle = (theme: CustomThemeType) => {
    return StyleSheet.create({
        container: {
            width: '100%',
            height: isIOS ? normalize(70) : normalize(60),
            paddingBottom: isIOS ? normalize(15) : 0,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: theme.secondaryWhite,
            position: 'absolute',
            bottom: 0
        }
    })
}
