import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {
  podcastCardSectionData,
  storeSampleData,
} from '../../../constants/SampleData';
import {PodcastCardSection} from '..';

describe('<PodcastCardSection>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <PodcastCardSection data={podcastCardSectionData} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render PodcastCardSection component', () => {
    expect(instance).toBeDefined();
  });
});
