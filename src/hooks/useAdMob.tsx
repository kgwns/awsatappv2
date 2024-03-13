import mobileAds, { AdEventType, AppOpenAd, BannerAd, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import { useEffect, useState } from 'react';
import { screenWidth } from 'src/shared/utils';

export const ARTICLE_CATEGORY_FIRST_INDEX = 3;
export const ARTICLE_CATEGORY_SECOND_INDEX = 8;
export const ARTICLE_CATEGORY_THIRD_INDEX = 12;

export const MY_NEWS_FIRST_INDEX = 2;
export const MY_NEWS_SECOND_INDEX = 5;

export const MOST_READ_FIRST_INDEX = 3;

export const FAVORITE_FIRST_INDEX = 3;

export const standardBanner = (width?: number, height?: number) => {
    width = width ? width : screenWidth;
    height = height ? height : 50;

    return (
        <BannerAd                
              unitId={TestIds.BANNER}
              size={width + "x" + height}
          />
    );
};

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
