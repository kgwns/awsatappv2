import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { FlatList } from 'react-native';
import {AuthorWidget} from 'src/components/organisms';
import { Divider } from 'src/components/atoms';

describe('<AuthorWidget>', () => {
  let instance: RenderAPI;

  const sampleData: any = [
    {
      title: 'title',
      body: 'body',
      nid: 'nid',
      field_opinion_writer_node_export: [
        {
          id: 'id',
          title: 'title',
          url: 'url',
          bundle: 'bundle',
          name: 'name',
          opinion_writer_photo: 'opinion_writer_photo',
        },
      ],
      field_jwplayer_id_opinion_export: 'example',
      jwplayer_info: '3:22'
    },
  ];

  beforeEach(() => {
    const component = <AuthorWidget data={sampleData} widgetHeader={'example'} listKey={'listKey'} lastIndexDivider={true}/>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render AuthorWidget component', () => {
    expect(instance).toBeDefined();
  });

  it('when PodcastVerticalList only When onPressBookmark', () => {
    const testID = instance.container.findAllByType(FlatList)[0];
    fireEvent(testID, 'ItemSeparatorComponent');
    expect(<Divider />).toBeTruthy();
  });
});

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
      jwplayer: 'example',
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

  it('should render AuthorWidget component', () => {
    expect(render( <AuthorWidget data={[]} />)).toBeDefined();
  });
});
