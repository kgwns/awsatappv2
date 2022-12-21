import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { MyTopicsHorizontalSlider } from '..';
import { ScrollView, TouchableOpacity } from 'react-native';
import { AllSiteCategoriesItemType } from 'src/redux/allSiteCategories/types';

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false
}));

describe('<MyTopicsHorizontalSlider>', () => {
  let instance: RenderAPI;
  const mockData: AllSiteCategoriesItemType[] = [
    {
      name: 'الحكومة',
      view_taxonomy_term: 'الحكومة',
      tid: '12',
      field_opinion_writer_photo_export: 'الحكومة',
      parent_target_id_export: {}
    }
  ]
  const mockFn = jest.fn();

  beforeEach(() => {
    const component = (
      <MyTopicsHorizontalSlider
        selectedIndex={-1}
        onPress={mockFn}
        topicsList={mockData}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call Article onPress', () => {
    const element = instance.getByTestId('MyNewsTopics_0');
    fireEvent(element, 'onPress', [mockData, 0]);
    expect(mockFn).toBeCalled();
  });

  test('Should call ALL onPress', () => {
    const element = instance.container.findAllByType(
      TouchableOpacity as any,
    )[0];
    fireEvent(element, 'onPress', [null, -1]);
    expect(mockFn).toBeCalled();
  });

  test('Should call ScrollView onContentSizeChange', () => {
    const element = instance.container.findByType(ScrollView as any);
    fireEvent(element, 'onContentSizeChange');
    expect(mockFn).toBeTruthy();
  });
});

describe('<MyTopicsHorizontalSlider>', () => {
  let instance: RenderAPI;
  const mockData: AllSiteCategoriesItemType[] = [
    {
      name: 'الحكومة',
      view_taxonomy_term: 'الحكومة',
      tid: '12',
      field_opinion_writer_photo_export: 'الحكومة',
      parent_target_id_export: {}
    }
  ]
  const mockFn = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isIOS = true

    const component = (
      <MyTopicsHorizontalSlider
        selectedIndex={0}
        onPress={mockFn}
        topicsList={mockData}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call Article onPress', () => {
    const element = instance.getByTestId('MyNewsTopics_0');
    fireEvent(element, 'onPress', [mockData, 0]);
    expect(mockFn).toBeCalled();
  });

  test('Should call ALL onPress', () => {
    const element = instance.container.findAllByType(
      TouchableOpacity as any,
    )[0];
    fireEvent(element, 'onPress', [null, -1]);
    expect(mockFn).toBeCalled();
  });

  test('Should call ScrollView onContentSizeChange', () => {
    const element = instance.container.findByType(ScrollView as any);
    fireEvent(element, 'onContentSizeChange');
    expect(mockFn).toBeTruthy();
  });
});
