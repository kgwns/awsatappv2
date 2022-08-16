import { View, StyleSheet, ImageStyle } from 'react-native'
import React from 'react'
import { Image } from '../image/Image'
import { isNotEmpty, isTab, normalize, screenWidth } from 'src/shared/utils'
import { ImageName, Label, LabelTypeProp } from '..'
import { ImagesName, Styles } from 'src/shared/styles'
import { ImageResize } from 'src/shared/styles/text-styles'
import { LabelType } from '../label/Label'
import { fonts } from 'src/shared/styles/fonts'
import FixedTouchable from 'src/shared/utils/FixedTouchable'
import { getSvgImages } from 'src/shared/styles/svgImages'

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
}

export const ImageWithLabel = ({ name, url, tagName,tagStyle,
    tagLabelType = LabelTypeProp.caption3,
    imageStyle,
    onPressImage,
    isAlbum = false
}: ImageLabelProps) => {

    const renderPhotoIcon = () => {
        return getSvgImages({
            name: ImagesName.photoIcon,
            width: 27,
            height: 22,
          });
    }

    return (
        <FixedTouchable onPress={onPressImage}>
            <View style={{alignItems: 'center'}}>
                <Image fallback name={name} url={url}
                    style={[imageWithLabelStyle.articleImage, imageStyle]}
                    resizeMode={ImageResize.COVER}
                />
                {isNotEmpty(tagName) &&
                    <View style={StyleSheet.flatten([imageWithLabelStyle.tagContainer, tagStyle])}>
                        <Label children={tagName}
                            style={imageWithLabelStyle.tagText}
                            labelType={tagLabelType}
                        />
                    </View>
                }
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
        width: screenWidth,
        height: 0.52 * screenWidth
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
    }
})
