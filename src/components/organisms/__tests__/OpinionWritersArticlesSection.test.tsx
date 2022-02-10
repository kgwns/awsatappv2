import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {
  opinionWritersArticlesData,
  storeSampleData,
} from '../../../constants/SampleData';
import {OpinionWritersArticlesSection} from '..';

describe('<OpinionWritersArticlesSection>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <OpinionWritersArticlesSection data={opinionWritersArticlesData} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render OpinionWritersArticlesSection component', () => {
    expect(instance).toBeDefined();
  });
});
