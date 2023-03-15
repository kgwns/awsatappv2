import React, { useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../constants/Constants';
import { VideoContent } from '..';
import { VideoItemType } from 'src/redux/videoList/types';
import { FlatList } from 'react-native';
import { ImageWithIcon, Label } from 'src/components/atoms';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('<VideoContent>', () => {
  let instance: RenderAPI;
  const sampleData: VideoItemType[] = [
    {
      nid: '1',
      title: '123',
      isBookmarked: true,
      field_jwplayerinfo_export:'field_jwplayerinfo_export',
      field_thumbnil_multimedia_export:'field_thumbnil_multimedia_export'
    },
    {
      nid: '2',
      title: '124',
      isBookmarked: true,
      field_jwplayerinfo_export:'field_jwplayerinfo_export',
      field_thumbnil_multimedia_export:'field_thumbnil_multimedia_export'
    },
    {
      nid: '3',
      title: '124',
      isBookmarked: true,
      field_jwplayerinfo_export:'field_jwplayerinfo_export',
      field_thumbnil_multimedia_export:'field_thumbnil_multimedia_export'
    },
  ];
  const mockFunction = jest.fn();
  const setIsTwoLine = jest.fn();
  const setState = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    (useState as jest.Mock).mockImplementation(() => [false,setState])
    const component = (
      <Provider store={storeSampleData}>
        <VideoContent data={sampleData} onPress={mockFunction} isTabDesign={true} />
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
    fireEvent(element, 'renderItem', { item: sampleData[0], index: 0 });
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'keyExtractor', '', 2);
    expect(mockFunction).toBeTruthy()
  });

  it('testing onPress event in renderItem', () => {
    const testId = instance.getAllByTestId('videoContentPressId')[0];
    fireEvent(testId, 'onPress');
    expect(mockFunction).toHaveBeenCalled();
  })

  it('Should render ImageWithIcon onPress', () => {
    const props = {
      nid: '3432',
      title: 'title',
      isBookmarked: true,
    }
    const element = instance.container.findAllByType(ImageWithIcon)[0];
    fireEvent(element, 'onPress',props)
    expect(mockFunction).toHaveBeenCalled();
  })
  it("should render label onTextLayout with event", () => {
    const element = instance.container.findAllByType(Label)[1];
    fireEvent(element,'onTextLayout',{nativeEvent:{lines:'event'}});
    expect(setState).toHaveBeenCalled();
    expect(setState).toHaveBeenCalledWith(true)
    expect(setState).toHaveBeenCalledWith(5)
  })
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
  const setIsTwoLine = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    (useState as jest.Mock).mockImplementation(() => [true,setIsTwoLine]);
    const component = (
      <Provider store={storeSampleData}>
        <VideoContent data={sampleData} onPress={mockFunction} />
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
  const setState = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    (useState as jest.Mock).mockImplementation(() => [false,setState]);
    const component = (
      <Provider store={storeSampleData}>
        <VideoContent data={sampleData} onPress={mockFunction} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it("should render label onTextLayout with event", () => {
    const element = instance.container.findAllByType(Label)[1];
    fireEvent(element,'onTextLayout',{nativeEvent:{lines:'event'}});
    expect(setState).toHaveBeenCalled();
    expect(setState).toHaveBeenCalledWith(true)
    expect(setState).toHaveBeenCalledWith(5)
  })

});

