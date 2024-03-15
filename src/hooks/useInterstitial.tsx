import { useEffect } from 'react';
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';

export const useInterstitial = (): any => {
  const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : '/5910/AsharqAlawsat_APP/ADR/Interstitial';
  const interstitial = InterstitialAd.createForAdRequest(adUnitId);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        console.log('Loaded');
        interstitial.show();
      },
    );

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log('closed');
      },
    );

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  const showInterstitialAd = async () => {
    interstitial.load();
  };

  return ({
    showInterstitialAd
  });
};
