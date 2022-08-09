import React, { useState } from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/SampleData';
import {SelectTopicsScreen} from '../SelectTopicsScreen';
import { AllSiteCategoriesItemType } from 'src/redux/allSiteCategories/types';

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

jest.mock("src/hooks/useAllSiteCategories", () => ({
  useAllSiteCategories: () => {
      return {
        isLoading: false,
        allSiteCategoriesData: [
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
              parent_target_id_export: {},
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
              parent_target_id_export: {},
              isSelected: true,
          },
      ],
        sentTopicsData: {
          code: '200',
          message: "example"
        },
        sendSelectedTopicInfo: () => { return [] },
        fetchAllSiteCategoriesRequest: () => { return [] },
        updateAllSiteCategoriesData: () => { return [] },
        emptySendTopicsInfoData: () => {return [] }
      }
  },
}));

const sampleData: AllSiteCategoriesItemType[] = [
  {
    name: 'abc',
    view_taxonomy_term: 'abc',
    tid: '12',
    field_opinion_writer_photo_export: 'abc',
    parent_target_id_export: []
  }
]
describe('<SelectTopicsScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const setDisableNext = mockFunction;
  const categoriesInfo = mockFunction;
  const setUpdatedTopics = mockFunction;

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, setDisableNext]);
    (useState as jest.Mock).mockImplementation(() => [sampleData, categoriesInfo]);
    (useState as jest.Mock).mockImplementation(() => [[], setUpdatedTopics]);

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
