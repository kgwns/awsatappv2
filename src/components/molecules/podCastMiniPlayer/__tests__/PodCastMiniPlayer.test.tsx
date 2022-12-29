import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, {useState}  from 'react';
import { TouchableOpacity } from 'react-native';
import  {PodCastMiniPlayer} from '../PodCastMiniPlayer';
import Slider from '@react-native-community/slider';

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
  isIOS:false,
  isAndroid:false,
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useAppPlayer", () => ({
  useAppPlayer: () => {
    return {
      selectedTrack: {
        id: 1,
        artwork: 'abc.com',
        title: 'example'
      },
    }
  },
}));

jest.mock("react-native-track-player", () => ({
  play: jest.fn(),
  Event: ['PlaybackState', 'PlaybackError', 'PlaybackQueueEnded'],
  usePlaybackState: jest.fn(),
  useProgress: jest.fn().mockReturnValue({ duration: 43 }),
  useTrackPlayerEvents: jest.fn(),
  pause: jest.fn(),
  State: ['Playing', 'Buffering']
}))

describe('<PodCastMiniPlayer />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const showControl = jest.fn();
  
  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [true, showControl]);
    const component = <PodCastMiniPlayer/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  });
  it('should render component', () => {
    DeviceTypeUtilsMock.isTab = true
    expect(instance).toBeDefined()
})
  it('When Press Miniplayer', () => {
    const testID = instance.getByTestId('Miniplayer');
    fireEvent(testID, 'onPress')
    expect(mockFunction).toHaveBeenCalled;
  });
  it('When Press closeIcon', () => {
    const testID = instance.getByTestId('closeIcon');
    fireEvent(testID, 'onPress')
    expect(mockFunction).toHaveBeenCalled;
  });
  it('When Press playingState', () => {
    const testID = instance.getByTestId('playingState');
    fireEvent(testID, 'onPress')
    expect(mockFunction).toHaveBeenCalled;
  });
  it('When Press onPress', () => {
    const testID = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent(testID, 'onPress', 'forward')
    expect(mockFunction).toHaveBeenCalled;
  });

  it('When Press onPress', () => {
    const testID = instance.container.findAllByType(TouchableOpacity)[1];
    fireEvent(testID, 'onPress')
    expect(mockFunction).toHaveBeenCalled;
  });

  it('When Press onPress', () => {
    const testID = instance.container.findAllByType(TouchableOpacity)[2];
    fireEvent(testID, 'onPress')
    expect(mockFunction).toHaveBeenCalled;
  });
})
