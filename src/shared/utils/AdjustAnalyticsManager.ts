import {
    Platform,
} from 'react-native';
import {
    Adjust,
    AdjustEvent,
    AdjustConfig
} from 'react-native-adjust';
import { AdjustOaid } from 'react-native-adjust-oaid';

const APP_TOKEN = 'wjk37iqv3wu8'

export enum AdjustEventID {
    AWSATT_TEST_EVENT = '1hiqw9',
    BOOK_MARK_ARTICLE = 'ubovyr',
    COMPLETED_ONBOARDING = '8h4mp7',
    LOGIN = 'f9an14',
    REGISTRATION = '2f03tq',
    SEARCH = '7rwta9',
    SHARE_ARTICLE = 'j3pqd2'
}


class AdjustAnalyticsManager {
    constructor() {
        Adjust.getSdkVersion((sdkVersion) => {
            console.log("Adjust SDK version: " + sdkVersion);
        });

        const environment = __DEV__ ? AdjustConfig.EnvironmentSandbox : AdjustConfig.EnvironmentProduction
        const adjustConfig = new AdjustConfig(APP_TOKEN, environment);
        adjustConfig.setLogLevel(AdjustConfig.LogLevelVerbose);
        adjustConfig.setDelayStart(0);
        adjustConfig.setNeedsCost(true);

        // adjustConfig.setAttributionCallbackListener(function (attribution) {
        //     console.log("Attribution callback received :::::::::",attribution);
        // });

        // adjustConfig.setEventTrackingSucceededCallbackListener(function (eventSuccess) {
        //     console.log("Event tracking succeeded callback received :::::::",eventSuccess);
        // });

        // adjustConfig.setEventTrackingFailedCallbackListener(function (eventFailed) {
        //     console.log("Event tracking failed callback received :::::",eventFailed);
        // });

        // adjustConfig.setSessionTrackingSucceededCallbackListener(function (sessionSuccess) {
        //     console.log("Session tracking succeeded callback received :::::::",sessionSuccess);
        // });

        // adjustConfig.setSessionTrackingFailedCallbackListener(function (sessionFailed) {
        //     console.log("Session tracking failed callback received :::::::",sessionFailed);
        // });

        // Adjust.requestTrackingAuthorizationWithCompletionHandler(function (status) {
        //     console.log("Authorization status update");
        //     switch (status) {
        //         case 0:
        //             // ATTrackingManagerAuthorizationStatusNotDetermined case
        //             console.log("Authorization status: ATTrackingManagerAuthorizationStatusNotDetermined");
        //             break;
        //         case 1:
        //             // ATTrackingManagerAuthorizationStatusRestricted case
        //             console.log("Authorization status: ATTrackingManagerAuthorizationStatusRestricted");
        //             break;
        //         case 2:
        //             // ATTrackingManagerAuthorizationStatusDenied case
        //             console.log("Authorization status: ATTrackingManagerAuthorizationStatusDenied");
        //             break;
        //         case 3:
        //             // ATTrackingManagerAuthorizationStatusAuthorized case
        //             console.log("Authorization status: ATTrackingManagerAuthorizationStatusAuthorized");
        //             break;
        //     }
        // });

        if (Platform.OS === "android") {
            AdjustOaid.readOaid();
        }
        Adjust.create(adjustConfig);
    }


    trackEvent = (eventId: AdjustEventID) => {
        var adjustEvent = new AdjustEvent(eventId);
        Adjust.trackEvent(adjustEvent);
        Adjust.updateConversionValue(6);
        Adjust.getAppTrackingAuthorizationStatus(function (status) {
            console.log("Authorization status = " + status);
        });
    }

    _onPress_getIds() {
        Adjust.getAdid((adid) => {
            console.log("Adid = " + adid);
        });

        Adjust.getIdfa((idfa) => {
            console.log("IDFA = " + idfa);
        });

        Adjust.getGoogleAdId((googleAdId) => {
            console.log("Google Ad Id = " + googleAdId);
        });

        Adjust.getAmazonAdId((amazonAdId) => {
            console.log("Amazon Ad Id = " + amazonAdId);
        });

        Adjust.getAttribution((attribution) => {
            console.log("Attribution ::::::::",attribution);
        });
    }
};

export default new AdjustAnalyticsManager()