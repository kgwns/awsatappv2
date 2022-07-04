import React, { useState } from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/SampleData';
import {SelectTopicsScreen} from '../SelectTopicsScreen';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useAllSiteCategories", () => ({
  useAllSiteCategories: (...args: any) => {
      return {
        isLoading: false,
        allSiteCategoriesData: [],
        sentTopicsData: [],
        sendSelectedTopicInfo: () => { return [] },
        fetchAllSiteCategoriesRequest: () => { return [] },
        updateAllSiteCategoriesData: () => { return [] }
      }
  },
}));


describe('<SelectTopicsScreen>', () => {
  let instance: RenderAPI;

  const setDisableNext = jest.fn()
  const setCategoriesInfo = jest.fn();
  const setUpdatedTopics = jest.fn();

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, setDisableNext]);
    (useState as jest.Mock).mockImplementation(() => [[], setCategoriesInfo]);
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
