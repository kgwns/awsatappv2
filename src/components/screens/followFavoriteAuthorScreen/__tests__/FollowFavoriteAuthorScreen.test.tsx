import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from 'src/constants/SampleData';
import {FollowFavoriteAuthorScreen} from '../FollowFavoriteAuthorScreen';

jest.mock("src/hooks/useAllWriters", () => ({
  useAllWriters: (...args: any) => {
    return {
      isLoading: false,
      allWritersData: [],
      error: '',
      sendAuthorInfo: {},
      fetchAllWritersRequest: () => [],
      sendSelectedWriterInfo: () => []
    }
  },
}));

describe('<FollowFavoriteAuthorScreen>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
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

  it('Should Press Next Button', () => {
    const element = instance.getByTestId('nextButtonTestId');
    fireEvent.press(element);
  });
});
