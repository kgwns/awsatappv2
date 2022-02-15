import { View, StyleSheet } from 'react-native';
import React, { FunctionComponent } from 'react';
import { Divider, Label, LabelTypeProp, TextWithFlag } from '../atoms';
import { normalize } from 'src/shared/utils';
import { Styles } from '../../shared/styles';
import { articleFooterSample } from 'src/constants/SampleData';
import { ArticleFooter, articleFooterProps } from 'src/components/molecules';
import { TextWithFlagProps } from 'src/components/atoms';
import { decodeHTMLTags } from 'src/shared/utils/utilities';

export interface ArticleWithOutImageProps extends TextWithFlagProps {
    body?: string,
    footerInfo?: articleFooterProps,
    contentStyle?: object,
    showDivider?: boolean
}

const ArticleWithOutImage: FunctionComponent<ArticleWithOutImageProps> = ({
    body,
    ...props
}) => (
    <View style={{ ...props.contentStyle }}>
        <TextWithFlag labelType={LabelTypeProp.h2} {...props} />
        {body && <Label labelType={LabelTypeProp.p3} children={decodeHTMLTags(body)} color={Styles.color.davyGrey} numberOfLines={3}/>} 
        <View style={ArticleWithOutImageStyle.footerContainer}>
            <ArticleFooter {...props.footerInfo} />
        </View>
        {props.showDivider && <Divider />}
    </View>
)

ArticleWithOutImage.defaultProps = {
    showDivider: true
}

export default ArticleWithOutImage

const ArticleWithOutImageStyle = StyleSheet.create({
    footerContainer: {
        flex: 1,
        paddingTop: normalize(10),
    },
});