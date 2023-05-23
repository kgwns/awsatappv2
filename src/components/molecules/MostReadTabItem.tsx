import { StyleSheet, View } from 'react-native';
import React, { FunctionComponent } from 'react';
import { Image, Label } from 'src/components/atoms';
import { ArticleFooter } from '../molecules'
import { dateTimeAgo, decodeHTMLTags, getArticleImage, isNotEmpty, screenWidth } from 'src/shared/utils'
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { decode } from 'html-entities';
import { TimeIcon, isTypeAlbum } from 'src/shared/utils/utilities';
import { Styles } from 'src/shared/styles';
import { fonts } from 'src/shared/styles/fonts';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants } from 'src/constants/Constants';
import { useOrientation } from 'src/hooks';
import { EntityQueueArticleType } from 'src/redux/entityQueue/types';

export interface MostReadTabItemProps {
    articleData: any,
    index: number,
    onPressBookmark: () => void;
    visibleNoTag?: boolean;
}

const MostReadTabItem: FunctionComponent<MostReadTabItemProps> = ({ articleData, index, onPressBookmark, visibleNoTag = false }) => {

    const navigation = useNavigation<StackNavigationProp<any>>()
    const style = useThemeAwareObject(MostReadTabItemStyle);
    const { isPortrait } = useOrientation();
    const descriptionLines = isPortrait ? 2 : 4;

    articleData.tagName = (index + 1).toString();
    const timeFormat = dateTimeAgo(articleData.changed);
    const title = isNotEmpty(articleData.title) ? decodeHTMLTags(decode(articleData.title)) : '';
    const description = isNotEmpty(articleData.body) ? decodeHTMLTags(decode(articleData.body)) : '';
    const articleImage = articleData.image ? articleData.image : getArticleImage(articleData.field_image, articleData.field_new_photo);
    const noTag = articleData.tagName;
    const isArticleBookmarked = articleData.isBookmarked
    const footerInfo = {
        rightTitle: timeFormat.time,
        rightTitleStyle: style.footerRightTitleStyle,
        rightIcon: () => TimeIcon(timeFormat.icon),
        rightTitleColor: style.footerTitleColor.color,
        leftTitleStyle: style.leftFooterStyle,
    };

    const onPress = () => {
        if (articleData.nid) {
            const screenName = isTypeAlbum(articleData.type) ? ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN : 
                (articleData.type === EntityQueueArticleType.OPINION) ? ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN : ScreensConstants.ARTICLE_DETAIL_SCREEN;
            navigation.navigate(screenName, { nid: articleData.nid });
        }
    }

    return (
        <FixedTouchable onPress={onPress}>
            <View style={style.tabContainer}>
                <View style={style.tabImageContainer}>
                    <Image style={style.tabImageStyle} resizeMode={'cover'} url={articleImage} />
                    {visibleNoTag && <View style={style.tabTagContainer}>
                        <Label children={noTag} style={style.tagText} />
                    </View>}
                </View>
                <View style={[style.tabContentContainer, !isPortrait && style.tabContentContainerLandscape]}>
                    <Label children={title} style={style.tabTitleStyle} />
                    <Label children={description} numberOfLines={descriptionLines} style={style.tabDescriptionStyle} />
                    <View>
                        <ArticleFooter showFooterTitle={true} {...footerInfo} isBookmarked={isArticleBookmarked}
                            onPress={onPressBookmark}
                        />
                    </View>
                </View>
            </View>
        </FixedTouchable>
    )
}

export default MostReadTabItem;

const MostReadTabItemStyle = (theme: CustomThemeType) => StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        width: '90%',
        marginBottom: 40,
        marginHorizontal: 0.05 * screenWidth,
    },
    tabImageContainer: {
        width: '50%',
    },
    tabTagContainer: {
        position: 'absolute',
        top: 0,
        left: 15,
        backgroundColor: Styles.color.greenishBlue,
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    tabImageStyle: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1.34
    },
    tagText: {
        paddingTop: 10,
        paddingHorizontal: 10,
        color: Styles.color.white,
        fontFamily: fonts.AwsatDigital_Regular,
        fontSize: 25,
        lineHeight: 35,
        fontWeight: '400',
    },
    tabContentContainer: {
        width: '48%',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        marginLeft: 10,
        borderBottomColor: Styles.color.lightAlterGray
    },
    tabTitleStyle: {
        textAlign: 'left',
        fontSize: 20,
        lineHeight: 30,
        fontWeight: '700',
        fontFamily: fonts.AwsatDigital_Bold,
        color: theme.primaryBlack
    },
    tabDescriptionStyle: {
        textAlign: 'left',
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '400',
        fontFamily: fonts.Effra_Arbc_Regular,
        marginTop: 5,
        color: theme.tabMostReadBodyColor
    },
    leftFooterStyle: {
        fontFamily: fonts.IBMPlexSansArabic_Bold,
        fontSize: 12,
        lineHeight: 14
    },
    footerTitleColor: {
        color: theme.footerTextColor
    },
    footerRightTitleStyle: {
        fontFamily: fonts.Effra_Arbc_Regular,
        lineHeight: 40,
        fontSize: 12
    },
    tabContentContainerLandscape: {
        width: '53%',
    }
})
