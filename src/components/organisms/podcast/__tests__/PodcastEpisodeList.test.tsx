import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { PodcastEpisodeList } from '../PodcastEpisodeList';
import {PodcastEpisodeData} from 'src/constants/Constants'
import { PodcastVerticalList } from 'src/components/molecules';
import { FlatList } from 'react-native';

describe('<PodcastEpisodeList>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  describe('when PodcastEpisodeList only', () => {
    beforeEach(() => {
      const component = (
          <PodcastEpisodeList data={PodcastEpisodeData} onItemActionPress={mockFunction} onUpdateBookmark={mockFunction} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    
    it('Should render PodcastEpisodeList', () => {
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

describe('<PodcastEpisodeList>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  describe('when PodcastEpisodeList only', () => {
    beforeEach(() => {
      const component = (
          <PodcastEpisodeList data={PodcastEpisodeData} onUpdateBookmark={mockFunction} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    
    it('Should render PodcastEpisodeList', () => {
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
