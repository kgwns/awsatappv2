import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import ArticlePodCastWidget, { ArticlePodCastWidgetProps } from 'src/components/organisms/FavoritePodCastWidget';
import { storeSampleData } from 'src/constants/SampleData';
import { TouchableOpacity } from 'react-native';

describe('<ArticlePodCastWidgetSection>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
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
      expect(instance).toBeDefined();
    });
  });