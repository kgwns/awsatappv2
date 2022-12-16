import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useState } from 'react';
import { PodcastEpisodeInfo } from '../PodcastEpisodeInfo';
import { ButtonOutline } from 'src/components/atoms';
import { Linking } from 'react-native';
const PodcastEpisodeData: any = {
  nid: '12',
  title: 'example',
  field_new_sub_title_export: 'title',
  field_podcast_sect_export: {
    img_podcast_mobile: 'img',
    anghami: {
      url: 'anghami@test.com',
    },
    apple_podcasts: {
      url: 'apple@test.com',
    },
    google_podcast: {
      url: 'google@test.com',
    },
    spotify: {
      url: 'spotify@test.com',
    },
  },
  field_announcer_name_export: 'abc',
  field_total_duration_export: 10,
  field_spreaker_episode_export: 'example',
  body_export: 'body',
  created_export: '2021-05-20T20:05:45+0000',
}

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
    ...jest.requireActual('src/shared/utils/dimensions'),
    isTab: false,
}));

describe('<PodcastEpisodeInfo>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  describe('PodcastEpisodeInfo with props data ', () => {
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

    it("test spotify url", () => {
      const testId = instance.getByTestId('spotifyUrl')
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toBeCalled();
    });
    it("test apple url", () => {
      const testId = instance.getByTestId('appleUrl')
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toBeCalled();
    });
    it("test google url", () => {
      const testId = instance.getByTestId('googleUrl')
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toBeCalled();
    });
    it("test anghami url", () => {
      const testId = instance.getByTestId('anghamiUrl')
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toBeCalled();
    })
  });

  describe('PodcastEpisodeInfo with props data in Tablet ', () => {
    beforeEach(() => {
      DeviceTypeUtilsMock.isTab = true;
      const component = (
        <PodcastEpisodeInfo data={PodcastEpisodeData} onListenPress={mockFunction} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it("test spotify url", () => {
      const testId = instance.getByTestId('spotifyUrlTab')
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toBeCalled();
    });
    it("test apple url", () => {
      const testId = instance.getByTestId('appleUrlTab')
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toBeCalled();
    });
    it("test google url", () => {
      const testId = instance.getByTestId('googleUrlTab')
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toBeCalled();
    });
    it("test anghami url", () => {
      const testId = instance.getByTestId('anghamiUrlTab')
      fireEvent(testId, 'onPress');
      expect(Linking.openURL).toBeCalled();
    })
  });

});
