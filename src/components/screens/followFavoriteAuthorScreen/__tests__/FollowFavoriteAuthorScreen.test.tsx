import React, { useState } from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from 'src/constants/SampleData';
import {FollowFavoriteAuthorScreen} from '../FollowFavoriteAuthorScreen';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useAllWriters", () => ({
  useAllWriters: (...args: any) => {
    return {
      isLoading: false,
      allWritersData: [],
      error: '',
      sendAuthorInfo: {},
      fetchAllWritersRequest: () => [],
      sendSelectedWriterInfo: () => [],
      updateAllWritersData: () => []
    }
  },
}));

describe('<FollowFavoriteAuthorScreen>', () => {
  let instance: RenderAPI;

  const setDisableNext = jest.fn()
  const setWritersData = jest.fn();
  const setUpdatedWriters = jest.fn();

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, setDisableNext]);
    (useState as jest.Mock).mockImplementation(() => [[], setWritersData]);
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

  xit('Should Press Next Button', () => {
    const element = instance.getByTestId('nextButtonTestId');
    fireEvent.press(element);
  });
});
