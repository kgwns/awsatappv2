import { StyleSheet, View, ViewStyle } from 'react-native';
import React, { FunctionComponent } from 'react';
import { flatListUniqueKey, ScreensConstants } from 'src/constants'
import { ImageWithLabel } from '../atoms'
import { articleProps } from '../organisms'
import { ArticleWithOutImage } from '../molecules'
import { normalize } from 'src/shared/utils'
import { useNavigation } from '@react-navigation/native';

export interface ArticleItemProps extends articleProps {
    index: number,
    articleItemStyle: ViewStyle
}

const ArticleItem: FunctionComponent<ArticleItemProps> = ({
    image,
    imageStyle,
    articleItemStyle,
    ...props
}) => {
    const navigation = useNavigation()
    const onPress = () => {
        navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN)
    }

    return (
        <View key={flatListUniqueKey.ARTICLE_SECTION + props.index}
            style={StyleSheet.flatten([{ paddingBottom: normalize(20) }, articleItemStyle])}>
            {image && <ImageWithLabel url={image} {...props} onPress={onPress} imageStyle={imageStyle} />}
            <ArticleWithOutImage {...props} />
        </View>
    )
}

export default ArticleItem;
