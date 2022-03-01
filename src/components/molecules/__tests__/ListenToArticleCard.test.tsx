import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {ListenToArticleCard} from '..';

describe('<ListenToArticleCard>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = <ListenToArticleCard />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render the ListenToArticleCard component', () => {
    expect(instance).toBeDefined();
  });
});
