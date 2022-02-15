import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {PodcastScreen} from 'src/components/screens/category/PodcastScreen';

describe('<PodcastScreen>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = <PodcastScreen />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render PodcastScreen', () => {
    expect(instance).toBeDefined();
  });
});
