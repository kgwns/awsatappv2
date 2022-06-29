import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  {TopHeadLineNews} from '../TopHeadLineNews'
import {useNavigation} from '@react-navigation/native';
import { FlatList } from 'react-native';

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

  const sampleData: any = [
    {
      body: 'example',
      title: 'example',
      nid: 'example',
      image: 'example',
      news_categories : [],
      author: 'example',
      created: 'example',
      isBookmarked: true,
      type: 'example',
      blockName: 'example',
      position: 'example',
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
})