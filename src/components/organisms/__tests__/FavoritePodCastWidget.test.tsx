import React, { useState } from 'react';
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
jest.mock("react",() => ({
  ...jest.requireActual('react'),
  useState: jest.fn().mockImplementation(() => [0,() => null])
}))
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
      jest.useFakeTimers({
        legacyFakeTimers: true
      });
      (fetchSingleEpisodeSpreakerApi as jest.Mock).mockImplementation(fetchSingleEpisodeSpreakerApiMock);
      (fetchSingleEpisodeSpreakerApiMock).mockReturnValue({response:{episode:{result:true}}});

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
      const response = await fetchSingleEpisodeSpreakerApi({episodeId:sampleData.spreakerEpisode});
      expect(response).toEqual({response:{episode:{result:true}}});
    });

  });

  describe('<ArticlePodCastWidgetSection>', () => {
    let instance: RenderAPI;
    const fetchSingleEpisodeSpreakerApiMock = jest.fn();
    const setDuration = jest.fn();
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
      jest.useFakeTimers({
        legacyFakeTimers: true
      });
      (fetchSingleEpisodeSpreakerApi as jest.Mock).mockImplementation(fetchSingleEpisodeSpreakerApiMock);
      (fetchSingleEpisodeSpreakerApiMock).mockImplementation(() => {throw new Error('error message')});
      (useState as jest.Mock).mockImplementation(() => [0,setDuration]);

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

    it("test fetchSingleEpisodeSpreakerApi to throw Error",async() => {
      try {
        await fetchSingleEpisodeSpreakerApi({episodeId:sampleData.spreakerEpisode});
      }
      catch(e){
        expect(e.message).toEqual('error message');
        expect(setDuration).toHaveBeenCalled();
      }
    });

  });

  describe('<ArticlePodCastWidgetSection>', () => {
    let instance: RenderAPI;
    const setDuration = jest.fn();
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
      spreakerEpisode: '',
      onPressBookmark: () => {
        return [];
      },
      onPress: () => {
        return [];
      } ,
  }
    beforeEach(() => {
      jest.useFakeTimers({
        legacyFakeTimers: true
      });
      (useState as jest.Mock).mockImplementation(() => [0,setDuration]);

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

    it("setDuration state is not called",() => {
      expect(setDuration).not.toHaveBeenCalled();
    })
    

  });

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
    const setDuration = jest.fn();
    beforeEach(() => {
      jest.useFakeTimers({
        legacyFakeTimers: true
      });
      (fetchSingleEpisodeSpreakerApi as jest.Mock).mockImplementation(fetchSingleEpisodeSpreakerApiMock);
      (fetchSingleEpisodeSpreakerApiMock).mockReturnValue({episode:{result:true}});
      (useState as jest.Mock).mockImplementation(() => [0,setDuration]);

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

    it("test fetchSingleEpisodeSpreakerApi to return response and not to call setDuration state",async() => {
      const response = await fetchSingleEpisodeSpreakerApi({episodeId:sampleData.spreakerEpisode});
      expect(response).toEqual({episode:{result:true}});
      expect(setDuration).not.toHaveBeenCalled();
    });

  });