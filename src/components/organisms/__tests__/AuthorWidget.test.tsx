import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {AuthorWidget} from 'src/components/organisms';

describe('<AuthorWidget>', () => {
  let instance: RenderAPI;

  const sampleData: any = [
    {
      title: 'title',
      body: 'body',
      nid: 'nid',
      field_opinion_writer_node_export: {
        id: 'id',
        title: 'title',
        url: 'url',
        bundle: 'bundle',
        name: 'name',
        opinion_writer_photo: 'opinion_writer_photo',
      },
    },
  ];

  beforeEach(() => {
    const component = <AuthorWidget data={sampleData} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render AuthorWidget component', () => {
    expect(instance).toBeDefined();
  });
});
