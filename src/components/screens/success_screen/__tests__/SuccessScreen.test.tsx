import React, { useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../../constants/SampleData';
import { SuccessScreen } from '../SuccessScreen';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { ButtonOnboard } from 'src/components/atoms';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock("src/hooks/useAllWriters", () => ({
  useAllWriters: () => {
    return {
      emptySelectedWritersDataOnboard: () => {
        return [];
      },
    }
  },
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useNewsLetters", () => ({
  useNewsLetters: () => {
    return {
      emptySelectedNewsletterDataOnboard: () => {
        return [];
      },
    }
  },
}));

describe('<SuccessScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const navigation = {
    reset: mockFunction,
    navigate: mockFunction,
  }
  const animationRef = mockFunction;

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => [LottieView, animationRef]);
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

  it('When MenuButton Press', () => {
    const listButton = instance.container.findAllByType(ButtonOnboard)[0];
    fireEvent(listButton, 'onPress');
    expect(mockFunction).toHaveBeenCalled;
    expect(navigation.reset).toHaveBeenCalled;
  });

  it('When MenuButton Press', () => {
    const listButton = instance.container.findAllByType(ButtonOnboard)[1];
    fireEvent(listButton, 'onPress');
    expect(mockFunction).toHaveBeenCalled;
    expect(navigation.reset).toHaveBeenCalled;
  });

});
