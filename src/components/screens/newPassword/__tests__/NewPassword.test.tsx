import React, { useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/Constants';
import { NewPassword } from 'src/components/screens/newPassword/NewPassword';
import { TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { SocialLoginButton } from 'src/components/atoms';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('<NewPassword>', () => {
  let instance: RenderAPI;
  const mockFunction= jest.fn();

  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }

  const password = mockFunction;
  const passwordError = mockFunction;
  const confirmPassword = mockFunction;
  const confirmPasswordError = mockFunction;

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => ['Password@1', password]);
    (useState as jest.Mock).mockImplementation(() => ['Invalid Password', passwordError]);
    (useState as jest.Mock).mockImplementation(() => ['Password@1', confirmPassword]);
    (useState as jest.Mock).mockImplementation(() => ['Invalid Password', confirmPasswordError]);
    const component = (
      <Provider store={storeSampleData}>
        <NewPassword />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render NewPassword', () => {
    expect(instance).toBeDefined();
  });

  it('When MenuButton Press', () => {
    const listButton = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent(listButton, 'onPress');
    expect(navigation.goBack).toHaveBeenCalled;
  });

  it('When MenuButton Press', () => {
    const listButton = instance.getByTestId('terms_and_conditions');
    fireEvent(listButton, 'onPress', 'TERMSANDCONDITIONS');
    expect(navigation.navigate).toBeTruthy();
  });

  it('When MenuButton Press', () => {
    const listButton = instance.getByTestId('terms_and_conditions');
    fireEvent(listButton, 'onPress', 'GOOGLE');
    expect(navigation.reset).toBeTruthy();
  });

  it('When MenuButton Press', () => {
    const listButton = instance.getByTestId('terms_and_conditions');
    fireEvent(listButton, 'onPress');
    expect(navigation.reset).toBeTruthy();
  });
  
  it('When SocialLoginButton Press', () => {
    const listButton = instance.container.findAllByType(SocialLoginButton)[0];
    fireEvent(listButton, 'onPress');
    expect(mockFunction).toHaveBeenCalled;
  });

});

describe('should render with no error in <NewPassword>', () => {
  let instance: RenderAPI;
  const mockFunction= jest.fn();

  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }

  const password = mockFunction;
  const passwordError = mockFunction;
  const confirmPassword = mockFunction;
  const confirmPasswordError = mockFunction;

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => ['Password@1', password]);
    (useState as jest.Mock).mockImplementation(() => ['', passwordError]);
    (useState as jest.Mock).mockImplementation(() => ['Password@1', confirmPassword]);
    (useState as jest.Mock).mockImplementation(() => ['', confirmPasswordError]);
    const component = (
      <Provider store={storeSampleData}>
        <NewPassword />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render NewPassword', () => {
    expect(instance).toBeDefined();
  });

});