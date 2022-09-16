import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import {ArticleSection} from 'src/components/organisms';
import { ArticleItem } from 'src/components/molecules';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('<ArticleSection>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  
  const sampleData: any = [
    {image: 'image', nid: 'nid', author: 'author', created: 'created', isBookmarked: true},
  ];

  const articleData = jest.fn()

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [sampleData, articleData]);
    const component = <ArticleSection data={sampleData} listKey={'listKey'} showDivider={true}/>;
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

  test('Should call ArticleItem onPressBookmark', () => {
    const element = instance.container.findByType(ArticleItem)
    fireEvent(element, 'onPressBookmark', 0);
    expect(mockFunction).toBeTruthy()
  });
});

describe('<ArticleSection>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  
  const sampleData: any = [
    {image: 'image', nid: 'nid', author: 'author', created: 'created', isBookmarked: true},
  ];

  const articleData = jest.fn()

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [sampleData, articleData]);
    const component = <ArticleSection data={sampleData} showDivider={false}/>;
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
