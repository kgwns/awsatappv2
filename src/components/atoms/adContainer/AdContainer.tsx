import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { screenWidth } from 'src/shared/utils';
import { BannerAd, TestIds } from 'react-native-google-mobile-ads';

export enum AdContainerSize {
    DEFAULT,
    MEDIUM
}

export interface AdContainerProps {
    unitId: string,
    contentUrl?: string,
    width?: number,
    height?: number,
    style?: any,
    size?: AdContainerSize
}

export const AdContainer: FunctionComponent<AdContainerProps> = ({
    unitId,
    contentUrl,
    width = screenWidth,
    height,
    style,
    size = AdContainerSize.DEFAULT
}) => {
    const appUnitId = __DEV__ ? TestIds.BANNER : `/5910/AsharqAlawsat_APP/ADR/${unitId}`;
    const [showAd, setShowAd] = useState<boolean>(false);
    const [adHeight, setAdHeight] = useState<number>(50);
    
    useEffect(() => {
        if (height) {
            setAdHeight(height);
        } else if (size == AdContainerSize.DEFAULT) {
            setAdHeight(50);
        } else if (size == AdContainerSize.MEDIUM) {
            setAdHeight(250);
        }
    }, [height]);

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
                requestOptions={{contentUrl: contentUrl}}
                size={width + "x" + adHeight}
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