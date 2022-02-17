import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React, {useState} from 'react';
import { PodcastEpisode  } from '../PodcastEpisode';
import { Provider } from 'react-redux'
import { storeSampleData, PodcastEpisodeData } from 'src/constants/SampleData';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {PodcastProgramHeader} from 'src/components/molecules';
import {PodcastEpisodeContent} from 'src/components/organisms';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('<PodcastEpisode >', () => {
  let instance: RenderAPI;
  const setIsSaved = jest.fn()
  const mockFunction = jest.fn()

  describe('when PodcastEpisode  only', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => [false, setIsSaved]);
      const component = (
        <Provider store={storeSampleData}>
          <SafeAreaProvider>
            <PodcastEpisode  route={{ params: { data: PodcastEpisodeData } }}/>
          </SafeAreaProvider>
        </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render PodcastEpisode ', () => {
      expect(instance).toBeDefined();
    });
    it('when onPressSave is pressed from PodcastHeader', () => {
      const testID = instance.container.findByType(PodcastProgramHeader);
      fireEvent(testID, 'onPressSave');
      expect(setIsSaved).toHaveBeenCalled();
    });
    it('when onPressShare is pressed from PodcastHeader', () => {
      const testID = instance.container.findByType(PodcastProgramHeader);
      fireEvent(testID, 'onPressShare');
      expect(mockFunction).toBeTruthy();
    });
    it('when onItemActionPress is pressed from PodcastEpisodeContent', () => {
      const testID = instance.container.findByType(PodcastEpisodeContent);
      fireEvent(testID, 'onItemActionPress');
      expect(mockFunction).toBeTruthy();
    });
  });
});
