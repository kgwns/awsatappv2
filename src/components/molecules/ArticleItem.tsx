import { View } from 'react-native';
import React, { FunctionComponent } from 'react';
import { flatListUniqueKey } from '../../constants';
import { ImageWithLabel } from '../atoms';
import { articleProps } from '../organisms/ArticleSection';
import ArticleWithOutImage from './ArticleWithOutImage';

export interface ArticleItemProps extends articleProps {
    index: number
}

const ArticleItem: FunctionComponent<ArticleItemProps> = ({
    image,
    tagName,
    title,
    description,
    index
}) => {
    return (
        <View key={flatListUniqueKey.ARTICLE_SECTION + index}>
            {image && <ImageWithLabel url={image} tagName={tagName} />}
            <ArticleWithOutImage title={title} description={description} />
        </View>
    );
};

export default ArticleItem;
