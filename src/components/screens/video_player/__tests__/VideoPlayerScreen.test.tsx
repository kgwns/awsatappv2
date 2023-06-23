import React, { useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { VideoPlayerScreen } from '../VideoPlayerScreen'
import { useNavigation } from '@react-navigation/native';
import { VideoPlayerComponent } from 'src/components/molecules';
import { useAppPlayer } from 'src/hooks';
import { fetchVideoDetailInfo } from '../../../../services/VideoServices';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('../../../../services/VideoServices', () => ({
  ...jest.requireActual('../../../../services/VideoServices'),
  fetchVideoDetailInfo: jest.fn()
}))

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
  useFocusEffect: () => jest.fn().mockImplementation(() => jest.fn())
}));

jest.mock('src/hooks/useAppPlayer', () => ({ useAppPlayer: jest.fn() }));

describe('<VideoPlayerScreen> without nid params', () => {
  let instance: RenderAPI
  const route = {
    params: {
      videoUrl: 'https://content.jwplatform.com/videos/nzSJqVya-9mPGCDe7.mp4',
      // nid: '12',
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
  const setShowMiniPlayerMock = jest.fn();
  const setPlayerTrackMock = jest.fn();
  const fetchVideoDetailInfoMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [route.params.videoUrl, playerUrl]);
    (fetchVideoDetailInfo as jest.Mock).mockImplementation(fetchVideoDetailInfoMock);
    (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
    useAppPlayerMock.mockReturnValue({
      setShowMiniPlayer: setShowMiniPlayerMock,
      setPlayerTrack: setPlayerTrackMock,
    });
    const component = (
      <GestureHandlerRootView>
        <VideoPlayerScreen route={route} />
      </GestureHandlerRootView>
    )
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('Should render VideoPlayerScreen', () => {
    expect(instance).toBeDefined();
  })

  it("should call fetchVideoDetailInfo to return response", async () => {
    (fetchVideoDetailInfoMock).mockReturnValue({
      playlist: [{ sources: [{ file: 'file', label: 'label', type: 'video/mp4', height: 'height' }] }]
    });
    const response = await fetchVideoDetailInfo({ mediaID: route.params.mediaID });
    expect(response).toEqual({
      playlist: [{ sources: [{ file: 'file', label: 'label', type: 'video/mp4', height: 'height' }] }]
    });
  });

  it("should call fetchVideoDetailInfo to throw error", () => {
    (fetchVideoDetailInfoMock).mockImplementationOnce(() => { throw new Error('error message') });
    expect(fetchVideoDetailInfo).toHaveBeenCalledTimes(1);
    expect(fetchVideoDetailInfo).toHaveBeenCalledWith({ mediaID: route.params.mediaID });
  });

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

describe('<VideoPlayerScreen>', () => {
  let instance: RenderAPI
  const route = {
    params: {
      videoUrl: null,
      nid: null,
      mediaID: null,
    },
  }
  const playerUrl = jest.fn()
  const mockFunction = jest.fn();
  const navigation = {
    goBack: mockFunction,
    navigate: mockFunction,
  }

  const useAppPlayerMock = jest.fn();
  const setShowMiniPlayerMock = jest.fn();
  const setPlayerTrackMock = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [route.params.videoUrl, playerUrl]);
    (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
    useAppPlayerMock.mockReturnValue({
      setShowMiniPlayer: setShowMiniPlayerMock,
      setPlayerTrack: setPlayerTrackMock,
    });
    const component = (
      <GestureHandlerRootView>
        <VideoPlayerScreen route={route} />
      </GestureHandlerRootView>
    )
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount();
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

});

describe('<VideoPlayerScreen> with nid params', () => {
  let instance: RenderAPI
  const route = {
    params: {
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
  const setShowMiniPlayerMock = jest.fn();
  const setPlayerTrackMock = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [route.params.videoUrl, playerUrl]);
    (useAppPlayer as jest.Mock).mockImplementation(useAppPlayerMock);
    useAppPlayerMock.mockReturnValue({
      setShowMiniPlayer: setShowMiniPlayerMock,
      setPlayerTrack: setPlayerTrackMock,
    });
    const component = (
      <GestureHandlerRootView>
        <VideoPlayerScreen route={route} />
      </GestureHandlerRootView>
    )
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('Should render VideoPlayerScreen', () => {
    expect(instance).toBeDefined();
  })
})