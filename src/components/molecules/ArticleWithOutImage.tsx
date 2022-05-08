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
import { fonts } from 'src/shared/styles/fonts';

export interface ArticleWithOutImageProps extends TextWithFlagProps {
    body?: string,
    footerInfo?: articleFooterProps,
    contentStyle?: StyleProp<ViewStyle>,
    showDivider?: boolean,
    showFooterTitle?: boolean,
    onPress?: () => void
    isBookmarked: boolean
    onPressBookmark?: () => void
    bodyLineCount?: number,
    showBody?: boolean,
    bodyStyle?: StyleProp<ViewStyle>
}

const ArticleWithOutImage: FunctionComponent<ArticleWithOutImageProps> = ({
    body,
    onPress,
    isBookmarked,
    onPressBookmark,
    showDivider = true,
    showFooterTitle,
    bodyLineCount = 3,
    showBody= true,
    bodyStyle,
    ...props
}) => {
    const style = useThemeAwareObject(customStyle)
    const bodyInfo = isNotEmpty(body) ? decodeHTMLTags(body) : ''
    return (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={StyleSheet.flatten([props.contentStyle, !showDivider && {paddingBottom: normalize(10)}])}>
                <TextWithFlag labelType={LabelTypeProp.h2} {...props} />
                {isNotEmpty(bodyInfo) && showBody && <Label labelType={LabelTypeProp.p3}
                    children={bodyInfo}
                    color={Styles.color.davyGrey}
                    numberOfLines={bodyLineCount}
                    style={bodyStyle}
                />
                }
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