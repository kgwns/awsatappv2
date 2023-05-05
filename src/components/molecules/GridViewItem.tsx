import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { isNotEmpty, isTab, normalize, screenWidth } from 'src/shared/utils';
import {  Image} from 'src/components/atoms/image/Image';
import { Label, LabelTypeProp } from 'src/components/atoms/label/Label'
import { RenderPhotoIcon } from 'src/components/atoms/bannerImageWithOverlay/BannerImageWithOverlay';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { ImageResize } from 'src/shared/styles/text-styles';
import { fonts } from 'src/shared/styles/fonts';
import { ArticleLabel } from './articleLabel/ArticleLabel';
import { ArticleFooterProps } from './articleFooter/ArticleFooter';
import ArticleWithOutImage from './ArticleWithOutImage';

export interface GridViewItemProps {
    imageUrl?: string;
    highlightedTitle?: string;
    title?: string;
    showHighlightTitle?: boolean;
    index: number;
    isAlbum: boolean;
    displayType: string;
    showDivider?: boolean;
    showFooterTitle?: boolean,
    titleStyle?: StyleProp<ViewStyle>,
    containerStyle?: StyleProp<ViewStyle>,
    footerData?: ArticleFooterProps
    bodyStyle?: StyleProp<TextStyle>,
    tabBodyLineCount?:number
}

export const GridViewItem = ({
    imageUrl,
    highlightedTitle,
    title,
    showHighlightTitle = true,
    index,
    isAlbum = false,
    displayType,
    showDivider,
    showFooterTitle,
    titleStyle,
    containerStyle,
    footerData,
    bodyStyle,
    tabBodyLineCount,
    ...props
}: GridViewItemProps) => {
    const style = useThemeAwareObject(customStyle);
    const isOdd = (index + 1) % 2 === 0;

    return (
        <View style={[ !isTab && style.container, !isOdd && !isTab && style.borderStyle]}>
            {imageUrl &&
                <View style={ style.imageContainerStyle} >
                    <Image url={imageUrl} style={style.image}
                        resizeMode={ImageResize.COVER} fallback
                        defaultImageStyle={style.image}
                    />
                    {isAlbum && <RenderPhotoIcon />}
                </View>
            }
            {showHighlightTitle && !isNotEmpty(displayType) && <Label style={style.highlightedTitle} children={highlightedTitle} labelType={LabelTypeProp.h5} />}
            <ArticleLabel displayType={displayType} enableTopMargin/>
            {title &&
                <Label style={style.title} children={title} numberOfLines={3} />
            }
            {
            isTab &&  <View>
                <ArticleWithOutImage isBookmarked={false} showDivider={showDivider} 
                showFooterTitle={showFooterTitle} {...props}
                 footerInfo={footerData} bodyStyle={bodyStyle} bodyLineCount={tabBodyLineCount}
                displayType={undefined} //DisplayType with display in ImageWithLabel itself
                />
            </View>
            }
            
            <View style={style.dividerContainer} />
        </View>
    );
};

const customStyle = (theme: CustomThemeType) => {
    return StyleSheet.create({
        container: {
            width: 0.5 * screenWidth,
            alignItems: 'flex-start',
            paddingHorizontal: 0.04 * screenWidth,
            marginTop: 30
        },
        image: {
            width: '100%',
            height: '100%'
        },
        highlightedTitle: {
            fontSize: isTab ? 13 : 12,
            lineHeight: isTab ? 16 : 18,
            marginTop: normalize(10),
            color: theme.primary,
            fontFamily: fonts.Effra_Arbc_Regular,
        },
        title: {
            fontSize: isTab ? 18 : 14,
            lineHeight: isTab ? 29 : 22,
            marginTop: normalize(8),
            color: theme.primaryBlack,
            textAlign: 'left',
            fontFamily: fonts.AwsatDigital_Bold,
        },
        imageContainerStyle: {
            width: '100%',
            height: 'auto',
            aspectRatio: 4/3
        },
        borderStyle: {
            borderRightWidth: 1,
            borderColor: theme.dividerColor
        },
        dividerContainer: {
            height: 0.01
        },
    });
};

export default GridViewItem;
