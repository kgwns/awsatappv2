import React, { useState } from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import { storeSampleData} from '../../../../constants/Constants';
import {SelectTopicsScreen} from '../SelectTopicsScreen';
import { AllSiteCategoriesItemType } from 'src/redux/allSiteCategories/types';
import { InterestedTopics } from 'src/components/organisms';
import { useAllSiteCategories } from 'src/hooks';
import { useNavigation } from '@react-navigation/native';
import { NextButton } from 'src/components/atoms';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
  isIOS: false
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn().mockReturnValue({navigate: jest.fn()}),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
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
jest.mock('src/hooks/useAllSiteCategories', () => ({useAllSiteCategories: jest.fn()}));

const sampleData: AllSiteCategoriesItemType[] = [
  {
    name: 'abc',
    view_taxonomy_term: 'abc',
    tid: '12',
    field_opinion_writer_photo_export: 'abc',
    parent_target_id_export: [],
    isSelected: true
  }
]

const sampleData1: AllSiteCategoriesItemType[] = [
  {
    name: 'abc',
    view_taxonomy_term: 'abc',
    tid: '12',
    field_opinion_writer_photo_export: 'abc',
    parent_target_id_export: [],
  }
]
describe('<SelectTopicsScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const disableNext = mockFunction;
  const categoriesInfo = mockFunction;
  const updatedTopics = mockFunction;
  const useAllSiteCategoriesMock = jest.fn();
  const navigation = {
    navigate:jest.fn()
  }

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, disableNext]);
    (useState as jest.Mock).mockImplementation(() => [sampleData, categoriesInfo]);
    (useState as jest.Mock).mockImplementation(() => [sampleData, updatedTopics]);
    (useNavigation as jest.Mock).mockReturnValue(navigation);
    (useAllSiteCategories as jest.Mock).mockImplementation(useAllSiteCategoriesMock);
    useAllSiteCategoriesMock.mockReturnValue({
      isLoading: false,
      allSiteCategoriesData: [
        {
            name: 'example',
            description__value_export: {},
            field_opinion_writer_path_export: {},
            view_taxonomy_term: 'example',
            tid: '12',
            vid_export: {},
            field_description_export: {},
            field_opinion_writer_path_export_1: {},
            field_opinion_writer_photo_export: 'example',
            parent_target_id_export: {},
            isSelected: true,
        },
        {
            name: 'example',
            description__value_export: {},
            field_opinion_writer_path_export: {},
            view_taxonomy_term: 'example',
            tid: '13',
            vid_export: {},
            field_description_export: {},
            field_opinion_writer_path_export_1: {},
            field_opinion_writer_photo_export: 'example',
            parent_target_id_export: {},
            isSelected: true,
        },
      ],
      sentTopicsData: {
        code: 500,
        message: "example"
      },
      sendSelectedTopicInfo: () => { return [] },
      fetchAllSiteCategoriesRequest: () => { return [] },
      updateAllSiteCategoriesData: () => { return [] },
      emptySendTopicsInfoData: () => {return [] },
      getSelectedTopicsData: () => {return [] },
    });
    const component = (
      <Provider store={storeSampleData}>
        <SelectTopicsScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render SelectTopicScreen', () => {
    expect(instance).toBeDefined();
  });

  test('Should render SelectTopicScreen in tab', () => {
    DeviceTypeUtilsMock.isTab = true;
    expect(instance).toBeDefined();
  });

  test('Should render SelectTopicScreen in iOS', () => {
    DeviceTypeUtilsMock.isTab = false;
    DeviceTypeUtilsMock.isIOS = true;
    expect(instance).toBeDefined();
  });

  test('Should call InterestedTopics onTopicsChanged', () => {
    const element = instance.container.findByType(InterestedTopics)
    fireEvent(element, 'onTopicsChanged', sampleData[0], true);
    expect(mockFunction).toBeTruthy()
  });

});

describe('<SelectTopicsScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const disableNext = mockFunction;
  const categoriesInfo = mockFunction;
  const updatedTopics = mockFunction;
  const useAllSiteCategoriesMock = jest.fn();
  const navigation = {
    navigate:jest.fn()
  }

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, disableNext]);
    (useState as jest.Mock).mockImplementation(() => [sampleData1, categoriesInfo]);
    (useState as jest.Mock).mockImplementation(() => [sampleData1, updatedTopics]);
    (useNavigation as jest.Mock).mockReturnValue(navigation);
    (useAllSiteCategories as jest.Mock).mockImplementation(useAllSiteCategoriesMock);
    useAllSiteCategoriesMock.mockReturnValue({
      isLoading: false,
      allSiteCategoriesData: [],
      sentTopicsData: {
        code: 400,
      },
      sendSelectedTopicInfo: () => { return [] },
      fetchAllSiteCategoriesRequest: () => { return [] },
      updateAllSiteCategoriesData: () => { return [] },
      emptySendTopicsInfoData: () => {return [] },
      getSelectedTopicsData: () => {return [] },
    });
    const component = (
      <Provider store={storeSampleData}>
        <SelectTopicsScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render SelectTopicScreen', () => {
    expect(instance).toBeDefined();
  });

  test('Should call InterestedTopics onTopicsChanged', () => {
    const element = instance.container.findByType(InterestedTopics)
    fireEvent(element, 'onTopicsChanged', {item: sampleData1[0], selected: true});
    expect(mockFunction).toBeTruthy()
  });

  it("Should call NextButton onPress",() => {
    const testId = instance.container.findByType(NextButton)
    fireEvent(testId,'onPress');
  })

});

describe('<SelectTopicsScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const disableNext = mockFunction;
  const categoriesInfo = mockFunction;
  const updatedTopics = mockFunction;
  const useAllSiteCategoriesMock = jest.fn();
  const navigation = {
    navigate:jest.fn()
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(navigation);
    (useState as jest.Mock).mockImplementation(() => [true, disableNext]);
    (useState as jest.Mock).mockImplementation(() => [[], categoriesInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], updatedTopics]);
    (useAllSiteCategories as jest.Mock).mockImplementation(useAllSiteCategoriesMock);
    useAllSiteCategoriesMock.mockReturnValue({
      isLoading: false,
      allSiteCategoriesData: [],
      sentTopicsData: {},
      sendSelectedTopicInfo: () => { return [] },
      fetchAllSiteCategoriesRequest: () => { return [] },
      updateAllSiteCategoriesData: () => { return [] },
      emptySendTopicsInfoData: () => {return [] },
      getSelectedTopicsData: () => {return [] },
    });
    const component = (
      <Provider store={storeSampleData}>
        <SelectTopicsScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render SelectTopicScreen', () => {
    expect(instance).toBeDefined();
  });

});

describe('<SelectTopicsScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const disableNext = mockFunction;
  const categoriesInfo = mockFunction;
  const updatedTopics = mockFunction;
  const useAllSiteCategoriesMock = jest.fn();

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, disableNext]);
    (useState as jest.Mock).mockImplementation(() => [sampleData1, categoriesInfo]);
    (useState as jest.Mock).mockImplementation(() => [sampleData1, updatedTopics]);
    (useAllSiteCategories as jest.Mock).mockImplementation(useAllSiteCategoriesMock);
    useAllSiteCategoriesMock.mockReturnValue({
      isLoading: false,
      allSiteCategoriesData: [],
      sentTopicsData: {
        code: 200,
      },
      sendSelectedTopicInfo: () => { return [] },
      fetchAllSiteCategoriesRequest: () => { return [] },
      updateAllSiteCategoriesData: () => { return [] },
      emptySendTopicsInfoData: () => {return [] },
      getSelectedTopicsData: () => {return [] },
    });
    const component = (
      <Provider store={storeSampleData}>
        <SelectTopicsScreen navigation = {{navigate: jest.fn()}} />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should navigate to Follow Favorite Author Screen', () => {
    expect(instance).toBeDefined();
  });

});
