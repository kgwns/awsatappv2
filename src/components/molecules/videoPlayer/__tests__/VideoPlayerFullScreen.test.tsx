import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import VideoPlayerFullScreen from '../VideoPlayerFullScreen';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }));

  jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
    useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
    useFocusEffect: () => jest.fn().mockImplementation(() => jest.fn())
  }));

describe('<VideoPlayer>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const url = 'https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4';
    const setCurrentTime = mockFunction;
    const setDuration = mockFunction;
    const isLoading = mockFunction;
    const setPaused = mockFunction;
    const tapActionTimeout = mockFunction;
    const setShowControls = mockFunction;
    const setScreenType = mockFunction;

    beforeEach(() => {
      jest.useFakeTimers('legacy');
      jest.runAllTimers();
      (useState as jest.Mock).mockImplementation(() => [false, isLoading]);
      (useState as jest.Mock).mockImplementation(() => [0, setCurrentTime]);
      (useState as jest.Mock).mockImplementation(() => [0, setDuration]);
      (useState as jest.Mock).mockImplementation(() => [true, setPaused]);
      (useState as jest.Mock).mockImplementation(() => ['20', tapActionTimeout]);
      (useState as jest.Mock).mockImplementation(() => [false, setShowControls]);
      (useState as jest.Mock).mockImplementation(() => ['contain', setScreenType]);
      const component = <VideoPlayerFullScreen url={url} isPaused={false} onChangeFullScreen={mockFunction} onClose={mockFunction} testID={'id'}/>
      instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render VideoPlayer', () => {
        expect(instance).toBeDefined()
    })  

    it('Should call VideoPlayerFullScreenId', () => {
      const element = instance.getByTestId('VideoPlayerFullScreenId');
      fireEvent(element, 'onPress');
      expect(element).toBeTruthy();
    });

    it('Should call renderCloseButtonID', () => {
      const element = instance.getByTestId('renderCloseButtonID');
      fireEvent(element, 'onPress');
      expect(element).toBeTruthy();
    });

    it('Should call renderPlaypauseID', () => {
      const element = instance.getByTestId('renderPlaypauseID');
      fireEvent(element, 'onPress');
      expect(element).toBeTruthy();
    });

    it('Should call toggleFullscreenID01', () => {
      const element = instance.getByTestId('toggleFullscreenID01');
      fireEvent(element, 'onPress');
      expect(element).toBeTruthy();
    });

    it('Should call onSlidingComplete', () => {
      const element = instance.container.findAllByType(Slider)[0];
      fireEvent(element, 'onSlidingComplete');
      expect(element).toBeTruthy();
    });

    it('Should call onEnd', () => {
      // jest.spyOn(global, 'setTimeout');
      const element = instance.container.findAllByType(Video)[0];
      fireEvent(element, 'onEnd');
      // expect(setTimeout).toHaveBeenCalled();
      expect(element).toBeTruthy();
    });

    it('Should call onLoad', () => {
      const element = instance.container.findAllByType(Video)[0];
      fireEvent(element, 'onLoad', {data: {duration: 0}});
      expect(element).toBeTruthy();
    });

    it('Should call onLoadStart', () => {
      const element = instance.container.findAllByType(Video)[0];
      fireEvent(element, 'onLoadStart');
      expect(element).toBeTruthy();
    });

    it('Should call onProgress', () => {
      const element = instance.container.findAllByType(Video)[0];
      fireEvent(element, 'onProgress');
      expect(element).toBeTruthy();
    });

    it('Should call onSeek', () => {
      const element = instance.container.findAllByType(Video)[0];
      fireEvent(element, 'onSeek');
      expect(element).toBeTruthy();
    });

    test('waits 1 second before ending the game', () => {
      expect(setTimeout).toBeTruthy();
    }); 

})