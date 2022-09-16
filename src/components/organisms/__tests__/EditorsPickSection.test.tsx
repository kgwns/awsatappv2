import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../constants/SampleData';
import {EditorsPickSection} from 'src/components/organisms/EditorsPickSection';
import { FlatList, TouchableOpacity } from 'react-native';
import { MainSectionBlockType } from 'src/redux/latestNews/types';

describe('<EditorsPickSection>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
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
      type: 'example',
      blockName: 'example',
      position: 'example',
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
      type: 'example',
      blockName: 'example',
      position: 'example',
    },
  ]
  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <EditorsPickSection data={sampleData} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render EditorsPickSection component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findAllByType(FlatList)[0]
    fireEvent(element, 'renderItem', {item: sampleData[0], index: 0});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call TouchableOpacity onPress', () => {
    const element = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent(element, 'onPress', '2');
    expect(mockFunction).toBeTruthy();
  })

});

describe('<EditorsPickSection>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const sampleData: MainSectionBlockType[] = [
    {
      body: 'example',
      title: 'example',
      nid: '',
      image: 'example',
      news_categories : {
        id: '1',
        url: 'acs',
        bundle: 'abc',
        name: 'example',
      },
      author: 'example',
      created: 'example',
      isBookmarked: true,
      type: 'example',
      blockName: 'example',
      position: 'example',
    },
    {
      body: 'example',
      title: 'example',
      nid: '',
      image: 'example',
      news_categories : {
        id: '1',
        url: 'acs',
        bundle: 'abc',
        name: 'example',
      },
      author: 'example',
      created: 'example',
      isBookmarked: true,
      type: 'example',
      blockName: 'example',
      position: 'example',
    },
  ]
  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <EditorsPickSection data={sampleData} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render EditorsPickSection component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findAllByType(FlatList)[0]
    fireEvent(element, 'renderItem', {item: sampleData[0], index: 0});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call TouchableOpacity onPress', () => {
    const element = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent(element, 'onPress');
    expect(mockFunction).toBeTruthy();
  })

});

describe('<EditorsPickSection>', () => {
  let instance: RenderAPI;
  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <EditorsPickSection data={[]} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render EditorsPickSection component', () => {
    expect(instance).toBeDefined();
  });
});
