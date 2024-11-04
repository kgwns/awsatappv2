import { StyleSheet, View, ViewStyle } from 'react-native';
import React, { FunctionComponent } from 'react';
import { flatListUniqueKey, ScreensConstants } from 'src/constants/Constants'
import { ImageWithLabel } from '../atoms'
import { ArticleProps } from '../organisms'
import { ArticleWithOutImage } from '../molecules'
import { isNotEmpty, isTab, normalize } from 'src/shared/utils'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { EntityQueueArticleType } from 'src/redux/entityQueue/types';
import { HomePageArticleType } from 'src/redux/latestNews/types';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

export interface ArticleItemProps extends ArticleProps {
    index: number,
    articleItemStyle?: ViewStyle,
    showDivider?: boolean,
    showFooterTitle?: boolean,
    containerStyle?: ViewStyle,
    isJournalist?: boolean,
    mainContainerStyle?: ViewStyle,
    tabletArticleContainerStyle?: ViewStyle,
    tabBodyLineCount?: number
}

const ArticleItem: FunctionComponent<ArticleItemProps> = ({
    image,
    imageStyle,
    articleItemStyle,
    onPressBookmark,
    showDivider,
    showFooterTitle,
    hideImage,
    hideBookmark = false,
    containerStyle,
    isJournalist = false,
    mainContainerStyle,
    tabletArticleContainerStyle,
    tabBodyLineCount,
    ...props
}) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const onPress = () => {
        if (props.nid) {
            if (props.type === HomePageArticleType.SHORTHAND) {
                const url = props.link ? props.link : "";
                InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'close',
                    readerMode: false,
                    modalEnabled: true,
                    animated: true,
                    enableBarCollapsing: true,
                    // // Android Properties
                    showTitle: true,
                })
            } else if (isJournalist) {
                navigation.push(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: props.nid, isRelatedArticle: true });
            } else {
                const screenName = props.isAlbum || props.type === EntityQueueArticleType.ALBUM ? 
                    ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN : 
                    props.type === EntityQueueArticleType.OPINION ? ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN :
                    ScreensConstants.ARTICLE_DETAIL_SCREEN;
                navigation.navigate(screenName, { nid: props.nid });
            }
        }
    }

    return (
        <FixedTouchable onPress={onPress} style={[style.mainContainer,mainContainerStyle]}>
            <View key={flatListUniqueKey.ARTICLE_SECTION + props.index}
                style={StyleSheet.flatten([style.container, articleItemStyle,tabletArticleContainerStyle])}>
                {!hideImage && isNotEmpty(image) && <ImageWithLabel url={image} {...props} onPressImage={onPress} imageStyle={imageStyle} />}
                <View style={StyleSheet.flatten([style.contentContainer, containerStyle])}>
                    <ArticleWithOutImage showDivider={showDivider} showFooterTitle={showFooterTitle} {...props} onPress={onPress}
                        onPressBookmark={onPressBookmark} titleStyle={props.titleStyle} bodyStyle={props.bodyStyle}
                        bodyLineCount={tabBodyLineCount} hideBookmark={hideBookmark || props.type === HomePageArticleType.SHORTHAND} displayType={undefined}  //DisplayType with display in ImageWithLabel itself
                    />
                </View>
            </View>
        </FixedTouchable>
    )
}

export default ArticleItem;

const style = StyleSheet.create({
    contentContainer: {
        paddingTop: isTab ? normalize(15) : normalize(5),
    },
    container: {
        paddingBottom: normalize(25),
        flex: 1,
        overflow: 'hidden',
    },
    mainContainer: {
        flex: 1
    }
})
