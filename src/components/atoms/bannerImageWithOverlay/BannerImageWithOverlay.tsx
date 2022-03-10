import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ImageResize } from '../../../shared/styles/text-styles'
import { Image, Overlay } from '..'

export interface BannerImageWithOverlayProps {
    image?: string
}

export const BannerImageWithOverlay = ({
    image
}: BannerImageWithOverlayProps) => {
    
    return (
        <View>
            <Image fallback url={image} style={bannerImageWithOverlayStyle.image}
                resizeMode={ImageResize.COVER}
            />
            <Overlay />
        </View>
    )
}

const bannerImageWithOverlayStyle = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    },
})
