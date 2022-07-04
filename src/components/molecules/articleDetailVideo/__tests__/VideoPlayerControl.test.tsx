import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, {useState, useRef}  from 'react';
import VideoPlayerControl from '../VideoPlayerControl';
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
  const url= "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842";
  const sampleData: any = {current :
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
  ]}
  
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

    const component = <VideoPlayerControl url={url} paused={true} videoRefs={sampleData}/>;
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

});

