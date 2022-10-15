import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ImageResize } from '../../../shared/styles/text-styles';
import { Image } from '..';
import { Grayscale } from 'react-native-color-matrix-image-filters';
import { screenWidth } from 'src/shared/utils';

export interface ArchiveImageProps {
    image?: string
}

export const ArchiveImage = ({ image }: ArchiveImageProps) => {

    return (
        <View style={archiveImageStyle.imageContainer}>
            <Grayscale>
                <Image fallback url={image} style={archiveImageStyle.image}
                    resizeMode={ImageResize.COVER}
                />
            </Grayscale>
        </View>
    )
}

const archiveImageStyle = StyleSheet.create({
    imageContainer: {
        width: screenWidth,
        marginHorizontal: '3.5%',
    },
    image: {
        width: '93%',
        height: 'auto',
        aspectRatio: 1.34,
    },
})
