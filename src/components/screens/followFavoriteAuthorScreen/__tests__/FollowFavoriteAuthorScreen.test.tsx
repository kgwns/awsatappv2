import React, { useState } from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from 'src/constants/SampleData';
import {FollowFavoriteAuthorScreen} from '../FollowFavoriteAuthorScreen';
import { AllWritersItemType } from 'src/redux/allWriters/types';

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

jest.mock("src/hooks/useAllWriters", () => ({
  useAllWriters: () => {
    return {
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
      sendAuthorInfo: {
        code: 200,
        message: "string"
      },
      fetchAllWritersRequest: () => [],
      sendSelectedWriterInfo: () => [],
      updateAllWritersData: () => [],
      emptySendAuthorInfoData: () => [], 
      sendSelectedFromOnboard: () => [],
      sentAuthorInfoData: { 
        code: 200,
        message: 'string'
      }
    }
  },
}));

const sampleData: AllWritersItemType[] = [
  {
    name: 'example',
    view_taxonomy_term: 'example',
    tid: '1',
    field_opinion_writer_photo_export: 'example'
  },
  {
    name: 'example',
    view_taxonomy_term: 'example',
    tid: '2',
    field_opinion_writer_photo_export: 'example'
  },
]
describe('<FollowFavoriteAuthorScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn()

  const disableNext = mockFunction;
  const writersData = mockFunction;
  const setUpdatedWriters = mockFunction;

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, disableNext]);
    (useState as jest.Mock).mockImplementation(() => [sampleData, writersData]);
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
