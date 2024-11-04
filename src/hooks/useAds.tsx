import mobileAds, { AdEventType, AppOpenAd, TestIds } from 'react-native-google-mobile-ads';
import { isTab } from 'src/shared/utils';
import { enableAds } from 'src/shared/utils/dimensions';

export const ARTICLE_CATEGORY_FIRST_INDEX = isTab ? 4 : 3;
export const ARTICLE_CATEGORY_SECOND_INDEX = 8;
export const ARTICLE_CATEGORY_THIRD_INDEX = 12;

export const VIDEO_FIRST_INDEX = 3;
export const VIDEO_SECOND_INDEX = isTab ? 9 : 8;
export const VIDEO_THIRD_INDEX = 12;

export const MY_NEWS_FIRST_INDEX = 2;
export const MY_NEWS_SECOND_INDEX = 5;

export const MOST_READ_FIRST_INDEX = 3;

export const FAVORITE_FIRST_INDEX = 3;

export const HOME_UNIT_ID = 'Home';
export const MOST_READ_UNIT_ID = 'News';
export const ARCHIVES_UNIT_ID = 'Archives';
export const NEWS_UNIT_ID = 'Most_Read';
export const OPINION_UNIT_ID = 'Opinion';
export const VIDEOS_UNIT_ID = 'Videos';
export const PHOTO_UNIT_ID = 'Photo';
export const NEWSPAPER_UNIT_ID = 'Newspaper';

export interface UseAdMobReturn {
    initializeAdMob(): void,
    loadAppOpenAd(): void
}

export const useAds = (): UseAdMobReturn => {
    const initializeAds = () => {
        if (enableAds)
            mobileAds().initialize();
    };

    const loadAppOpenAd = () => {
        if (!enableAds)
            return;

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
        initializeAdMob: initializeAds,
        loadAppOpenAd
    };
};

export const isArticleCategoryIndex = (index: number) => {
    return index === (ARTICLE_CATEGORY_FIRST_INDEX - 1) || index === (ARTICLE_CATEGORY_SECOND_INDEX - 1) || index === (ARTICLE_CATEGORY_THIRD_INDEX - 1);
};

export const isVideoAdIndex = (index: number) => {
    return index === (VIDEO_FIRST_INDEX - 1) || index === (VIDEO_SECOND_INDEX - 1) || index === (VIDEO_THIRD_INDEX - 1);
};

export const getCategoryUnitIdBySectionKey = (sectionId: string) => {
    switch(sectionId) {
        case '97120':
            return 'Middle_East';
        case '871':
            return 'World';
        case '18':
            return 'Economy';
        case '29':
            return 'Culture_Arts';
        case '34':
            return 'Health_Science';
        case '24':
            return 'Technology';
        case '66':
            return 'East_Diary';
        case '36':
            return 'Sports';
        case '38':
            return 'In_Depth';
        default:
            return 'Home'
    }
};