import { StyleSheet, View, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import React, { FunctionComponent } from 'react';
import { flatListUniqueKey, ScreensConstants } from 'src/constants'
import { ImageWithLabel } from '../atoms'
import { articleProps } from '../organisms'
import { ArticleWithOutImage } from '../molecules'
import { isNotEmpty, isTab, normalize } from 'src/shared/utils'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ArticleItemProps extends articleProps {
    index: number,
    articleItemStyle?: ViewStyle,
    showDivider?: boolean,
    showFooterTitle?: boolean,
}

const ArticleItem: FunctionComponent<ArticleItemProps> = ({
    image,
    imageStyle,
    articleItemStyle,
    onPressBookmark,
    showDivider,
    showFooterTitle,
    ...props
}) => {
    const navigation = useNavigation<StackNavigationProp<any>>()
    const onPress = () => {
        if (props.nid) {
            navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: props.nid })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View key={flatListUniqueKey.ARTICLE_SECTION + props.index}
                style={StyleSheet.flatten([{ paddingBottom: normalize(25) }, articleItemStyle])}>
                {isNotEmpty(image) && <ImageWithLabel url={image} {...props} onPressImage={onPress} imageStyle={imageStyle} />}
                <View style={style.contentContainer}>
                    <ArticleWithOutImage showDivider={showDivider} showFooterTitle={showFooterTitle} {...props} onPress={onPress}
                        onPressBookmark={onPressBookmark}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default ArticleItem;

const style = StyleSheet.create({
    contentContainer: {
        paddingTop: isTab ? normalize(15) : normalize(10)
    }
})
