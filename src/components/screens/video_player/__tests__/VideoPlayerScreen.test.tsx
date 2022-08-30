import React, {useState}  from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { VideoPlayerScreen } from '../VideoPlayerScreen'
import {useNavigation} from '@react-navigation/native';
import { VideoPlayerComponent } from 'src/components/molecules';
import { useAppPlayer } from 'src/hooks';

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

jest.mock('src/hooks/useAppPlayer', () => ({useAppPlayer: jest.fn()}));

describe('<VideoPlayerScreen>', () => {
    let instance: RenderAPI
    const route = {
      params:{
        videoUrl: 'https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4',
        nid: '12',
        mediaID: '12'
      },
    }
    const playerUrl = jest.fn()
    const mockFunction = jest.fn();
    const navigation = {
      goBack: mockFunction,
      navigate: mockFunction,
    }

    const useAppPlayerMock = jest.fn();
    const setControlStateMock = jest.fn();
    const setShowMiniPlayerMock = jest.fn();
    const setPlayMock = jest.fn();
    const setPlayerTrackMock = jest.fn();

    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useState as jest.Mock).mockImplementation(() => [route.params.videoUrl, playerUrl]);
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
      const component = <VideoPlayerScreen route={route} />
      instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render VideoPlayerScreen', () => {
        expect(instance).toBeDefined()
    })

    it('Should call setShowMiniPlayer', () => {
      const prop = {
        setShowMiniPlayer: jest.fn()      
      }
      expect(prop.setShowMiniPlayer).toHaveBeenCalled;
    })

    it('When Press Back Button', () => {
      const testID = instance.container.findByType(VideoPlayerComponent);
      fireEvent(testID, 'goBack')
      expect(navigation.goBack).toHaveBeenCalled();
    });
})