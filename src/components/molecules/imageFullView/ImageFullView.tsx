import React from 'react';
import { colors } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { StyleSheet, View, Modal, Dimensions, TouchableOpacity } from 'react-native';
import ImageViewer from "react-native-reanimated-image-viewer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Label } from 'src/components/atoms';
import { useOrientation } from 'src/hooks';
import { isTab } from 'src/shared/utils';

interface ImageFullViewProps {
    uri: string;
    onClose: () => void;
}

const HIT_SLOP = { top: 16, left: 16, bottom: 16, right: 16 };

export const ImageFullView = (props: ImageFullViewProps) => {
    const { uri, onClose } = props;
    const styles = useThemeAwareObject(imageFullViewStyle);
    const { isPortrait } = useOrientation();

    const renderHeaderComponent = () => {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose} hitSlop={HIT_SLOP}>
                    <Label style={styles.closeText}>✕</Label>
                </TouchableOpacity>
            </View>
        )
    }

    const getWindowWidth = () => {
        const { width } = Dimensions.get('window');
        if (!isTab) {
            return width
        }
        return isPortrait ? width : width * 0.8;
    }

    const getWindowHeight = () => {
        const { width } = Dimensions.get('window');
        const height = width * 3 / 4;
        if (!isTab) {
            return height
        }
        return isPortrait ? (width * 0.8) * 3 / 4 : height * 0.6;
    }

    return (
        <Modal supportedOrientations={["portrait", "portrait-upside-down", "landscape", "landscape-left", "landscape-right"]}>
            {renderHeaderComponent()}
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ImageViewer
                    imageUrl={uri} width={getWindowWidth()} height={getWindowHeight()} onRequestClose={onClose}
                />
            </GestureHandlerRootView>
        </Modal>
    );
};

const imageFullViewStyle = () => {
    return StyleSheet.create({
        buttonContainer: {
            position: 'absolute',
            top: 40,
            left: 20,
            backgroundColor: colors.black,
            width: 45,
            height: 45,
            borderRadius: 22.5,
            zIndex: 9999,
        },
        closeButton: {
            width: '100%',
            height: '100%',
            alignItems: "center",
            justifyContent: "center",
        },
        closeText: {
            lineHeight: 45,
            fontSize: 25,
            textAlign: "center",
            color: colors.white,
            includeFontPadding: false,
        },
    });
}
