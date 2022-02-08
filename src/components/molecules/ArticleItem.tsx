import { View } from 'react-native';
import React, { FunctionComponent } from 'react';
import { flatListUniqueKey } from 'src/constants'
import { ImageWithLabel } from '../atoms'
import { articleProps } from '../organisms'
import {ArticleWithOutImage} from '../molecules'
import { normalize } from 'src/shared/utils'

export interface ArticleItemProps extends articleProps {
    index: number
}

const ArticleItem: FunctionComponent<ArticleItemProps> = ({
    image,imageStyle,...props}) => (
    <View key={flatListUniqueKey.ARTICLE_SECTION + props.index} style={{ paddingBottom: normalize(20) }}>
        {image && <ImageWithLabel url={image} imageStyle={imageStyle}
            tagName={props.tagName} tagStyle={props.tagStyle} tagLabelType={props.tagLabelType} />}
        <ArticleWithOutImage showDivider={false} {...props} />
    </View>
)

export default ArticleItem;
