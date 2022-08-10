import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../../constants/SampleData';
import { SuccessScreen } from '../SuccessScreen';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<SuccessScreen>', () => {
  let instance: RenderAPI;

  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = (
      <Provider store={storeSampleData}>
        <SuccessScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render SuccessScreen', () => {
    expect(instance).toBeDefined();
  });

});
