import { useEffect, useState } from 'react';
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';
import { enableAds } from 'src/shared/utils/dimensions';

export const useInterstitial = (callback?: Function): any => {
  const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : '/5910/AsharqAlawsat_APP/ADR/Interstitial';
  const [interstitial, setInterstitial] = useState<InterstitialAd | null>();
  
  useEffect(() => {
    const ad = InterstitialAd.createForAdRequest(adUnitId);
    setInterstitial(ad);
  }, []);

  useEffect(() => {
    if (!interstitial)
      return;

    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      },
    );

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, [interstitial]);

  useEffect(() => {
    if (!interstitial)
      return;

    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        if (callback)
          callback();
      },
    );

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, [interstitial]);

  useEffect(() => {
    if (!interstitial)
      return;

    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.log('interstitial ad error', error);
      },
    );

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, [interstitial]);

  const showInterstitialAd = async () => {
    if (!interstitial || !enableAds)
      return;

    interstitial.load();
  };

  return ({
    showInterstitialAd
  });
};
