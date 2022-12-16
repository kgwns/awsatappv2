import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useState, useRef } from 'react';
import VideoPlayerControl from '../VideoPlayerControl';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useRef: jest.fn(),
}));

jest.mock("src/hooks/useAppPlayer", () => ({
  useAppPlayer: () => {
    return {
      showMiniPlayer: false,
      isPlaying: false,
      selectedTrack: {},
      showControls: false,
      setControlState: () => [],
      setShowMiniPlayer: () => [],
      setPlay: () => [],
      setPlayerTrack: () => [],
    }
  },
}));

describe('<VideoPlayerControl>', () => {
  let instance: RenderAPI;
  const url = "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842";
  const sampleData: any = {
    current:
      [
        {
          body: 'example',
          title: 'example',
          nid: 'example',
          isBookmarked: true,
          type: 'example',
          blockName: 'example',
          position: 'example',
        },
        {
          body: 'example',
          title: 'example',
          nid: 'example',
          isBookmarked: true,
          type: 'example',
          blockName: 'example',
          position: 'example',
        },
        {
          body: 'example',
          title: 'example',
          nid: 'example',
          isBookmarked: true,
          type: 'example',
          blockName: 'example',
          position: 'example',
        },
        {
          body: 'example',
          title: 'example',
          nid: 'example',
          isBookmarked: true,
          type: 'example',
          blockName: 'example',
          position: 'example',
        },
      ]
  }

  const mockFunction = jest.fn();
  const setCurrentTime = mockFunction;
  const setDuration = mockFunction;
  const setIsLoading = mockFunction;
  const setPaused = mockFunction;
  const setTapActionTimeout = mockFunction;
  const setShowControls = mockFunction;
  const setInitialPlay = mockFunction;
  const setScreenType = mockFunction;
  const videoPlayer = mockFunction;

  describe('<VideoPlayerControl> with miniPlayer true', () => {

    beforeEach(() => {
      (useRef as jest.Mock).mockImplementation(() => [sampleData, videoPlayer]);
      (useState as jest.Mock).mockImplementation(() => [0, setCurrentTime]);
      (useState as jest.Mock).mockImplementation(() => [0, setDuration]);
      (useState as jest.Mock).mockImplementation(() => [true, setIsLoading]);
      (useState as jest.Mock).mockImplementation(() => [true, setPaused]);
      (useState as jest.Mock).mockImplementation(() => [null, setTapActionTimeout]);
      (useState as jest.Mock).mockImplementation(() => [false, setShowControls]);
      (useState as jest.Mock).mockImplementation(() => [true, setInitialPlay]);
      (useState as jest.Mock).mockImplementation(() => ['contain', setScreenType]);

      const component =
        <VideoPlayerControl
          url={url} isMiniPlayer={true} paused={true}
          playerVisible={false} isFullScreenPlayer={false}
          isFullScreen={true} videoRefs={sampleData}
          setMiniPlayerVisible={mockFunction} setPlayerDetails={mockFunction} showReplay={true}
          onChangeFullScreen={mockFunction}
        />;
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });

    it('should render VideoPlayerControl component', () => {
      expect(instance).toBeDefined();
    });

    it('Should call VideoPlayerControlId', () => {
      const element = instance.getByTestId('VideoPlayerControlId');
      fireEvent(element, 'onPress');
      expect(element).toBeTruthy();
    });

    it('Should call renderCloseButtonID', () => {
      const element = instance.getByTestId('renderCloseButtonID');
      fireEvent(element, 'onPress');
      expect(element).toBeTruthy();
    });

    it('Should call Video onEnd', () => {
      const element = instance.container.findAllByType(Video)[0];
      fireEvent(element, 'onEnd');
      expect(element).toBeTruthy();
    });


    it('Should call Video onLoad', () => {
      const element = instance.container.findAllByType(Video)[0];
      fireEvent(element, 'onLoad', { data: { duration: 30 } });
      expect(element).toBeTruthy();
    });


    it('Should call Video onLoadStart', () => {
      const element = instance.container.findAllByType(Video)[0];
      fireEvent(element, 'onLoadStart');
      expect(element).toBeTruthy();
    });

    it('Should call Video onSeek', () => {
      const element = instance.container.findAllByType(Video)[0];
      fireEvent(element, 'onSeek');
      expect(element).toBeTruthy();
    });

    it('Should call Slider onSlidingComplete', () => {
      const element = instance.container.findAllByType(Slider)[0];
      fireEvent(element, 'onSlidingComplete', 'seek');
      expect(element).toBeTruthy();
    });
  })

  describe('<VideoPlayerControl> with fullScreenPlayer true', () => {
    beforeEach(() => {
      (useRef as jest.Mock).mockImplementation(() => [sampleData, videoPlayer]);
      (useState as jest.Mock).mockImplementation(() => [1, setCurrentTime]);
      (useState as jest.Mock).mockImplementation(() => [0, setDuration]);
      (useState as jest.Mock).mockImplementation(() => [true, setIsLoading]);
      (useState as jest.Mock).mockImplementation(() => [false, setPaused]);
      (useState as jest.Mock).mockImplementation(() => [null, setTapActionTimeout]);
      (useState as jest.Mock).mockImplementation(() => [true, setShowControls]);
      (useState as jest.Mock).mockImplementation(() => [true, setInitialPlay]);
      (useState as jest.Mock).mockImplementation(() => ['contain', setScreenType]);
      jest.mock('src/shared/utils/', () => ({
        isIOS: false,
      }))

      const component =
        <VideoPlayerControl
          url={url} isMiniPlayer={false} paused={false}
          playerVisible={false} isFullScreenPlayer={true}
          isFullScreen={true} videoRefs={sampleData} showReplay={true}
          setMiniPlayerVisible={mockFunction} setPlayerDetails={mockFunction}
          onChangeFullScreen={mockFunction}
        />;
      instance = render(component);
    });

    it('should render VideoPlayerControl component with isFullScreenPlayer true', () => {
      expect(instance).toBeDefined();
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
  })

  describe('<VideoPlayerControl> default Player', () => {
    beforeEach(() => {
      (useRef as jest.Mock).mockImplementation(() => [sampleData, videoPlayer]);
      (useState as jest.Mock).mockImplementation(() => [1, setCurrentTime]);
      (useState as jest.Mock).mockImplementation(() => [0, setDuration]);
      (useState as jest.Mock).mockImplementation(() => [true, setIsLoading]);
      (useState as jest.Mock).mockImplementation(() => [false, setPaused]);
      (useState as jest.Mock).mockImplementation(() => [null, setTapActionTimeout]);
      (useState as jest.Mock).mockImplementation(() => [true, setShowControls]);
      (useState as jest.Mock).mockImplementation(() => [true, setInitialPlay]);
      (useState as jest.Mock).mockImplementation(() => ['contain', setScreenType]);
      (useState as jest.Mock).mockImplementation(() => [false, mockFunction]);

      const component =
        <VideoPlayerControl
          url={url} paused={false}
          playerVisible={false} videoRefs={sampleData}
          setMiniPlayerVisible={mockFunction} setPlayerDetails={mockFunction} showReplay={true}
          onChangeFullScreen={mockFunction}
        />;
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });

    it('should render VideoPlayerControl component with isFullScreenPlayer true', () => {
      expect(instance).toBeDefined();
    });
  })

});

