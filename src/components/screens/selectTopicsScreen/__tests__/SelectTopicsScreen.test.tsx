import React, { useState } from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/SampleData';
import {SelectTopicsScreen} from '../SelectTopicsScreen';
import { AllSiteCategoriesItemType } from 'src/redux/allSiteCategories/types';
import { InterestedTopics } from 'src/components/organisms';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useAllSiteCategories", () => ({
  useAllSiteCategories: () => {
      return {
        isLoading: false,
        allSiteCategoriesData: [],
        sentTopicsData: {
          code: '200',
          message: "example"
        },
        sendSelectedTopicInfo: () => { return [] },
        fetchAllSiteCategoriesRequest: () => { return [] },
        updateAllSiteCategoriesData: () => { return [] }
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
