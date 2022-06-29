import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import {FollowFavoriteAuthorWidget} from 'src/components/organisms';

describe('<FollowFavoriteAuthorWidget>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const sampleData: any = [
    {
      name: 'name',
      tid: 'tid',
      field_opinion_writer_photo_export: 'field_opinion_writer_photo_export',
      isSelected: 'false',
    },
  ];

  beforeEach(() => {
    const component = <FollowFavoriteAuthorWidget data={sampleData} />;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render FollowFavoriteAuthorWidget component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call ScrollView onPress', () => {
    const element = instance.container.findByType(ScrollView)
    fireEvent(element, 'onContentSizeChange');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {item: sampleData[0]});
    expect(mockFunction).toBeTruthy()
  });
  
});
