import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../constants/Constants';
import {NewsLettersWidget} from '..';
import { FlatList } from 'react-native';
import { NewsLetterCard, NewsLetterCardProps } from 'src/components/molecules/NewsLetterCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));
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
        <GestureHandlerRootView>
          <NewsLettersWidget data = {sampleData} canGoBack = {true} changeSelectedStatus={mockFunction} title='example' subTitle='example' description='example' isSelected={true} onPress={mockFunction} image={'example.png'} />
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render component in Tab', () => {
    DeviceTypeUtilsMock.isTab = true
    expect(instance).toBeDefined();
  });
  test('Should render component', () => {
    DeviceTypeUtilsMock.isTab = false
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

  test('Should call NewsLetterCard', () => {
    const element = instance.container.findByType(NewsLetterCard)
    fireEvent(element, 'onPress');
    expect(mockFunction).toBeTruthy()
  });

});

describe('<NewsLettersWidget> with canGoBack as false', () => {
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
        <GestureHandlerRootView>
          <NewsLettersWidget data = {sampleData} canGoBack = {false} changeSelectedStatus={mockFunction} title='example' subTitle='example' description='example' isSelected={true} onPress={mockFunction} image={'example.png'} />
        </GestureHandlerRootView>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render component in Tab', () => {
    DeviceTypeUtilsMock.isTab = true
    expect(instance).toBeDefined();
  });
  test('Should render component', () => {
    DeviceTypeUtilsMock.isTab = false
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

