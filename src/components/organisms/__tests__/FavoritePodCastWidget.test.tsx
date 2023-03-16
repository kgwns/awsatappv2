import React from 'react';
import { render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import ArticlePodCastWidget, { ArticlePodCastWidgetProps } from 'src/components/organisms/FavoritePodCastWidget';
import { storeSampleData } from 'src/constants/Constants';
import { fetchSingleEpisodeSpreakerApi } from 'src/services/podcastService'

jest.mock('src/services/podcastService');

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: true
}));

describe('<ArticlePodCastWidgetSection>', () => {
    let instance: RenderAPI;
    const fetchSingleEpisodeSpreakerApiMock = jest.fn();
    const sampleData: ArticlePodCastWidgetProps= {
        imageUrl: '',
        title: '',  
        body: '',
        podcastHeader: '',
        allEpisodes: '',
        tagName: '',
        timeDuration: '',
        rightTitle: '',
        isBookmarked: true,
        spreakerEpisode: 'spreakerEpisode',
        onPressBookmark: () => {
          return [];
        },
        onPress: () => {
          return [];
        } ,
    }
    beforeEach(() => {
      jest.useFakeTimers('legacy');
      (fetchSingleEpisodeSpreakerApi as jest.Mock).mockImplementation(fetchSingleEpisodeSpreakerApiMock);
      const component = (
        <Provider store={storeSampleData}>
          <ArticlePodCastWidget {...sampleData} />
        </Provider>
      );
      instance = render(component);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
  
    test('Should render ArticlePodCastWidget component', () => {
      DeviceTypeUtilsMock.isTab = false;
      expect(instance).toBeDefined();
    });

    it("test fetchSingleEpisodeSpreakerApi to return response",async() => {
      (fetchSingleEpisodeSpreakerApiMock).mockReturnValue({response:{episode:{result:true}}});
      const response = await fetchSingleEpisodeSpreakerApi({episodeId:sampleData.spreakerEpisode});
      expect(response).toEqual({response:{episode:{result:true}}});
    });

  });