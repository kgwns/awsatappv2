import { fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React, { useState } from 'react'
import  VideoPlayerControl from '../ArticleDetailVideo';
import { useAppPlayer } from 'src/hooks';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('src/hooks/useAppPlayer', () => ({useAppPlayer: jest.fn()}));

describe('<VideoPlayerControl />', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const setCurrentTime = mockFunction;
  const setDuration = mockFunction;
  const setIsFullScreen = mockFunction;
  const setPaused = mockFunction;
  const setShowControls = mockFunction;
  const setTapActionTimeout = mockFunction;

  const useAppPlayerMock = jest.fn();
  const setControlStateMock = jest.fn();
  const setShowMiniPlayerMock = jest.fn();
  const setPlayMock = jest.fn();
  const setPlayerTrackMock = jest.fn();

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [0, setCurrentTime]);
    (useState as jest.Mock).mockImplementation(() => [0, setDuration]);
    (useState as jest.Mock).mockImplementation(() => [false, setIsFullScreen]);
    (useState as jest.Mock).mockImplementation(() => [true, setPaused]);
    (useState as jest.Mock).mockImplementation(() => [false, setShowControls]);
    (useState as jest.Mock).mockImplementation(() => [2, setTapActionTimeout]);
    (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
     useAppPlayerMock.mockReturnValue({
      showMiniPlayer: false,
      isPlaying: false,
      selectedTrack: {},
      showControls: false,
      setControlState: setControlStateMock,
      setShowMiniPlayer: setShowMiniPlayerMock,
      setPlay: setPlayMock,
      setPlayerTrack: setPlayerTrackMock,
    });
    const component = <VideoPlayerControl paused={false}/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  xit('should render component', () => {
    expect(instance).toBeDefined()
  });

  xit('when playVideo is pressed', () => {
    const testID = instance.getByTestId('VideoPlayerControlId');
    fireEvent(testID, 'onPress');
    expect(mockFunction).toHaveBeenCalled();
  });

  xit('when Playpause is pressed', () => {
    const testID = instance.getByTestId('renderCloseButtonID');
    fireEvent(testID, 'onPress');
    expect(mockFunction).toHaveBeenCalled();
  });
})

