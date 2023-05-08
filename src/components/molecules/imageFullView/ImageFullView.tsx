import React, { useEffect } from 'react';
import ImageView from 'react-native-image-viewing-rtl';
import Orientation from 'react-native-orientation-locker';
import { isTab } from 'src/shared/utils';
import { ButtonImage } from 'src/components/atoms';
import { ImagesName } from 'src/shared/styles';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { colors } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { StyleSheet, View } from 'react-native';

interface ImageProps {
    uri: string;
}
interface ImageFullView {
    listData: ImageProps[];
    visible: boolean;
    onClose: () => void;
    imageIndex?: number;
}

export const ImageFullView = (props: ImageFullView) => {
    const { visible, listData, onClose, imageIndex } = props;
    const styles = useThemeAwareObject(imageFullViewStyle);

    useEffect(() => {
        if (isTab && visible) {
            Orientation.lockToPortrait();
        }
        return (() => {
            if (isTab) {
                Orientation.unlockAllOrientations();
            }
        })
    }, [visible])

    const renderHeaderComponent = () => {
        return (
            <View style={styles.buttonContainer}>
                <ButtonImage icon={() => {
                    return getSvgImages({
                        name: ImagesName.videoCloseIcon,
                        width: 20,
                        height: 20,
                        fill: colors.white
                    })
                }}
                    onPress={onClose}
                />
            </View>
        )
    }

    return (
        <ImageView
            images={listData}
            imageIndex={imageIndex ? imageIndex : 0}
            visible={visible}
            onRequestClose={onClose}
            HeaderComponent={renderHeaderComponent}
            doubleTapToZoomEnabled={false}
        />
    );
};

const imageFullViewStyle = () => {
    return StyleSheet.create({
        buttonContainer: {
            height: 60,
            marginTop: 50,
            marginLeft: 20,
        },
    });
}
