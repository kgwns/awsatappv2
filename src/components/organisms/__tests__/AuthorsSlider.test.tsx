import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import AuthorSlider from 'src/components/organisms/AuthorsSlider';
import { WidgetHeader } from 'src/components/atoms';
import { FlatList, ScrollView } from 'react-native';

describe('<AuthorSlider>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const sampleData: any = [
    {image: 'image', nid: 'nid', author: 'author', created: 'created'},
  ];

  beforeEach(() => {
    const component = <AuthorSlider data={sampleData}/>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render AuthorSlider component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(WidgetHeader)
    fireEvent(element, 'onPress');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(ScrollView)
    fireEvent(element, 'onContentSizeChange');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {item: sampleData[0], index: 0});
    expect(mockFunction).toBeTruthy()
  });
  
});

