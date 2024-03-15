import mobileAds, { AdEventType, AppOpenAd, TestIds } from 'react-native-google-mobile-ads';

export const ARTICLE_CATEGORY_FIRST_INDEX = 3;
export const ARTICLE_CATEGORY_SECOND_INDEX = 8;
export const ARTICLE_CATEGORY_THIRD_INDEX = 12;

export const MY_NEWS_FIRST_INDEX = 2;
export const MY_NEWS_SECOND_INDEX = 5;

export const MOST_READ_FIRST_INDEX = 3;

export const FAVORITE_FIRST_INDEX = 3;

export const HOME_UNIT_ID = 'Most_Read';
export const MOST_READ_UNIT_ID = 'News';
export const ARCHIVES_UNIT_ID = 'Archives';
export const NEWS_UNIT_ID = 'Most_Read';
export const ARTICLE_UNIT_ID = 'Buddhist';

export interface UseAdMobReturn {
    initializeAdMob(): void,
    loadAppOpenAd(): void
}

export const useAdMob = (): UseAdMobReturn => {
    const initializeAdMob = () => {
        mobileAds().initialize();
    };

    const loadAppOpenAd = () => {
        const adUnitId = __DEV__ ? TestIds.APP_OPEN : '/5910/AsharqAlawsat_APP/ADR/App-Open';
        const appOpenAd = AppOpenAd.createForAdRequest(adUnitId);

        appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
            appOpenAd.show();
        });
        appOpenAd.addAdEventListener(AdEventType.ERROR, (error) => {
            console.log('App open ad error:', error);
        });
        appOpenAd.load();
    };

    return {
        initializeAdMob,
        loadAppOpenAd
    };
};
