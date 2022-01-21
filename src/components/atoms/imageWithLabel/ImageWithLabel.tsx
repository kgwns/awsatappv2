import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { Image } from '../image/Image'
import { normalize, screenWidth } from '../../../shared/utils'
import { ImageName } from '..'
import { Styles } from '../../../shared/styles'
import { ImageResize } from '../../../shared/styles/text-styles'

export interface ImageLabelProps {
    name?: ImageName,
    url?: string,
    tagName?: string,
    style?: string
}

export const ImageWithLabel = ({ name, url, tagName }: ImageLabelProps) => {
    return (
        <View>
            <Image name={name} url={url} style={imageWithLabelStyle.articleImage} resizeMode={ImageResize.COVER}/>
            {tagName &&
                <View style={imageWithLabelStyle.tagContainer}>
                    <Text children={tagName}
                        style={{ ...Styles.text.caption3, ...imageWithLabelStyle.tagText }}
                    />
                </View>
            }
        </View>
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
        backgroundColor: Styles.color.forestGreen,
        flexWrap: 'wrap',
    },
    tagText: {
        paddingVertical: normalize(3),
        paddingHorizontal: normalize(7)
    }
})
