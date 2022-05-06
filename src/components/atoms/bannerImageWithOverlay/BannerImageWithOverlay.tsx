import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ImageResize } from '../../../shared/styles/text-styles'
import { Image, Overlay } from '..'

export interface BannerImageWithOverlayProps {
    image?: string
    onImageLoadEnd?(isSuccess: boolean): void
    isImageLoaded?: boolean
    showOverlay?: boolean;
}

export const BannerImageWithOverlay = ({
    image,
    onImageLoadEnd,
    isImageLoaded,
    showOverlay,
}: BannerImageWithOverlayProps) => {
    const [isError, setIsError] = useState(false) 

    const onLoadEnd = () => {
        const isLoadedSuccess = isError ? false : true
        onImageLoadEnd && onImageLoadEnd(isLoadedSuccess)
    }

    const onError = () => {
        setIsError(true)
    }

    return (
        <View>
            <Image fallback url={image} style={bannerImageWithOverlayStyle.image}
                resizeMode={ImageResize.COVER}
                onLoadEnd={onLoadEnd}
                onError={onError}
            />
            {showOverlay && isImageLoaded && <Overlay />}
        </View>
    )
}

const bannerImageWithOverlayStyle = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%'
    },
})
