import React, { FunctionComponent, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { screenWidth } from 'src/shared/utils';
import { BannerAd, TestIds } from 'react-native-google-mobile-ads';

export interface AdContainerProps {
    unitId: string,
    width?: number,
    height?: number,
    style?: any
}

export const AdContainer: FunctionComponent<AdContainerProps> = ({
    unitId,
    width = screenWidth,
    height = 50,
    style
}) => {
    const appUnitId = __DEV__ ? TestIds.BANNER : `/5910/AsharqAlawsat_APP/ADR/${unitId}`;
    const [showAd, setShowAd] = useState<boolean>(false);

    const onFailedToLoad = (error: Error) => {
        console.log('failed', error);
        setShowAd(false);
    };

    const onLoaded = () => {
        setShowAd(true);
    };

    const renderBannerAd = () => {
        return (
            <BannerAd
                unitId={appUnitId}
                size={width + "x" + height}
                onAdFailedToLoad={onFailedToLoad}
                onAdLoaded={onLoaded} />
        );
    }

    return (
       <View style={StyleSheet.flatten([style, {display: showAd ? 'block' : 'none'}])}>
            {renderBannerAd()}
        </View>
    );
};