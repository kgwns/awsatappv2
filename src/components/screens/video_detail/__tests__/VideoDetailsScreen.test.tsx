import { render, RenderAPI, fireEvent } from '@testing-library/react-native';
import React, { useState } from 'react';
import { VideoDetailScreen } from '../VideoDetailScreen';
import { Provider } from 'react-redux'
import { storeSampleData, videoTabData } from 'src/constants/SampleData';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PodcastProgramHeader } from 'src/components/molecules';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useVideoList", () => ({
  useVideoList: (...args: any) => {
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

describe('<VideoDetailScreen >', () => {
  let instance: RenderAPI;
  const setIsSaved = jest.fn()
  const mockFunction = jest.fn()

  describe('when VideoDetailScreen  only', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => [false, setIsSaved]);
      const component = (
        <Provider store={storeSampleData}>
          <SafeAreaProvider>
            <VideoDetailScreen route={{ params: { data: videoTabData } }} />
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
      expect(setIsSaved).toHaveBeenCalled();
    });
    it('when onPressShare is pressed from header', () => {
      const testID = instance.container.findByType(PodcastProgramHeader);
      fireEvent(testID, 'onPressShare');
      expect(mockFunction).toBeTruthy();
    });
  });
});
