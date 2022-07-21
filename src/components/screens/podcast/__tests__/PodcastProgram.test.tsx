import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { PodcastProgram } from '../PodcastProgram';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';

describe('<PodcastProgram>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  jest.mock("src/hooks/usePodcast", () => ({
    usePodcast: () => {
      return {
        isLoading: true,
        podcastListData: [],
        podcastEpisodeData: [],
        podcastListError: '',
        podcastEpisodeError:'',
        fetchPodcastListRequest: () => {
          return []
        },
        fetchPodcastEpisodeRequest: () => {
          return []
        }
      }
    },
  }));

  describe('when PodcastProgram only', () => {
    beforeEach(() => {
      const component = (
        <Provider store={storeSampleData}>
          <PodcastProgram />
        </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    
    it('Should render PodcastProgram', () => {
      expect(instance).toBeDefined();
    });

    test('Should call FlatList onPress', () => {
      const element = instance.container.findAllByType(ScreenContainer)[0];
      fireEvent(element, 'onCloseSignUpAlert');
      expect(mockFunction).toBeTruthy()
    });
  });
});
