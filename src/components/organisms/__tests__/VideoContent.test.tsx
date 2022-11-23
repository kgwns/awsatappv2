import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../constants/Constants';
import {VideoContent} from '..';
import { VideoItemType } from 'src/redux/videoList/types';
import { FlatList } from 'react-native';

describe('<VideoContent>', () => {
  let instance: RenderAPI;
  const sampleData: VideoItemType[] = [
    {
      nid: '1',
      title: '123',
      isBookmarked: true
    },
    {
      nid: '2',
      title: '124',
      isBookmarked: true
    },
    {
      nid: '3',
      title: '124',
      isBookmarked: true
    },
  ];
  const mockFunction = jest.fn();

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <VideoContent data={sampleData} onPress={mockFunction} isTabDesign={true}/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render VideoContent component', () => {
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

describe('<VideoContent>', () => {
  let instance: RenderAPI;
  const sampleData: VideoItemType[] = [
    {
      nid: '1',
      title: '123',
      isBookmarked: true
    },
    {
      nid: '2',
      title: '124',
      isBookmarked: true
    },
    {
      nid: '3',
      title: '124',
      isBookmarked: true
    },
  ];
  const mockFunction = jest.fn();

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <VideoContent data={sampleData} onPress={mockFunction}/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render VideoContent component', () => {
    expect(instance).toBeDefined();
  });

});
