import { render, RenderAPI, fireEvent } from '@testing-library/react-native';
import React, { useState } from 'react';
import { VideoDetailScreen, VideoDetailScreenProps } from '../VideoDetailScreen';
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/Constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PodcastProgramHeader } from 'src/components/molecules';
import {useNavigation} from '@react-navigation/native';
import { VideoInfo, VideosList } from 'src/components/organisms';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { VideoItemType } from 'src/redux/videoList/types';
import Share from 'react-native-share';
import { getVideoDetail } from 'src/services/videoDetailService';
import { useLogin } from 'src/hooks';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('src/services/videoDetailService',() => ({
  ...jest.requireActual('src/services/videoDetailService'),
  getVideoDetail:jest.fn()
}))

jest.mock("src/hooks/useAppPlayer", () => ({
  useAppPlayer: () => {
    return {
      showMiniPlayer: true,
      selectedTrack: {
        id: 1,
        artwork: 'abc.com'
      },
    }
  },
}));

const sampleData: VideoItemType[] = [
  {
    nid: '1',
    title: '123',
    isBookmarked: true,
    mediaId: '11',
    field_video_media_id_export:'field_video_media_id_export'
  },
  {
    nid: '2',
    title: '124',
    isBookmarked: true,
    mediaId: '12',
    field_video_media_id_export:'field_video_media_id_export'
  },
  {
    nid: '3',
    title: '124',
    isBookmarked: true,
    mediaId: '13',
    field_video_media_id_export:'field_video_media_id_export'
  },
  {
    nid: '1',
    title: '123',
    isBookmarked: true,
    field_video_media_id_export:'field_video_media_id_export'
  },
];

jest.mock("src/hooks/useVideoList", () => ({
  useVideoList: () => {
    return {
      isLoading: false,
      videoData: [{nid:'12'}],
      videoError: 'error',
      fetchVideoRequest: () => {
        return []
      },
    }
  },
}));

jest.mock("src/hooks/useLogin", () => ({
  useLogin: jest.fn()
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
      validateBookmark: () => true,
    }
  },
}));

const data: VideoDetailScreenProps = {
  route: { 
    params: {
      data: sampleData,
      isDocumentary: true,
    }
  }
}

describe('<VideoDetailScreen >', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const videolistData = mockFunction
  const selectedVideo = mockFunction
  const isBookmarked = mockFunction
  const showupUp = mockFunction
  const videoUrl = mockFunction
  const getVideoDetailMock = mockFunction
  const detailData = mockFunction
  const navigation = {
    navigate: mockFunction,
    goBack: mockFunction,
  }

  describe('when VideoDetailScreen  only', () => {
    beforeEach(() => {
      jest.useFakeTimers({
        legacyFakeTimers: true
      });
      (getVideoDetail as jest.Mock).mockImplementation(getVideoDetailMock);
      getVideoDetailMock.mockReturnValue([{response:true}]);
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useState as jest.Mock).mockImplementation(() => [{nid:'2',mediaId:sampleData[0].mediaId}, selectedVideo]);
      (useState as jest.Mock).mockImplementation(() => [[{nid:'2',title:'title',field_shorturl_export:'field_shorturl_export',view_node:'view_node'}],detailData]);
      (useState as jest.Mock).mockImplementation(() => [sampleData, videolistData]);
      (useState as jest.Mock).mockImplementation(() => [false, isBookmarked]);
      (useState as jest.Mock).mockImplementation(() => [false, showupUp]);
      (useState as jest.Mock).mockImplementation(() => ['abc.com', videoUrl]);
      (useLogin as jest.Mock).mockReturnValue({
        isLoggedIn: true,
    });
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
    it('when onPressShare is pressed from header and return response', () => {
      jest.spyOn(Share,'open').mockResolvedValue({response:true} as any);
      const testID = instance.container.findByType(PodcastProgramHeader);
      fireEvent(testID, 'onPressShare');
      expect(mockFunction).toBeTruthy();
    });
    it('when onPressShare is pressed from header,and throw error', () => {
      jest.spyOn(Share,'open').mockRejectedValue({error:'error'});
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
      fireEvent(testID, 'onPress', sampleData[0]);
      expect(navigation.navigate).toBeTruthy();
    });
    test('Should call ScreenContainer onCloseSignUpAlert', () => {
      const element = instance.container.findByType(ScreenContainer)
      fireEvent(element, 'onCloseSignUpAlert');
      expect(mockFunction).toBeTruthy()
    });
    test('Should call VideosList onItemActionPress', () => {
      const element = instance.container.findByType(VideosList)
      fireEvent(element, 'onItemActionPress', sampleData[0]);
      expect(navigation.navigate).toBeTruthy()
    });

    test('Should call VideosList onItemActionPress', () => {
      const element = instance.container.findByType(VideosList)
      fireEvent(element, 'onItemActionPress', sampleData[3]);
      expect(navigation.navigate).toBeTruthy()
    });

    test("should getVideoDetail return response",async() =>{
      const response = await getVideoDetail({nid:'2'});
      expect(response).toBeDefined();
    })
  });
  describe('when VideoDetailScreen  only', () => {
    beforeEach(() => {
      jest.useFakeTimers({
        legacyFakeTimers: true
      });
      (getVideoDetail as jest.Mock).mockImplementation(getVideoDetailMock);
      getVideoDetailMock.mockReturnValue([{response:true}]);
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useLogin as jest.Mock).mockReturnValue({
        isLoggedIn: false,
    });
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
    it('when onPressSave is pressed from header', () => {
      const testID = instance.container.findByType(PodcastProgramHeader);
      fireEvent(testID, 'onPressSave');
      expect(mockFunction).toBeTruthy();
    });
  });
});
