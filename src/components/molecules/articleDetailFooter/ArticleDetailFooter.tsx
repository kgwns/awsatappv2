import { View, StyleSheet } from 'react-native';
import React from 'react';
import { ButtonImage } from 'src/components/atoms/button-image/ButtonImage';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles';
import { isIOS, isTab, normalize } from 'src/shared/utils';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import Share from 'react-native-share'
import { ArticleDetailDataType } from 'src/redux/articleDetail/types';
import AdjustAnalyticsManager, { AdjustEventID } from 'src/shared/utils/AdjustAnalyticsManager';
import { decodeHTMLTags, getShareUrl } from 'src/shared/utils/utilities';
import { articleEvents } from 'src/shared/utils/analyticsEvents';
import { AnalyticsEvents } from 'src/shared/utils/analytics';

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
    const onPressShare = async () => {
        const { title, link_node, shortUrl,publishedDate,author,tagTopicsList,body } = articleDetailData;
        const decodeBody = decodeHTMLTags(body);
        const eventName = AnalyticsEvents.SOCIAL_SHARE;
        articleEvents(title, author, publishedDate, decodeBody, tagTopicsList, eventName);
        await Share.open({
            title,
            url: getShareUrl(shortUrl,link_node),
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
    const style = useThemeAwareObject(customStyle);

    const fontScalingTab = getSvgImages({
        name: ImagesName.fontScalingBold,
        width: 40,
        height: 28,
        fill: themeData.primaryBlack
      });
    
      const shareTab = getSvgImages({
        name: ImagesName.shareBold,
        width: 37,
        height: 36,
      });
    
      const saveTab = getSvgImages({
        name: isBookmarked ? ImagesName.bookMarkActiveSVG : ImagesName.bookmarkBold,
        width: 19,
        height: 33,
      });


    const fontScalingMobile = getSvgImages({
        name: ImagesName.fontScaling,
        size: normalize(21),
        fill: themeData.primaryBlack
    });

    const shareMobile = getSvgImages({
        name: ImagesName.share,
        size: normalize(18),
    });

    const saveMobile = getSvgImages({
        name: isBookmarked ? ImagesName.bookMarkActiveSVG : ImagesName.bookmark,
        size: normalize(18),
    });


    return (
        <View style={style.container} testID='containerId'>
            <ButtonImage icon={() => isTab ? fontScalingTab : fontScalingMobile}
                onPress={onPressFontChange}
            />
            <ButtonImage icon={() => isTab ? shareTab : shareMobile}
                onPress={onPressShare}
            />
            <ButtonImage icon={() => isTab ? saveTab : saveMobile}
                onPress={onPressSave}
            />
        </View>
    );
};

const customStyle = (theme: CustomThemeType) => {
    return StyleSheet.create({
        container: {
            width: '100%',
            height: isTab ? 104 : isIOS ? normalize(70) : normalize(60),
            paddingBottom: isIOS ? normalize(15) : 0,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: theme.secondaryWhite,
            position: 'absolute',
            bottom: 0,
            paddingHorizontal: isTab ? '20%' : 0,
        }
    })
}
