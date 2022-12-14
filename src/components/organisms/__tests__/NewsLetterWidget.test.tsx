import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../constants/SampleData';
import {NewsLettersWidget} from '..';
import { FlatList } from 'react-native';
import { NewsLetterCard, NewsLetterCardProps } from 'src/components/molecules/NewsLetterCard';

describe('<NewsLettersWidget>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const sampleData: NewsLetterCardProps[] = [
    {
      title: 'example',
      subTitle: 'example',
      description: 'example',
      image: 'example.png',
      isSelected: true,
      onPress: function (isSelected: boolean): void {mockFunction}
    },
  ]
  
  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <NewsLettersWidget changeSelectedStatus={mockFunction} title='example' subTitle='example' description='example' isSelected={true} onPress={mockFunction} image={'example.png'} />
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

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {item: sampleData[0], index: 0});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'keyExtractor', '', 2);
    expect(mockFunction).toBeTruthy()
  });

});

