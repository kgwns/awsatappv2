import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { PodcastEpisodeContent } from '../PodcastEpisodeContent';
import {PodcastEpisodeData} from 'src/constants/Constants'
import { PodcastVerticalList } from 'src/components/molecules';
import { FlatList } from 'react-native';

describe('<PodcastEpisodeContent>', () => {
  let instance: RenderAPI;
  const mockFunction= jest.fn();
  describe('when PodcastEpisodeContent only', () => {
    beforeEach(() => {
      const component = (
          <PodcastEpisodeContent data={PodcastEpisodeData} onItemActionPress={mockFunction} onPressBookmark={mockFunction} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    
    it('Should render PodcastEpisodeContent', () => {
      expect(instance).toBeDefined();
    });

    it('when PodcastVerticalList only When itemOnPress', () => {
      const testID = instance.container.findAllByType(PodcastVerticalList)[0];
      fireEvent(testID, 'itemOnPress');
      expect(mockFunction).toBeTruthy();
    });

    it('when PodcastVerticalList only When onPressBookmark', () => {
      const testID = instance.container.findAllByType(PodcastVerticalList)[0];
      fireEvent(testID, 'onPressBookmark');
      expect(mockFunction).toBeTruthy();
    });

    it('when PodcastVerticalList only When onPressBookmark', () => {
      const testID = instance.container.findAllByType(FlatList)[0];
      fireEvent(testID, 'ItemSeparatorComponent');
      expect(mockFunction).toBeTruthy();
    });
  });
});

describe('<PodcastEpisodeContent>', () => {
  let instance: RenderAPI;
  const mockFunction= jest.fn();
  describe('when PodcastEpisodeContent only', () => {
    beforeEach(() => {
      const component = (
          <PodcastEpisodeContent data={PodcastEpisodeData} onPressBookmark={mockFunction} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    
    it('Should render PodcastEpisodeContent', () => {
      expect(instance).toBeDefined();
    });

    it('when PodcastVerticalList only When itemOnPress', () => {
      const testID = instance.container.findAllByType(PodcastVerticalList)[0];
      fireEvent(testID, 'itemOnPress');
      expect(mockFunction).toBeTruthy();
    });

    it('when PodcastVerticalList only When onPressBookmark', () => {
      const testID = instance.container.findAllByType(PodcastVerticalList)[0];
      fireEvent(testID, 'onPressBookmark');
      expect(mockFunction).toBeTruthy();
    });

    it('when PodcastVerticalList only When onPressBookmark', () => {
      const testID = instance.container.findAllByType(FlatList)[0];
      fireEvent(testID, 'ItemSeparatorComponent');
      expect(mockFunction).toBeTruthy();
    });
  });
});
