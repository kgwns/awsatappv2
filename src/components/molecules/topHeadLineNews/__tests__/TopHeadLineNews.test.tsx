import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  {TopHeadLineNews} from 'src/components/molecules/topHeadLineNews/TopHeadLineNews'
import {useNavigation} from '@react-navigation/native';
import { FlatList } from 'react-native';
import { HomePageArticleType, MainSectionBlockType } from 'src/redux/latestNews/types';
import FixedTouchable from 'src/shared/utils/FixedTouchable';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<TopHeadLineNews />', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const navigation = {
    navigate: mockFunction,
  }

  const sampleData: MainSectionBlockType[] = [
    {
      body: 'example',
      title: 'example',
      nid: '1',
      image: 'example',
      news_categories : {
        id: '1',
        title: 'abc',
        url: 'acs',
        bundle: 'abc',
        name: 'example',
      },
      author: 'example',
      created: 'example',
      isBookmarked: true,
      type: HomePageArticleType.ARTICLE,
      blockName: 'example',
      position: 'example',
      displayType: 'article'
    },
    {
      body: 'example',
      title: 'example',
      nid: '2',
      image: 'example',
      news_categories : {
        id: '1',
        title: 'abc',
        url: 'acs',
        bundle: 'abc',
        name: 'example',
      },
      author: 'example',
      created: 'example',
      isBookmarked: true,
      type: HomePageArticleType.ARTICLE,
      blockName: 'example',
      position: 'example',
      displayType: 'article'
    },
  ]

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = <TopHeadLineNews data={sampleData}/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {item: sampleData[0], index: 0});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findAllByType(FixedTouchable)[0];
    fireEvent(element, 'onPress', {nid:'1'});
    expect(mockFunction).toBeTruthy()
  });
  
})