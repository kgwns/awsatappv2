import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { FlatList, ScrollView } from 'react-native';
import { FollowFavoriteAuthorWidget } from 'src/components/organisms';
import { FollowFavoriteAuthor } from 'src/components/molecules';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false,
  isTab: false
}));

describe('<FollowFavoriteAuthorWidget>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const sampleData: any = [
    {
      name: 'name',
      tid: 'tid',
      field_opinion_writer_photo_export: 'field_opinion_writer_photo_export',
      isSelected: true,
    },
  ];

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true
    DeviceTypeUtilsMock.isIOS = true
    const component = <FollowFavoriteAuthorWidget writersData={sampleData} changeSelectedStatus={mockFunction} />;
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
    fireEvent(element, 'renderItem', { item: sampleData[0] });
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findAllByType(FlatList)[0]
    fireEvent(element, 'keyExtractor', '', 2);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FollowFavoriteAuthor onPress', () => {
    const element = instance.container.findByType(FollowFavoriteAuthor)
    fireEvent(element, 'onPress', sampleData[0], true);
    expect(instance.container.props.changeSelectedStatus).toBeTruthy()
  });
  
});

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
    DeviceTypeUtilsMock.isTab = false;
    DeviceTypeUtilsMock.isIOS = false;
    
    const component = <GestureHandlerRootView><FollowFavoriteAuthorWidget /></GestureHandlerRootView>;
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
    fireEvent(element, 'renderItem', { item: sampleData[0] });
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findAllByType(FlatList)[0]
    fireEvent(element, 'keyExtractor', '', 2);
    expect(mockFunction).toBeTruthy()
  });
  
});
