import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {
  PodcastOpinionArticleSectionData,
  storeSampleData,
} from '../../../constants/Constants';
import {PodcastOpinionArticleSection} from '../PodcastOpinionArticleSection';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

describe('<PodcastOpinionArticleSection>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <GestureHandlerRootView>
          <PodcastOpinionArticleSection data={PodcastOpinionArticleSectionData} />
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render PodcastOpinionArticleSection component', () => {
    expect(instance).toBeDefined();
  });   
});
