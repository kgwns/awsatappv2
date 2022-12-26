import React, {useRef} from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ScreensConstants, storeSampleData } from '../../../../constants/Constants';
import { ForgotPassword } from '../ForgotPassword';
import { AppState, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

jest.mock("src/hooks/useLogin", () => ({
  useLogin: () => {
      return {
        emptyforgotPassworResponseInfo:()=>{}
      }
  },
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));


jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<SuccessScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const appState = mockFunction;
  const navigation = {
    reset: mockFunction,
    navigate: mockFunction,
    goBack:mockFunction
}

beforeEach(() => {
  (useRef as jest.Mock).mockImplementation(() => [AppState.currentState, appState]);
  (useNavigation as jest.Mock).mockReturnValue(navigation);
    const component = (
      <Provider store={storeSampleData}>
        <ForgotPassword />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render ForgotPassword', () => {
    expect(instance).toBeDefined();
  });

  it('When TouchableOpacity onPress 3', () => {
    const listButton = instance.container.findAllByType(TouchableOpacity)[3];
    fireEvent(listButton, 'onPress','TERMSANDCONDITIONS');
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.TERMS_AND_ABOUT_US,{"id": 57, "title": undefined});
  });

  it('When TouchableOpacity onPress 3, should call default', () => {
    const listButton = instance.container.findAllByType(TouchableOpacity)[3];
    fireEvent(listButton, 'onPress','Default');
    expect(navigation.reset).toHaveBeenCalled();
  });

  it('When TouchableOpacity onPress 0', () => {
    const listButton = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent(listButton, 'onPress');
    expect(listButton).toBeTruthy();
  });

  it('When TouchableOpacity onPress 0', () => {
    const listButton = instance.container.findAllByType(TouchableOpacity)[1];
    fireEvent(listButton, 'onPress');
    expect(listButton).toBeTruthy();
  });

  it('When TouchableOpacity onPress 2', () => {
    const listButton = instance.container.findAllByType(TouchableOpacity)[2];
    fireEvent(listButton, 'onPress');
    expect(listButton).toBeTruthy();
  });

});
