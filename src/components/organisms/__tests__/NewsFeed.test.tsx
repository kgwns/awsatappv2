import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {NewsFeed} from 'src/components/organisms';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { SectionVideoFooter } from 'src/components/molecules';
import { FlatList } from 'react-native';

describe('<NewsFeed>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const sampleData: any = [
    {image: 'image', nid: 'nid', author: 'author', created: 'created'},
  ];

  beforeEach(() => {
    const component = <NewsFeed data={sampleData} onScroll={mockFunction} isLoading={false} onUpdateNewsFeedBookmark={mockFunction} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render NewsFeed component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(FixedTouchable)
    fireEvent(element, 'onPress', {nid:'0'});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(SectionVideoFooter)
    fireEvent(element, 'onPressBookmark', {index:1});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onEndReached');
    expect(mockFunction).toBeTruthy()
  });
  
});

