import { View, StyleSheet, ImageStyle } from 'react-native'
import React from 'react'
import { Image } from '../image/Image'
import { isNotEmpty, normalize } from 'src/shared/utils'
import { ImageName } from '..'
import { Label, LabelTypeProp,LabelType } from 'src/components/atoms/label/Label'
import { ImagesName, Styles } from 'src/shared/styles'
import { ImageResize } from 'src/shared/styles/text-styles'
import { fonts } from 'src/shared/styles/fonts'
import FixedTouchable from 'src/shared/utils/FixedTouchable'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { ArticleLabel } from 'src/components/molecules/articleLabel/ArticleLabel'

export interface ImageLabelProps {
    name?: ImageName,
    url?: string,
    tagName?: string,
    style?: string,
    tagStyle?: object,
    tagLabelType?: LabelType,
    imageStyle?: ImageStyle,
    onPressImage?: () => void,
    isAlbum?: boolean,
    displayType?: string;
}

export const ImageWithLabel = ({ name, url, tagName,tagStyle,
    tagLabelType = LabelTypeProp.caption3,
    imageStyle,
    onPressImage,
    isAlbum = false,
    displayType,
}: ImageLabelProps) => {

    const renderPhotoIcon = () => {
        return getSvgImages({
            name: ImagesName.photoIcon,
            width: 27,
            height: 22,
          });
    }

    const renderArticleLabel = () => {
        if (!isNotEmpty(displayType)) {
            return null
        }
        return (
            <View style={StyleSheet.flatten([imageWithLabelStyle.tagContainer])}>
                <ArticleLabel displayType={displayType} />
            </View>
        );
    }

    return (
        <FixedTouchable onPress={onPressImage}>
            <View style={imageWithLabelStyle.containerStyle}>
                <Image fallback name={name} url={url}
                    style={[imageWithLabelStyle.articleImage, imageStyle]}
                    resizeMode={ImageResize.COVER}
                />
                {isNotEmpty(tagName) && !isNotEmpty(displayType) &&
                    <View style={StyleSheet.flatten([imageWithLabelStyle.tagContainer, tagStyle])}>
                        <Label children={tagName}
                            style={imageWithLabelStyle.tagText}
                            labelType={tagLabelType}
                        />
                    </View>
                }
                {renderArticleLabel()}
                {isAlbum && 
                    <View style={imageWithLabelStyle.albumContainer}>
                        {renderPhotoIcon()}
                    </View>
                }
            </View>
        </FixedTouchable>
    )
}


const imageWithLabelStyle = StyleSheet.create({
    articleImage: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1.34,
    },
    tagContainer: {
        position: 'absolute',
        left: 0,
        backgroundColor: Styles.color.greenishBlue,
        flexWrap: 'wrap',
    },
    tagText: {
        paddingVertical: normalize(3),
        paddingHorizontal: normalize(7),
        color: Styles.color.white,
        fontFamily: fonts.Effra_Arbc_Regular,
    },
    albumContainer: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    containerStyle: {
        alignItems: 'center'
    }
})
