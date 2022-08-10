import { render, RenderAPI, fireEvent } from '@testing-library/react-native';
import React, { useState } from 'react';
import { VideoDetailScreen, VideoDetailScreenProps } from '../VideoDetailScreen';
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/SampleData';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PodcastProgramHeader } from 'src/components/molecules';
import {useNavigation} from '@react-navigation/native';
import { VideoInfo, VideosList } from 'src/components/organisms';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useVideoList", () => ({
  useVideoList: () => {
    return {
      isLoading: false,
      videoData: [],
      videoError: 'error',
      fetchVideoRequest: () => {
        return []
      },
    }
  },
}));

jest.mock("src/hooks/useLogin", () => ({
  useLogin: () => {
    return {
      isLoggedIn: true,
    }
  },
}));

jest.mock("src/hooks/useBookmark", () => ({
  useBookmark: () => {
    return {
      bookmarkIdInfo: [
        {
            nid: '1',
            bundle: 'string'
        },
        {
            nid: '2',
            bundle: 'string'
        }
    ],
      sendBookmarkInfo: () => [],
      removeBookmarkedInfo: () => [],
    }
  },
}));

const data: VideoDetailScreenProps = {
  route: { 
    params: {
      data: 
      [
        {
          nid: '1',
          title: 'abc'
        },
        {
          nid: '2',
          title: 'abc'
        }
      ],
      isDocumentary: true,
    }
  }
}

describe('<VideoDetailScreen >', () => {
  let instance: RenderAPI;
  const setIsSaved = jest.fn()
  const mockFunction = jest.fn()
  const selectedVideo = jest.fn()
  const setVideolistData = jest.fn()
  const setIsBookmarked = jest.fn()
  const setShowPopUp = jest.fn()
  const setVideoUrl = jest.fn()
  const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  }

  describe('when VideoDetailScreen  only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useState as jest.Mock).mockImplementation(() => [false, setIsSaved]);
      (useState as jest.Mock).mockImplementation(() => [data.route.params.data, selectedVideo]);
      (useState as jest.Mock).mockImplementation(() => [[], setVideolistData]);
      (useState as jest.Mock).mockImplementation(() => [false, setIsBookmarked]);
      (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
      (useState as jest.Mock).mockImplementation(() => ['', setVideoUrl]);
      const component = (
        <Provider store={storeSampleData}>
          <SafeAreaProvider>
            <VideoDetailScreen route={{ params: { data: data } }} />
          </SafeAreaProvider>
        </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render VideoDetailScreen ', () => {
      expect(instance).toBeDefined();
    });
    it('when onPressShare is pressed from header', () => {
      const testID = instance.container.findByType(PodcastProgramHeader);
      fireEvent(testID, 'onPressShare');
      expect(mockFunction).toBeTruthy();
    });
    it('when onGoBack is pressed from header', () => {
      const testID = instance.container.findByType(PodcastProgramHeader);
      fireEvent(testID, 'onGoBack');
      expect(navigation.goBack).toBeTruthy();
    });
    it('when onPressSave is pressed from header', () => {
      const testID = instance.container.findByType(PodcastProgramHeader);
      fireEvent(testID, 'onPressSave');
      expect(mockFunction).toBeTruthy();
    });
    it('when onPress is pressed from VideoInfo', () => {
      const testID = instance.container.findByType(VideoInfo);
      fireEvent(testID, 'onPress', {item: { nid: '2', title: 'abc', isBookmarked: true, mediaId: '2' }});
      expect(navigation.navigate).toBeTruthy();
    });
    test('Should call ScreenContainer onCloseSignUpAlert', () => {
      const element = instance.container.findByType(ScreenContainer)
      fireEvent(element, 'onCloseSignUpAlert');
      expect(mockFunction).toBeTruthy()
    });
    test('Should call VideosList onItemActionPress', () => {
      const element = instance.container.findByType(VideosList)
      fireEvent(element, 'onItemActionPress', {item: { nid: '2', title: 'abc', isBookmarked: true, mediaId: '2' }});
      expect(navigation.navigate).toBeTruthy()
    });
  });
});
