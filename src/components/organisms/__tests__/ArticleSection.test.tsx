import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { FlatList } from 'react-native';
import {ArticleSection} from 'src/components/organisms';

describe('<ArticleSection>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  
  const sampleData: any = [
    {image: 'image', nid: 'nid', author: 'author', created: 'created'},
  ];

  beforeEach(() => {
    const component = <ArticleSection data={sampleData} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render ArticleSection component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {item: sampleData[0], index: 0});
    expect(mockFunction).toBeTruthy()
  });
});
