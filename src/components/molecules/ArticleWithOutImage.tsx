import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React, { FunctionComponent } from 'react';
import { Divider, Label, TextWithFlag } from '../atoms';
import { normalize } from 'src/shared/utils';
import { Styles } from '../../shared/styles';
import { ArticleFooter, ArticleFooterProps } from 'src/components/molecules';
import { TextWithFlagProps } from 'src/components/atoms';
import { decodeHTMLTags, isNotEmpty } from 'src/shared/utils/utilities';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { decode } from 'html-entities';
import { ArticleLabel } from './articleLabel/ArticleLabel';
export interface ArticleWithOutImageProps extends TextWithFlagProps {
    body?: string,
    footerInfo?: ArticleFooterProps,
    contentStyle?: StyleProp<ViewStyle>,
    footerContainerStyle?: StyleProp<ViewStyle>,
    viewStyle?: StyleProp<ViewStyle>,
    showDivider?: boolean,
    showFooterTitle?: boolean,
    onPress?: () => void
    isBookmarked: boolean
    hideBookmark?: boolean
    onPressBookmark?: () => void
    bodyLineCount?: number,
    showBody?: boolean,
    titleStyle?: StyleProp<TextStyle>,
    bodyStyle?: StyleProp<TextStyle>
    displayType?: string;
}

const ArticleWithOutImage: FunctionComponent<ArticleWithOutImageProps> = ({
    body,
    onPress,
    isBookmarked,
    hideBookmark = false,
    onPressBookmark,
    showDivider = true,
    showFooterTitle,
    bodyLineCount = 3,
    showBody= true,
    titleStyle,
    bodyStyle,
    footerContainerStyle,
    viewStyle,
    ...props
}) => {
    const style = useThemeAwareObject(customStyle)
    const bodyInfo = isNotEmpty(body) ? decodeHTMLTags(decode(body)) : ''
    
    return (
    <FixedTouchable onPress={onPress}>
        <View style={StyleSheet.flatten([props.contentStyle, !showDivider && {paddingBottom: normalize(10)}, viewStyle])}>
                <ArticleLabel displayType={props.displayType} enableBottomMargin/>
                <TextWithFlag {...props} style={titleStyle}/>
                {isNotEmpty(bodyInfo) && showBody && <Label 
                    children={bodyInfo}
                    color={Styles.color.davyGrey}
                    numberOfLines={bodyLineCount}
                    style={bodyStyle}
                />
                }
            <View style={[style.footerContainer,footerContainerStyle]}>
                <ArticleFooter showFooterTitle={showFooterTitle} {...props.footerInfo}
                    onPress={onPressBookmark}
                    isBookmarked={isBookmarked}
                    hideBookmark={hideBookmark}
                />
            </View>
            {showDivider && <Divider style={style.divider}/>}
        </View>
    </FixedTouchable>
    )
}

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
