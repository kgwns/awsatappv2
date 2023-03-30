import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ImageResize } from '../../../shared/styles/text-styles';
import { Image } from 'src/components/atoms/image/Image';
import {RenderPhotoIcon} from 'src/components/atoms/bannerImageWithOverlay/BannerImageWithOverlay'
import { Grayscale } from 'react-native-color-matrix-image-filters';
import { isTab, screenWidth } from 'src/shared/utils';

export interface ArchiveImageProps {
    image?: string
    isAlbum: boolean;
}

export const ArchiveImage = ({ image, isAlbum }: ArchiveImageProps) => {

    return (
        <View style={isTab ? archiveImageStyle.imageContainerTab : archiveImageStyle.imageContainer}>
            <Grayscale>
                <Image fallback url={image} style={archiveImageStyle.image}
                    resizeMode={ImageResize.COVER}
                />
            </Grayscale>
            {isAlbum && <RenderPhotoIcon />}
        </View>
    )
}

const archiveImageStyle = StyleSheet.create({
    imageContainer: {
        width: 0.93 * screenWidth,
        marginHorizontal: '3.5%',
    },
    imageContainerTab: {
        width: '100%',
    },
    image: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1.34,
    },
})
