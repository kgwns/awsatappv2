import React, { useState } from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from 'src/constants/SampleData';
import {FollowFavoriteAuthorScreen} from '../FollowFavoriteAuthorScreen';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useAllWriters", () => ({
  useAllWriters: () => {
    return {
      isLoading: false,
      allWritersData: [],
      error: '',
      sendAuthorInfo: {},
      fetchAllWritersRequest: () => [],
      sendSelectedWriterInfo: () => [],
      updateAllWritersData: () => [],
      sentAuthorInfoData: { 
        code: 2,
        message: 'string'
      }
    }
  },
}));

const sampleData = [
  {
    name: 'example',
    description__value_export: {},
    field_opinion_writer_path_export: {},
    view_taxonomy_term: 'example',
    tid: 'example',
    vid_export: {},
    field_description_export: {},
    field_opinion_writer_path_export_1: {},
    field_opinion_writer_photo_export: 'example',
    isSelected: true
  },
]
describe('<FollowFavoriteAuthorScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn()

  const disableNext = mockFunction;
  const setWritersData = mockFunction;
  const setUpdatedWriters = mockFunction;

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, disableNext]);
    (useState as jest.Mock).mockImplementation(() => [sampleData, setWritersData]);
    (useState as jest.Mock).mockImplementation(() => [[], setUpdatedWriters]);
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
