import React from 'react';
import { StyleSheet, View } from 'react-native';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import {  Image} from 'src/components/atoms/image/Image';
import { Label, LabelTypeProp } from 'src/components/atoms/label/Label'
import { LiveBlogTag } from 'src/components/atoms/liveBlogTag/LiveBlogTag';
import { RenderPhotoIcon } from 'src/components/atoms/bannerImageWithOverlay/BannerImageWithOverlay';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { ImageResize } from 'src/shared/styles/text-styles';
import { fonts } from 'src/shared/styles/fonts';

export interface GridViewItemProps {
    imageUrl?: string;
    highlightedTitle?: string;
    title?: string;
    showHighlightTitle?: boolean;
    index: number;
    isLive?: boolean;
    isAlbum: boolean;
}

export const GridViewItem = ({
    imageUrl,
    highlightedTitle,
    title,
    showHighlightTitle = true,
    index,
    isLive = false,
    isAlbum = false,
}: GridViewItemProps) => {
    const style = useThemeAwareObject(customStyle);
    const isOdd = (index + 1) % 2 === 0;

    return (
        <View style={[style.container, !isOdd && style.borderStyle]}>
            {imageUrl &&
                <View style={isTab ? style.tabImageStyle : style.imageContainerStyle} >
                    <Image url={imageUrl} style={style.image}
                        resizeMode={ImageResize.COVER} fallback
                        defaultImageStyle={style.image}
                    />
                    {isAlbum && <RenderPhotoIcon />}
                </View>
            }
            {showHighlightTitle && !isLive && <Label style={style.highlightedTitle} children={highlightedTitle} labelType={LabelTypeProp.h5} />}
            {isLive && <LiveBlogTag enableTopMargin/>}
            {title &&
                <Label style={style.title} children={title} numberOfLines={3} />
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
            fontSize: isTab ? 14 : 12,
            lineHeight: isTab ? 20 : 18,
            marginTop: normalize(10),
            color: theme.primary,
            fontFamily: fonts.Effra_Arbc_Regular,
        },
        title: {
            fontSize: isTab ? 20 : 14,
            lineHeight: isTab ? 32 : 22,
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
        tabImageStyle: {
            width: '100%',
            aspectRatio: 4/3,
            height: 'auto'
        }
    });
};

export default GridViewItem;
