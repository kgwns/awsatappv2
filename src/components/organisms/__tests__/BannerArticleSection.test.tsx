import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {BannerArticleSection} from 'src/components/organisms';
import { ArticleWithOutImage, ImageArticle } from 'src/components/molecules';
import { WidgetHeader } from 'src/components/atoms';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<BannerArticleSection>', () => {
  let instance: RenderAPI;

  const sampleData: any = [
    {
      title: 'title',
      body: 'body',
      nid: 'nid',
      image: 'image',
      news_categories: {
        id: 'id',
        title: 'title',
        url: 'url',
        bundle: 'bundle',
        name: 'name',
      },
      author: 'author',
      created: 'created',
    },
    {
      title: 'title',
      body: 'body',
      nid: 'nid',
      image: 'image',
      news_categories: {
        id: 'id',
        title: 'title',
        url: 'url',
        bundle: 'bundle',
        name: 'name',
      },
      author: 'author',
      created: 'created',
    },
  ];

  const mockFunction = jest.fn();
  const navigation = {
    navigate: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = <BannerArticleSection data={sampleData} title={'example'} onPress={mockFunction} onUpdateBookmark={mockFunction} hideMore = {true} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render BannerArticleSection component', () => {
    DeviceTypeUtilsMock.isTab = true;
    expect(instance).toBeDefined();
  });
  it('should render BannerArticleSection component', () => {
    DeviceTypeUtilsMock.isTab = false;
    expect(instance).toBeDefined();
  });

  test('Should call ImageArticle onPress', () => {
    const element = instance.container.findByType(ImageArticle)
    fireEvent(element, 'onPressBookmark', sampleData[0]);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call WidgetHeader onPress', () => {
    const element = instance.container.findByType(WidgetHeader)
    fireEvent(element, 'onPress');
    expect(navigation.navigate).toBeTruthy()
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {item: sampleData[0], index: 0});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call ArticleWithOutImage onPress', () => {
    const element = instance.container.findByType(ArticleWithOutImage)
    fireEvent(element, 'onPress', '2');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call ArticleWithOutImage onPressBookmark', () => {
    const element = instance.container.findByType(ArticleWithOutImage)
    fireEvent(element, 'onPressBookmark', sampleData[0]);
    expect(mockFunction).toBeTruthy()
  });
});

describe('<BannerArticleSection>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const navigation = {
    navigate: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = <BannerArticleSection data={[]} title={''} hideMore = {false} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render BannerArticleSection component', () => {
    expect(instance).toBeDefined();
  });
});


describe('<BannerArticleSection> sending hideMore props as false', () => {
  let instance: RenderAPI;

  const sampleData: any = [
    {
      title: 'title',
      body: 'body',
      nid: 'nid',
      image: 'image',
      news_categories: {
        id: 'id',
        title: 'title',
        url: 'url',
        bundle: 'bundle',
        name: 'name',
      },
      author: 'author',
      created: 'created',
    },
    {
      title: 'title',
      body: 'body',
      nid: 'nid',
      image: 'image',
      news_categories: {
        id: 'id',
        title: 'title',
        url: 'url',
        bundle: 'bundle',
        name: 'name',
      },
      author: 'author',
      created: 'created',
    },
  ];

  const mockFunction = jest.fn();
  const navigation = {
    navigate: mockFunction,
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = <BannerArticleSection data={sampleData} title={'example'} onPress={mockFunction} onUpdateBookmark={mockFunction} hideMore = {false} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render BannerArticleSection component', () => {
    DeviceTypeUtilsMock.isTab = true;
    expect(instance).toBeDefined();
  });
  it('should render BannerArticleSection component', () => {
    DeviceTypeUtilsMock.isTab = false;
    expect(instance).toBeDefined();
  });
});
