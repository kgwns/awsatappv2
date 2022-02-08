import { View, StyleSheet } from 'react-native';
import React, { FunctionComponent } from 'react';
import { Divider, Label, LabelTypeProp, TextWithFlag } from '../atoms';
import { normalize } from 'src/shared/utils';
import { Styles } from '../../shared/styles';
import { articleFooterSample } from 'src/constants/SampleData';
import { ArticleFooter } from 'src/components/molecules';
import { TextWithFlagProps } from 'src/components/atoms';
import { decodeHTMLTags } from 'src/shared/utils/utilities';

export interface ArticleWithOutImageProps extends TextWithFlagProps {
    description: string,
    footerInfo?: any,
    contentStyle?: object,
    showDivider?: boolean
}

const ArticleWithOutImage: FunctionComponent<ArticleWithOutImageProps> = (props) => (
    <View style={{ ...props.contentStyle }}>
        <TextWithFlag labelType={LabelTypeProp.h2} {...props} />
        <Label labelType={LabelTypeProp.p3} children={decodeHTMLTags(props.description)} color={Styles.color.davyGrey} numberOfLines={3}/>
        <View style={ArticleWithOutImageStyle.footerContainer}>
            <ArticleFooter {...props.footerInfo ? { ...props.footerInfo } : { ...articleFooterSample }} />
        </View>
        { props.showDivider && <Divider />}
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