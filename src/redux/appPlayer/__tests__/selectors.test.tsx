import {storeInfo} from 'src/constants/Constants';
import {getPlayerControl, getIsPlaying, getSelectedTrack, getControlState} from '../selectors';

describe('App Common Selector', () => {
  const storeData = storeInfo[0];

  test('Get loading state', () => {
    const showMiniPlayer: boolean = getPlayerControl(storeData);
    expect(showMiniPlayer).toEqual(false);
  });

  test('Get loading state', () => {
    const isPlaying: any = getIsPlaying(storeData);
    expect(isPlaying).toEqual(false);
  });

  test('Get loading state', () => {
    const selectedTrack: any = getSelectedTrack(storeData);
    expect(selectedTrack).toEqual(null);
  });

  test('Get loading state', () => {
    const showControl: any = getControlState(storeData);
    expect(showControl).toEqual(false);
  });
});
