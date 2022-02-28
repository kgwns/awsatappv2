import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {RelatedOpinionCard} from '..';

describe('<RelatedOpinionCard>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = <RelatedOpinionCard />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render the RelatedOpinionCard component', () => {
    expect(instance).toBeDefined();
  });
});
