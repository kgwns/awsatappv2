import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { FunctionComponent } from 'react';
import { Divider, Label, LabelTypeProp, TextWithFlag } from '../atoms';
import { normalize } from 'src/shared/utils';
import { Styles } from '../../shared/styles';
import { ArticleFooter, articleFooterProps } from 'src/components/molecules';
import { TextWithFlagProps } from 'src/components/atoms';
import { decodeHTMLTags } from 'src/shared/utils/utilities';

export interface ArticleWithOutImageProps extends TextWithFlagProps {
    body?: string,
    footerInfo?: articleFooterProps,
    contentStyle?: object,
    showDivider?: boolean,
    showFooterTitle?: boolean,
    onPress: () => void
    isBookmarked: boolean
    onPressBookmark?: () => void
}

const ArticleWithOutImage: FunctionComponent<ArticleWithOutImageProps> = ({
    body,
    onPress,
    isBookmarked,
    onPressBookmark,
    showDivider = true,
    showFooterTitle,
    ...props
}) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={[{ ...props.contentStyle }, !showDivider && {paddingBottom: normalize(10)}]}>
            <TextWithFlag labelType={LabelTypeProp.h2} {...props} />
            {body && <Label labelType={LabelTypeProp.p3} children={decodeHTMLTags(body)} color={Styles.color.davyGrey} numberOfLines={3} />}
            <View style={ArticleWithOutImageStyle.footerContainer}>
                <ArticleFooter showFooterTitle={showFooterTitle} {...props.footerInfo}
                    onPress={onPressBookmark}
                    isBookmarked={isBookmarked}
                />
            </View>
            {showDivider && <Divider />}
        </View>
    </TouchableWithoutFeedback>
)

export default ArticleWithOutImage

const ArticleWithOutImageStyle = StyleSheet.create({
    footerContainer: {
        flex: 1,
        paddingTop: normalize(10),
    },
});