import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { isTab, screenWidth } from 'src/shared/utils';
import { BannerAd, TestIds } from 'react-native-google-mobile-ads';
import { enableAds } from 'src/shared/utils/dimensions';

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
    width,
    height,
    style,
    size = AdContainerSize.DEFAULT
}) => {
    const appUnitId = __DEV__ ? TestIds.BANNER : `/5910/AsharqAlawsat_APP/ADR/${unitId}`;
    const [showAd, setShowAd] = useState<boolean>(false);
    const [adHeight, setAdHeight] = useState<number>(50);
    const [adWidth, setAdWidth] = useState<number>(300);
    
    useEffect(() => {
        if (height) {
            setAdHeight(height);
        } else if (size == AdContainerSize.DEFAULT) {
            setAdHeight(getDefaultHeight());
        } else if (size == AdContainerSize.MEDIUM) {
            setAdHeight(getMediumHeight());
        }
    }, [height]);

    function getDefaultHeight() : number {
        if (isTab) {
            return screenWidth > 727 ? 90 : 60;
        } else {
            return 50;
        }
    };

    function getMediumHeight() : number {
        if (isTab) {
            return screenWidth > 335 ? 280 : 250;
        } else {
            return screenWidth >= 250 ? 250 : 200;
        }
    }

    useEffect(() => {
        if (width) {
            setAdWidth(parseInt(width + ''));
        } else if (screenWidth) {
            setAdWidth(parseInt(screenWidth + ''));
        } else {
            setAdWidth(300);
        }
    }, [width]);

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
                size={adWidth + "x" + adHeight}
                onAdFailedToLoad={onFailedToLoad}
                onAdLoaded={onLoaded} />
        );
    }

    if (!enableAds)
        return null;
    else
        return (
            <View style={StyleSheet.flatten([style, {height: showAd ? adHeight : 0}])}>
                {renderBannerAd()}
            </View>
        );
};