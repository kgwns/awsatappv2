import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ImageResize } from '../../../shared/styles/text-styles'
import { Image } from 'src/components/atoms/image/Image'
import {  Overlay } from 'src/components/atoms/overlay/Overlay'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { ImagesName } from 'src/shared/styles'
import { ArticleLabel } from 'src/components/molecules/articleLabel/ArticleLabel'
import { isTab } from 'src/shared/utils'

export interface BannerImageWithOverlayProps {
    image?: string
    onImageLoadEnd?(isSuccess: boolean): void
    isImageLoaded?: boolean
    showOverlay?: boolean;
    isAlbum?: boolean;
    displayType?: string;
    renderTagName?: React.JSX.Element | null;
}

export const RenderPhotoIcon = () => (
    <View style={isTab ? bannerImageWithOverlayStyle.tabPhotoIconContainer : bannerImageWithOverlayStyle.photoIconContainer} testID={'photoIconId'}>
        {getSvgImages({
            name: ImagesName.photoIcon,
            width: isTab ? 17 : 27,
            height: isTab ? 12 :22,
        })}
    </View>
);

export const BannerImageWithOverlay = ({
    image,
    onImageLoadEnd,
    isImageLoaded,
    showOverlay,
    displayType,
    isAlbum = false,
    renderTagName,
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
            {displayType && <View style={bannerImageWithOverlayStyle.liveTagContainer}>
                <ArticleLabel displayType={displayType}/>
            </View>}
            {renderTagName}
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
    },
    photoIconContainer: {
        position: 'absolute', 
        top: 15, 
        right: 15
    },
    tabPhotoIconContainer: {
        position: 'absolute', 
        top: 8, 
        right: 8
    }
})
