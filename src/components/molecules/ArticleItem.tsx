import { StyleSheet, View, ViewStyle } from 'react-native';
import React, { FunctionComponent } from 'react';
import { flatListUniqueKey, ScreensConstants } from 'src/constants/Constants'
import { ImageWithLabel } from '../atoms'
import { articleProps } from '../organisms'
import { ArticleWithOutImage } from '../molecules'
import { isNotEmpty, isTab, normalize } from 'src/shared/utils'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FixedTouchable from 'src/shared/utils/FixedTouchable';

export interface ArticleItemProps extends articleProps {
    index: number,
    articleItemStyle?: ViewStyle,
    showDivider?: boolean,
    showFooterTitle?: boolean,
    containerStyle?: ViewStyle,
    isJournalist?: boolean
}

const ArticleItem: FunctionComponent<ArticleItemProps> = ({
    image,
    imageStyle,
    articleItemStyle,
    onPressBookmark,
    showDivider,
    showFooterTitle,
    hideImage,
    containerStyle,
    isJournalist = false,
    ...props
}) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const onPress = () => {
        if (props.nid) {
            if (isJournalist) {
                navigation.push(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: props.nid, isRelatedArticle: true });
            } else {
                const screenName = props.isAlbum ? ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN : ScreensConstants.ARTICLE_DETAIL_SCREEN;
                navigation.navigate(screenName, { nid: props.nid });
            }
        }
    }

    return (
        <FixedTouchable onPress={onPress} style={{flex:1}}>
            <View key={flatListUniqueKey.ARTICLE_SECTION + props.index}
                style={StyleSheet.flatten([style.container, articleItemStyle])}>
                {!hideImage && isNotEmpty(image) && <ImageWithLabel url={image} {...props} onPressImage={onPress} imageStyle={imageStyle} />}
                <View style={StyleSheet.flatten([style.contentContainer, containerStyle])}>
                    <ArticleWithOutImage showDivider={showDivider} showFooterTitle={showFooterTitle} {...props} onPress={onPress}
                        onPressBookmark={onPressBookmark} titleStyle={props.titleStyle} bodyStyle={props.bodyStyle}
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
    }
})
