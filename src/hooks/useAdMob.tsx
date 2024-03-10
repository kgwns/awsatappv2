import mobileAds, { AdEventType, AppOpenAd, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import { useEffect, useState } from 'react';

export interface UseAdMobReturn {
    initializeAdMob(): void,
    loadAppOpenAd(): void,
    loadInterstitialAd(): void,
    showInterstitialAd(): void
}

export const useAdMob = (): UseAdMobReturn => {
    const [interstitial, setInterstitial] = useState<InterstitialAd>();
    
    const initializeAdMob = () => {
        mobileAds().initialize();
    };

    const loadAppOpenAd = () => {
        const adUnitId = __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';    
        const appOpenAd = AppOpenAd.createForAdRequest(adUnitId, {
            requestNonPersonalizedAdsOnly: true,
            keywords: ['fashion', 'clothing'],
        });
        console.log(appOpenAd);

        appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
            appOpenAd.show();
        });
        appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
            console.log(error);
        });
        appOpenAd.load();
    };

    const loadInterstitialAd = () => {
        console.log("loadInterstitialAd called");
        const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
        setInterstitial(InterstitialAd.createForAdRequest(adUnitId, {
            requestNonPersonalizedAdsOnly: true,
            keywords: ['fashion', 'clothing'],
        }));
    };
    
    useEffect(() => {
        console.log("interstitial", interstitial);
        if (interstitial) {
            interstitial.addAdEventListener(AdEventType.ERROR, (error) => {
                console.log('interstitial load', error);
            });
            console.log("interstitial load");
            interstitial.load();
        }
    }, [interstitial]);

    const showInterstitialAd = () => {
        console.log('show interstitial: ', interstitial);
        if (interstitial) {
            interstitial.show();
        } else {
            console.error("Interstitial Ad is not loaded, call loadInterstitialAd before");
        }
    };

    return {
        initializeAdMob,
        loadAppOpenAd,
        loadInterstitialAd,
        showInterstitialAd
    };
};
