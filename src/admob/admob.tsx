import { useEffect } from 'react';
import mobileAds, { AdEventType, AppOpenAd, TestIds } from 'react-native-google-mobile-ads';

export const initializeAdMob = () => {
    mobileAds().initialize();
}

export const LoadAppOpenAd = () => {
    const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

    const appOpenAd = AppOpenAd.createForAdRequest(TestIds.APP_OPEN, {
        requestNonPersonalizedAdsOnly: true,
        keywords: ['fashion', 'clothing'],
    });

    useEffect(() => {
        appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
            appOpenAd.show();
        });
        appOpenAd.load();
    }, []);

    return <></>;
};
