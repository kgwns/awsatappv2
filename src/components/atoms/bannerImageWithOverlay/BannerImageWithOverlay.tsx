import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ImageResize } from '../../../shared/styles/text-styles'
import { Image, LiveBlogTag, Overlay } from '..'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { ImagesName } from 'src/shared/styles'

export interface BannerImageWithOverlayProps {
    image?: string
    onImageLoadEnd?(isSuccess: boolean): void
    isImageLoaded?: boolean
    showOverlay?: boolean;
    isLive?: boolean; 
    isAlbum: boolean;
}

export const RenderPhotoIcon = () => (
    <View style={{ position: 'absolute', top: 15, right: 15 }}>
        {getSvgImages({
            name: ImagesName.photoIcon,
            width: 27,
            height: 22,
        })}
    </View>
);

export const BannerImageWithOverlay = ({
    image,
    onImageLoadEnd,
    isImageLoaded,
    showOverlay,
    isLive = false,
    isAlbum = false,
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
            {isAlbum && <RenderPhotoIcon />}
            {isLive && <View style={bannerImageWithOverlayStyle.liveTagContainer}>
                <LiveBlogTag />
            </View>}
            {showOverlay && isImageLoaded && <Overlay />}
        </View>
    )
}

const bannerImageWithOverlayStyle = StyleSheet.create({
    image: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1.34,
    },
    liveTagContainer: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
    }
})
