import { View } from 'react-native';
import React, { FunctionComponent } from 'react';
import { Divider, Label, LabelTypeProp } from '../atoms';
import { normalize } from '../../shared/utils';
import { Styles } from '../../shared/styles';
import { articleFooterSample } from '../../constants/SampleData';
import { ArticleFooter } from '../molecules/index';

interface ArticleWithOutImageProps {
    title: string,
    description: string,
    footerInfo?: any
}

const ArticleWithOutImage: FunctionComponent<ArticleWithOutImageProps> = ({
    title, description,footerInfo
}) => {
    return (
        <View>
            <Label labelType={LabelTypeProp.h2} children={title} numberOfLines={3} />
            <Label labelType={LabelTypeProp.p3} children={description} color={Styles.color.davyGrey} />
            <View style={{ flex: 1, paddingTop: normalize(10) }}>
                <ArticleFooter {...footerInfo ? { ...footerInfo } : { ...articleFooterSample }} />
            </View>
            <Divider />
        </View>
    )
}

export default ArticleWithOutImage



