import { View, StyleSheet, TouchableWithoutFeedback, StyleProp, ViewStyle } from 'react-native';
import React, { FunctionComponent } from 'react';
import { Divider, Label, LabelTypeProp, TextWithFlag } from '../atoms';
import { normalize } from 'src/shared/utils';
import { Styles } from '../../shared/styles';
import { ArticleFooter, articleFooterProps } from 'src/components/molecules';
import { TextWithFlagProps } from 'src/components/atoms';
import { decodeHTMLTags, isNotEmpty } from 'src/shared/utils/utilities';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';

export interface ArticleWithOutImageProps extends TextWithFlagProps {
    body?: string,
    footerInfo?: articleFooterProps,
    contentStyle?: StyleProp<ViewStyle>,
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
}) => {
    const style = useThemeAwareObject(customStyle)
    return (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={StyleSheet.flatten([props.contentStyle, !showDivider && {paddingBottom: normalize(10)}])}>
            <TextWithFlag labelType={LabelTypeProp.h2} {...props} />
            {isNotEmpty(body) && <Label labelType={LabelTypeProp.p3} children={decodeHTMLTags(body)} color={Styles.color.davyGrey} numberOfLines={3} />}
            <View style={style.footerContainer}>
                <ArticleFooter showFooterTitle={showFooterTitle} {...props.footerInfo}
                    onPress={onPressBookmark}
                    isBookmarked={isBookmarked}
                />
            </View>
            {showDivider && <Divider style={style.divider}/>}
        </View>
    </TouchableWithoutFeedback>
    )}

export default ArticleWithOutImage

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    footerContainer: {
        flex: 1,
        paddingTop: normalize(15),
    },
    divider: {
        height: 1,
        backgroundColor: theme.dividerColor
    },
});