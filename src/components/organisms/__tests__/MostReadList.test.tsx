import React from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../constants/SampleData';
import {MostReadList} from '..';

describe('<MostReadList>', () => {
  let instance: RenderAPI;
  const sampleData: any = [
    {
      nid: 'nid',
      title: 'title',
      body: 'body',
      field_image: 'field_image',
      view_node: 'view_node',
      field_news_categories_export: [{
        id: 'id',
        title: 'title',
        url: 'url',
        bundle: 'bundle',
        name: 'name',
      }],
      field_publication_date_export: 'field_publication_date_export',
    },
  ];

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <MostReadList data={sampleData} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render component', () => {
    expect(instance).toBeDefined();
  });
});
