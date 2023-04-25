import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export type UseOrientationReturn = {
  isPortrait: boolean;
  isLandscape: boolean
}

export const useOrientation = (): UseOrientationReturn => {
  
  const PORTRAIT = 'PORTRAIT';
  const LANDSCAPE = 'LANDSCAPE';

  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  };

  const [currentOrientation, setOrientation] = useState<'PORTRAIT' | 'LANDSCAPE'>(
    isPortrait() ? PORTRAIT : LANDSCAPE,
  );

  const isFocused = useIsFocused();
  useEffect(() => {
    setOrientation(isPortrait() ? PORTRAIT : LANDSCAPE)
  }, [isFocused])

  useEffect(() => {
    const callback = () => {
      setOrientation(isPortrait() ? PORTRAIT : LANDSCAPE)
    };
    const subscription =  Dimensions.addEventListener('change', callback);
    return () => subscription?.remove();
  }, []);

  return {
    isPortrait: currentOrientation === PORTRAIT,
    isLandscape: currentOrientation === LANDSCAPE
  };
}
