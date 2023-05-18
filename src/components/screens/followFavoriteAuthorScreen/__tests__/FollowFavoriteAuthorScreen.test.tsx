import React, { useState } from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from 'src/constants/Constants';
import {FollowFavoriteAuthorScreen as FFAScreen} from '../FollowFavoriteAuthorScreen';
import { AllWritersItemType } from 'src/redux/allWriters/types';
import { useAllWriters } from 'src/hooks';
import { NextButton } from 'src/components/atoms/NextButton/NextButton';
import { FollowFavoriteAuthorWidget } from 'src/components/organisms';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const FollowFavoriteAuthorScreen = () => (
  <GestureHandlerRootView>
    <FFAScreen/>
  </GestureHandlerRootView>
)

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
  isIOS: false
}));
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useUserProfileData", () => ({
  useUserProfileData: () => {
    return {
      userProfileData: {
        user: {
          id: '12',
          email: "abc@gmail.com",
        },
        message: {
          code: 200,
          message: 'string',
        }
      },
    }
  },
}));

jest.mock('src/hooks/useAllWriters', () => ({useAllWriters: jest.fn()}));

const sampleData: AllWritersItemType[] = [
  {
    name: 'example',
    view_taxonomy_term: 'example',
    tid: '1',
    field_opinion_writer_photo_export: 'example',
    isSelected:true,
  },
  {
    name: 'example',
    view_taxonomy_term: 'example',
    tid: '2',
    field_opinion_writer_photo_export: 'example',
    isSelected:true,
  },
]
describe('<FollowFavoriteAuthorScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn()

  const disableNext = mockFunction;
  const writersData = mockFunction;
  const setUpdatedWriters = mockFunction;
  const useAllWritersMock = mockFunction

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, disableNext]);
    (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
    (useState as jest.Mock).mockImplementation(() => [[], setUpdatedWriters]);
    (useState as jest.Mock).mockImplementation(() => [sampleData, writersData]);
    useAllWritersMock.mockReturnValue({
      isLoading: false,
      allWritersData: [
        {
            name: 'example',
            description__value_export: {},
            field_opinion_writer_path_export: {},
            view_taxonomy_term: 'example',
            tid: '1',
            vid_export: {},
            field_description_export: {},
            field_opinion_writer_path_export_1: {},
            field_opinion_writer_photo_export: 'example',
            isSelected: true,
        },
        {
            name: 'example',
            description__value_export: {},
            field_opinion_writer_path_export: {},
            view_taxonomy_term: 'example',
            tid: '2',
            vid_export: {},
            field_description_export: {},
            field_opinion_writer_path_export_1: {},
            field_opinion_writer_photo_export: 'example',
            isSelected: true,
        },
      ],
      error: '',
      fetchAllWritersRequest: () => [],
      sendSelectedWriterInfo: () => [],
      updateAllWritersData: () => [],
      emptySendAuthorInfoData: () => [], 
      sendSelectedFromOnboard: () => [],
      sentAuthorInfoData: { 
        code: 200,
        message: 'string'
      }
    });
    DeviceTypeUtilsMock.isTab = true;
    const component = (
      <Provider store={storeSampleData}>
        <FollowFavoriteAuthorScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render FollowFavoriteAuthorScreen', () => {
    expect(instance).toBeDefined();
  });

  test("should call NextButton onPress",() => {
    const element = instance.container.findByType(NextButton)
    fireEvent(element,'onPress');
  })  
  
});

describe('<FollowFavoriteAuthorScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn()

  const disableNext = mockFunction;
  const writersData = mockFunction;
  const setUpdatedWriters = mockFunction;
  const useAllWritersMock = mockFunction

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, disableNext]);
    (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
    (useState as jest.Mock).mockImplementation(() => [[], setUpdatedWriters]);
    (useState as jest.Mock).mockImplementation(() => [sampleData, writersData]);
    useAllWritersMock.mockReturnValue({
      isLoading: false,
      allWritersData: [
        {
            name: 'example',
            description__value_export: {},
            field_opinion_writer_path_export: {},
            view_taxonomy_term: 'example',
            tid: '1',
            vid_export: {},
            field_description_export: {},
            field_opinion_writer_path_export_1: {},
            field_opinion_writer_photo_export: 'example',
            isSelected: true,
        },
        {
            name: 'example',
            description__value_export: {},
            field_opinion_writer_path_export: {},
            view_taxonomy_term: 'example',
            tid: '2',
            vid_export: {},
            field_description_export: {},
            field_opinion_writer_path_export_1: {},
            field_opinion_writer_photo_export: 'example',
            isSelected: true,
        },
      ],
      error: '',
      fetchAllWritersRequest: () => [],
      sendSelectedWriterInfo: () => [],
      updateAllWritersData: () => [],
      emptySendAuthorInfoData: () => [], 
      sendSelectedFromOnboard: () => [],
      sentAuthorInfoData: { 
        code: 400,
        message: 'string'
      }
    });

    const component = (
      <Provider store={storeSampleData}>
        <FollowFavoriteAuthorScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render FollowFavoriteAuthorScreen', () => {
    DeviceTypeUtilsMock.isTab = false;
    expect(instance).toBeDefined();
  });
  test('Should render FollowFavoriteAuthorScreen in iOS', () => {
    DeviceTypeUtilsMock.isIOS = true;
    expect(instance).toBeDefined();
  });

});

describe('<FollowFavoriteAuthorScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn()

  const disableNext = mockFunction;
  const writersData = mockFunction;
  const setUpdatedWriters = mockFunction;
  const useAllWritersMock = mockFunction

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, disableNext]);
    (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
    (useState as jest.Mock).mockImplementation(() => [[], setUpdatedWriters]);
    (useState as jest.Mock).mockImplementation(() => [sampleData, writersData]);
    useAllWritersMock.mockReturnValue({
      isLoading: false,
      allWritersData: [
        {
            name: 'example',
            description__value_export: {},
            field_opinion_writer_path_export: {},
            view_taxonomy_term: 'example',
            tid: '1',
            vid_export: {},
            field_description_export: {},
            field_opinion_writer_path_export_1: {},
            field_opinion_writer_photo_export: 'example',
            isSelected: true,
        },
        {
            name: 'example',
            description__value_export: {},
            field_opinion_writer_path_export: {},
            view_taxonomy_term: 'example',
            tid: '2',
            vid_export: {},
            field_description_export: {},
            field_opinion_writer_path_export_1: {},
            field_opinion_writer_photo_export: 'example',
            isSelected: true,
        },
      ],
      error: '',
      fetchAllWritersRequest: () => [],
      sendSelectedWriterInfo: () => [],
      updateAllWritersData: () => [],
      emptySendAuthorInfoData: () => [], 
      sendSelectedFromOnboard: () => [],
      sentAuthorInfoData: {}
    });
    const component = (
      <Provider store={storeSampleData}>
        <FollowFavoriteAuthorScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render FollowFavoriteAuthorScreen', () => {
    expect(instance).toBeDefined();
  });

  test("test changeSelectedStatus function",() => {
    const element = instance.container.findByType(FollowFavoriteAuthorWidget);
    fireEvent(element,'changeSelectedStatus',{tid:'1',isSelected:false},true)
  })

});

describe('<FollowFavoriteAuthorScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn()

  const disableNext = mockFunction;
  const writersData = mockFunction;
  const setUpdatedWriters = mockFunction;
  const useAllWritersMock = mockFunction

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [true, disableNext]);
    (useAllWriters as jest.Mock).mockImplementation(useAllWritersMock);
    (useState as jest.Mock).mockImplementation(() => [[], writersData]);
    (useState as jest.Mock).mockImplementation(() => [[], setUpdatedWriters]);
    useAllWritersMock.mockReturnValue({
      isLoading: false,
      allWritersData: [
        {
            name: 'example',
            description__value_export: {},
            field_opinion_writer_path_export: {},
            view_taxonomy_term: 'example',
            tid: '1',
            vid_export: {},
            field_description_export: {},
            field_opinion_writer_path_export_1: {},
            field_opinion_writer_photo_export: 'example',
            isSelected: true,
        },
        {
            name: 'example',
            description__value_export: {},
            field_opinion_writer_path_export: {},
            view_taxonomy_term: 'example',
            tid: '2',
            vid_export: {},
            field_description_export: {},
            field_opinion_writer_path_export_1: {},
            field_opinion_writer_photo_export: 'example',
            isSelected: true,
        },
      ],
      error: '',
      fetchAllWritersRequest: () => [],
      sendSelectedWriterInfo: () => [],
      updateAllWritersData: () => [],
      emptySendAuthorInfoData: () => [], 
      sendSelectedFromOnboard: () => [],
      sentAuthorInfoData: { 
        code: 400,
      }
    });
    const component = (
      <Provider store={storeSampleData}>
        <FollowFavoriteAuthorScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render FollowFavoriteAuthorScreen', () => {
    expect(instance).toBeDefined();
  });

});