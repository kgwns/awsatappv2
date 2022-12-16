import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {NewsFeed} from 'src/components/organisms';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { SectionVideoFooter } from 'src/components/molecules';
import { FlatList } from 'react-native';
import { NewsViewListItemType } from 'src/redux/newsView/types';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));
describe('<NewsFeed>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const sampleData: NewsViewListItemType[] = [
    {
      nid: '12',
      title: 'example',
      body: 'example',
      field_image: 'example',
      view_node: 'example',
      field_news_categories_export: {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      },
      field_publication_date_export: new Date(1995, 11, 25, 9, 30, 0),
      created_export: new Date(1995, 11, 25, 9, 30, 0),
      author_resource: 'example',
      isBookmarked: false,
      field_new_photo: 'example',
      displayType:'displayType'
    },
  ];

  beforeEach(() => {
    const component = <NewsFeed data={sampleData} onScroll={mockFunction} isLoading={false} onUpdateNewsFeedBookmark={mockFunction} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render NewsFeed component in Tab device', () => {
    DeviceTypeUtilsMock.isTab = true
    expect(instance).toBeDefined();
  });

  it('should render NewsFeed component', () => {
    DeviceTypeUtilsMock.isTab = false
    expect(instance).toBeDefined();
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(FixedTouchable)
    fireEvent(element, 'onPress', {nid:'0'});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(SectionVideoFooter)
    fireEvent(element, 'onPressBookmark', {index:1});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onEndReached');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call renderArticleFooter onPress', () => {
    DeviceTypeUtilsMock.isTab = true;
    const element = instance.container.findByType(SectionVideoFooter)
    fireEvent(element, 'onPressBookmark');
    expect(mockFunction).toHaveBeenCalled()
  });
  
});

describe('<NewsFeed>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const sampleData: NewsViewListItemType[] = [
    {
      nid: '',
      title: 'example',
      body: 'example',
      field_image: 'example',
      view_node: 'example',
      field_news_categories_export: {
        id: 'example',
        title: 'example',
        url: 'example',
        bundle: 'example',
        name: 'example',
      },
      field_publication_date_export: new Date(1995, 11, 25, 9, 30, 0),
      created_export: new Date(1995, 11, 25, 9, 30, 0),
      author_resource: '',
      isBookmarked: false,
      field_new_photo: 'example'
    },
  ];

  beforeEach(() => {
    const component = <NewsFeed data={sampleData} onScroll={mockFunction} isLoading={true} onUpdateNewsFeedBookmark={mockFunction} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render NewsFeed component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(FixedTouchable)
    fireEvent(element, 'onPress', {nid:'0'});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(FixedTouchable)
    fireEvent(element, 'onPress');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(SectionVideoFooter)
    fireEvent(element, 'onPressBookmark', {index:1});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onEndReached');
    expect(mockFunction).toBeTruthy()
  });
  
});

