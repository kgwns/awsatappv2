import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { PodcastEpisodeInfo } from '../PodcastEpisodeInfo';
import {PodcastEpisodeData} from 'src/constants/SampleData';
import { ButtonOutline } from 'src/components/atoms';

describe('<PodcastEpisodeInfo>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  describe('when PodcastEpisodeInfo only', () => {
    beforeEach(() => {
      const component = (
          <PodcastEpisodeInfo data={PodcastEpisodeData} onListenPress={mockFunction} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });

    it('Should render PodcastEpisodeInfo', () => {
      expect(instance).toBeDefined();
    });

    it('when ButtonOutline only When onPress', () => {
      const testID = instance.container.findAllByType(ButtonOutline)[0];
      fireEvent(testID, 'onPress');
      expect(mockFunction).toBeTruthy();
    });

  });
});
