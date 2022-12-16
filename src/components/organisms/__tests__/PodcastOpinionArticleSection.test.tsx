import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {
  PodcastOpinionArticleSectionData,
  storeSampleData,
} from '../../../constants/SampleData';
import {PodcastOpinionArticleSection} from '../PodcastOpinionArticleSection';

describe('<PodcastOpinionArticleSection>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <PodcastOpinionArticleSection data={PodcastOpinionArticleSectionData} />
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
