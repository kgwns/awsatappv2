import { useState } from 'react';
import { useDeviceOrientationChange } from 'react-native-orientation-locker';

export const useOrientation = () => {
    const [orientation, setOrientation] = useState('PORTRAIT');

    useDeviceOrientationChange((deviceOrientation) => {
        setOrientation(deviceOrientation);
    });

    return {
        orientation,
        isPortrait: (orientation === 'PORTRAIT' || orientation === 'PORTRAIT-UPSIDEDOWN'),
        isLandscape: (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT')
    };
}