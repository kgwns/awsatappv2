import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {
  podcastCardSectionData,
  storeSampleData,
} from '../../../constants/Constants';
import {PodcastCardSection} from '..';
import { PodcastCardWithLabel } from 'src/components/molecules';

describe('<PodcastCardSection>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <PodcastCardSection data={podcastCardSectionData} onPress = {mockFunction} />
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

  it('should render PodcastCardWithLabel itemOnPress',() => {
    const element = instance.container.findAllByType(PodcastCardWithLabel)[0];
    fireEvent(element,'itemOnPress',{
      imageUrl: 'string',
      podcastTitle: 'string',
      announcerName: 'string',
    })
    expect(mockFunction).toHaveBeenCalled()
  })
});
