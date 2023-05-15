import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useState } from 'react';
import { PodcastWidget } from 'src/components/organisms';
import { fetchSingleEpisodeSpreakerApi } from 'src/services/podcastService';

jest.mock('src/services/podcastService');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}))

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: true,
  isIOS: false
}));

const sampleData = [{
  type: "podcast",
  view_node: "http://srpcawsatdev.prod.acquia-sites.com/node/111",
  field_new_sub_title_export: null,
  title: "أول شحنة عسكرية أميركية لـ«الحر» وغرفة عمليات إيرانية في حمص",
  field_duration_export: null,
  field_episode_export: null,
  field_google_podcast_export: null,
  field_podcast_image_export: null,
  field_podcast_sect_export: {
    id: "94842",
    title: "صباح الخير",
    url: "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842",
    bundle: "podcast_section",
    description: "<p class=\"text-align-right\">Breifing</p>\n",
    img_podcast_desktop: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/2022-02/podcast-banner2.jpg",
    img_podcast_mobile: "http://srpcawsatdev.prod.acquia-sites.com/sites/default/files/2022-02/podcast2_0.jpg",
    name: "صباح الخير"
  },
  field_spotify_export: null,
  field_spreaker_episode_export: 'field_spreaker_episode_export',
  field_spreaker_show_export: null,
  field_announcer_name_export: null,
  field_apple_podcast_export: null,
  body_export: null
}]

describe('<PodcastWidget>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setEpisodeData = jest.fn();
  const fetchSingleEpisodeSpreakerApiMock = jest.fn();
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (fetchSingleEpisodeSpreakerApi as jest.Mock).mockImplementation(fetchSingleEpisodeSpreakerApiMock);
    DeviceTypeUtilsMock.isTab = true;
    DeviceTypeUtilsMock.isIOS = false;
    (useState as jest.Mock).mockImplementation(() => [sampleData, setEpisodeData]);
    const component = <PodcastWidget onPress={mockFunction} data={sampleData} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render PodcastWidget component', () => {
    expect(instance).toBeDefined();
  });

  // Commented out the podcast list is not displaying in tab ui
  // it("test ListenToPodcast onPress method", () => {
  //   const testId = instance.getByTestId('podcastId');
  //   fireEvent(testId, 'onPress')
  //   expect(mockFunction).toHaveBeenCalled()
  // })

  // it("test ButtonImage onPress method", () => {
  //   const element = instance.container.findByType(ButtonImage);
  //   fireEvent(element, 'onPress')
  //   expect(mockFunction).toHaveBeenCalled()
  // })
  it("test fetchSingleEpisodeSpreakerApi to return response",async() => {
    (fetchSingleEpisodeSpreakerApiMock).mockReturnValue({response:{episode:{result:true}}});
    const response = await fetchSingleEpisodeSpreakerApi({episodeId:'2'});
    expect(response).toEqual({response:{episode:{result:true}}});
  });

});


describe('<PodcastWidget>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const setEpisodeData = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    DeviceTypeUtilsMock.isIOS = true;
    (useState as jest.Mock).mockImplementation(() => [sampleData, setEpisodeData])
    const component = <PodcastWidget onPress={mockFunction} data={sampleData} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render PodcastWidget component', () => {
    expect(instance).toBeDefined();
  });

  it("test ListentoArticle onPress method", () => {
    const element = instance.getByTestId('listenToArticleButtonHome');
    fireEvent(element, 'onPress')
    expect(mockFunction).toHaveBeenCalled()
  })

});

describe('<PodcastWidget>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setEpisodeData = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    DeviceTypeUtilsMock.isIOS = true;
    (useState as jest.Mock).mockImplementation(() => [{}, setEpisodeData])
    const component = <PodcastWidget onPress={mockFunction} data={sampleData} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render PodcastWidget component', () => {
    expect(instance).toBeDefined();
  });
});

describe('<PodcastWidget>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const setEpisodeData = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    DeviceTypeUtilsMock.isIOS = false;
    (useState as jest.Mock).mockImplementation(() => [[{}], setEpisodeData])
    const component = <PodcastWidget onPress={mockFunction} data={sampleData} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render PodcastWidget component', () => {
    expect(instance).toBeDefined();
  });

});




