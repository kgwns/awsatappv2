import { View, StyleSheet, ImageStyle, Image } from 'react-native'
import React from 'react'
import { ImageName } from '..'
import { Styles} from 'src/shared/styles';
import { ImageResize } from 'src/shared/styles/text-styles'

export interface PlaceholderImageProps {
    name?: ImageName,
    url?: string,
    imageStyle?: ImageStyle,
}

export const PlaceholderImage = ({ name, imageStyle, url
}: PlaceholderImageProps) => {
    return (
        <View style={placeholderImageStyle.placeholderImageStyle}>
            <Image  source={name ? (Styles.image[name]) : { uri: url }}  style={[placeholderImageStyle.placeholderImageStyle, imageStyle]} resizeMode={ImageResize.COVER} />
        </View>
    )
}


const placeholderImageStyle = StyleSheet.create({
  placeholderImageStyle: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
})
