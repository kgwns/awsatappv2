import { View, StyleSheet, ImageStyle, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Image } from '../image/Image'
import { normalize, screenWidth } from 'src/shared/utils'
import { ImageName, Label, LabelTypeProp } from '..'
import { Styles } from 'src/shared/styles'
import { ImageResize } from 'src/shared/styles/text-styles'

export interface ImageLabelProps {
    name?: ImageName,
    url?: string,
    tagName?: string,
    style?: string,
    tagStyle?: object,
    tagLabelType?: LabelTypeProp,
    imageStyle?: ImageStyle,
    onPress?: () => void
}

export const ImageWithLabel = ({ name, url, tagName,tagStyle,
    tagLabelType = LabelTypeProp.caption3,
    imageStyle,
    onPress
}: ImageLabelProps) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <>
                <Image name={name} url={url} style={[imageWithLabelStyle.articleImage, imageStyle]} resizeMode={ImageResize.COVER} />
                {tagName &&
                    <View style={StyleSheet.flatten([imageWithLabelStyle.tagContainer, tagStyle])}>
                        <Label children={tagName}
                            style={imageWithLabelStyle.tagText}
                            labelType={tagLabelType}
                        />
                    </View>
                }
            </>
        </TouchableWithoutFeedback>
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
        color: Styles.color.white
    }
})
