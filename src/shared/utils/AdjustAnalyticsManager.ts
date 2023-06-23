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
        const environment = __DEV__ ? AdjustConfig.EnvironmentSandbox : AdjustConfig.EnvironmentProduction
        const adjustConfig = new AdjustConfig(APP_TOKEN, environment);
        adjustConfig.setDelayStart(0);
        adjustConfig.setNeedsCost(false);
        adjustConfig.deactivateSKAdNetworkHandling();
        adjustConfig.setDeviceKnown(false);
        adjustConfig.setPreinstallTrackingEnabled(false);
        adjustConfig.setAllowIdfaReading(false)
        adjustConfig.setAllowiAdInfoReading(false)
        adjustConfig.setAllowAdServicesInfoReading(false)
        adjustConfig.setShouldLaunchDeeplink(false)

        if (Platform.OS === "android") {
            AdjustOaid.doNotReadOaid();
        }
        Adjust.create(adjustConfig);
    }


    trackEvent = (eventId: AdjustEventID) => {
        const adjustEvent = new AdjustEvent(eventId);
        Adjust.trackEvent(adjustEvent);
        Adjust.sendFirstPackages()
    }

}

export default new AdjustAnalyticsManager();
