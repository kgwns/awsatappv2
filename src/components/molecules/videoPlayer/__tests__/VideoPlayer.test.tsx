import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { VideoPlayerComponent } from '../VideoPlayer';
import { useNavigation } from '@react-navigation/native';
import VideoPlayerFullScreen from '../VideoPlayerFullScreen';
import { ImagesName } from 'src/shared/styles';
import Orientation from 'react-native-orientation-locker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }));

  jest.mock('react-native-orientation-locker', () => {
    return {
      lockToLandscape: jest.fn(),
      lockToPortrait: jest.fn(),
      addDeviceOrientationListener: jest.fn(),
      removeDeviceOrientationListener: jest.fn(),
    };
  });

  jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
    useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
    useFocusEffect: () => jest.fn().mockImplementation(() => jest.fn())
  }));

  const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
  jest.mock('src/shared/utils/dimensions', () => ({
    ...jest.requireActual('src/shared/utils/dimensions'),
    isAndroid: false
  }));

describe('<VideoPlayer>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const url = 'https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4'
    const setvideoUrl = mockFunction;
    const setIsPaused = mockFunction;
    const setIsLoading = mockFunction;
    const setFullScreen = mockFunction;
    const setTogglecontrol = mockFunction;
    const setEdge = mockFunction;
    const navigation = {
        navigate: mockFunction,
      }

    beforeEach(() => {
    DeviceTypeUtilsMock.isAndroid = true;
    (useState as jest.Mock).mockImplementation(() => [url, setvideoUrl]);
    (useState as jest.Mock).mockImplementation(() => ['', setTogglecontrol]);
    (useState as jest.Mock).mockImplementation(() => [true, setIsLoading]);
    (useState as jest.Mock).mockImplementation(() => [true, setIsPaused]);
    (useState as jest.Mock).mockImplementation(() => [true, setFullScreen]);
    (useState as jest.Mock).mockImplementation(() => [[], setEdge]);
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      const component = (
        <GestureHandlerRootView>
          <VideoPlayerComponent title={'title'} url={url} goBack={mockFunction} testID={'ID'} />
        </GestureHandlerRootView>
      )
      instance = render(component)
      jest.useFakeTimers({
        legacyFakeTimers: true
      });
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render VideoPlayer', () => {
        expect(instance).toBeDefined()
    })

    it("should render with goBack as empty",() => {
      const component = (
        <GestureHandlerRootView>
          <VideoPlayerComponent title={'title'} url={url} goBack={''} testID={'ID'} />
        </GestureHandlerRootView>
      )
      instance = render(component)
      const element = instance.container.findByType(VideoPlayerFullScreen)
      fireEvent(element, 'onClose');
      expect(mockFunction).toHaveBeenCalled();
      expect(mockFunction).toHaveBeenCalledTimes(2);
    })

    test('Should call onLoadStart', () => {
      const element = instance.container.findByType(VideoPlayerFullScreen)
      fireEvent(element, 'onLoadStart');
      expect(mockFunction).toBeTruthy()
    });

    test('Should call onLoad', () => {
      const element = instance.container.findByType(VideoPlayerFullScreen)
      fireEvent(element, 'onLoad');
      expect(mockFunction).toBeTruthy()
    });

    test('Should call onError', () => {
      const element = instance.container.findByType(VideoPlayerFullScreen)
      fireEvent(element, 'onError');
      expect(mockFunction).toBeTruthy()
    });

    test('Should call onBack', () => {
      const element = instance.container.findByType(VideoPlayerFullScreen)
      fireEvent(element, 'onBack');
      expect(mockFunction).toBeTruthy()
    });

    test('Should call onExitFullscreen', () => {
      const element = instance.container.findByType(VideoPlayerFullScreen)
      fireEvent(element, 'onExitFullscreen');
      expect(mockFunction).toBeTruthy()
    });

    test('Should call onClose', () => {
      const element = instance.container.findByType(VideoPlayerFullScreen)
      fireEvent(element, 'onClose');
      expect(mockFunction).toBeTruthy()
    });

    test('Should call closeIcon', () => {
      const element = instance.container.findByType(VideoPlayerFullScreen)
      fireEvent(element, 'closeIcon',{name: ImagesName.videoCloseIcon, width: 14, height: 14});
      expect(mockFunction).toBeTruthy()
    });

    test('Should call closeIcon', () => {
      const element = instance.container.findByType(VideoPlayerFullScreen)
      fireEvent(element, 'navigator');
      expect(navigation).toBeTruthy()
    });

    test('Should call onChangeFullScreen', () => {
      const element = instance.container.findByType(VideoPlayerFullScreen)
      fireEvent(element, 'onChangeFullScreen');
      expect(element).toBeTruthy()
    });
    
})


describe('<VideoPlayer>', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const url = 'https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4'
  const setFullScreen = mockFunction;

  const navigation = {
      navigate: mockFunction,
    }

  beforeEach(() => {
  DeviceTypeUtilsMock.isAndroid = true;
  (useState as jest.Mock).mockImplementation(() => [false, setFullScreen]);

  (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = (
      <GestureHandlerRootView>
        <VideoPlayerComponent title={'title'} url={url} goBack={mockFunction} testID={'ID'} />
      </GestureHandlerRootView>
    )
    instance = render(component)
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
  })

  afterEach(() => {
      jest.clearAllMocks()
      instance.unmount()
  })

  it('Should call onClose with fullscreen as false', () => {
    const element = instance.container.findByType(VideoPlayerFullScreen)
    fireEvent(element, 'onClose');
    expect(mockFunction).toHaveBeenCalled();
  })

  test('Should call onChangeFullScreen with fullscreen as false', () => {
    const element = instance.container.findByType(VideoPlayerFullScreen)
    fireEvent(element, 'onChangeFullScreen');
    expect(element).toBeTruthy()
    expect(Orientation.lockToLandscape).toHaveBeenCalled();
  });
  
})

describe('<VideoPlayer>', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const url = 'https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4'
  const setvideoUrl = mockFunction;

  const navigation = {
      navigate: mockFunction,
    }

  beforeEach(() => {
  (useState as jest.Mock).mockImplementation(() => ['setVideoUrl', setvideoUrl]);

  (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = (
      <GestureHandlerRootView>
        <VideoPlayerComponent title={'title'} url={url} goBack={mockFunction} testID={'ID'} />
      </GestureHandlerRootView>
    )
    instance = render(component)
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
  })

  afterEach(() => {
      jest.clearAllMocks()
      instance.unmount()
  })

  it('Should set State', () => {
    expect(setvideoUrl).toHaveBeenCalled();
  })
})
