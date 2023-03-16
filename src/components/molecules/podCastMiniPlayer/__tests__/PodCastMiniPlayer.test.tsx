import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, { useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import TrackPlayer from 'react-native-track-player';
import { PodCastMiniPlayer } from '../PodCastMiniPlayer';


jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("react-native-track-player", () => ({
  TrackPlayer: jest.fn(),
  play: jest.fn(),
  Event: ['PlaybackState', 'PlaybackError', 'PlaybackQueueEnded'],
  usePlaybackState: jest.fn(),
  useProgress: jest.fn().mockReturnValue({ duration: 43 }),
  useTrackPlayerEvents: jest.fn(),
  pause: jest.fn(),
  getState: jest.fn(),
  State: ['Playing', 'Buffering']
}))

describe('<PodCastMiniPlayer>', () => {
  let instance: RenderAPI;
  const showControl = jest.fn();
  const setShowControl = jest.fn()

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [true, showControl]);
    (useState as jest.Mock).mockImplementation(() => [true, setShowControl]);
    instance = render(<PodCastMiniPlayer />);
  });

  afterEach(() => {
    instance.unmount();
  });

  it('should render `PodCastMiniPlayer`', () => {
    expect(instance).toBeDefined();
  });

  it('should press playingState onpress', () => {
    const testId = instance.getByTestId('playingState');
    fireEvent(testId, 'onPress');
    expect(TrackPlayer.getState).toHaveBeenCalled();
  })

  it('should press Miniplayer onpress', () => {
    const testId = instance.getByTestId('Miniplayer');
    fireEvent(testId, 'onPress');
    expect(setShowControl).toBeCalledWith(true);
  })

  it('when AlertModal only When onClose', () => {
    const testID = instance.container.findByType(RBSheet);
    fireEvent(testID, 'onClose');
    expect(setShowControl).toBeCalledWith(false);
});
         
});

