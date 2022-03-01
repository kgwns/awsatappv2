import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/SampleData';
import {OpinionArticleDetail} from '../OpinionArticleDetail';

describe('<OpinionArticleDetail>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <OpinionArticleDetail route={{ params: { nid: 123 } } }/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render OpinionArticleDetail component', () => {
    expect(instance).toBeDefined();
  });
});
