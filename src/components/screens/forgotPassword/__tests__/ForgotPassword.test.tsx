import React, {useRef, useState} from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ScreensConstants, storeSampleData } from '../../../../constants/Constants';
import { ForgotPassword } from '../ForgotPassword';
import { AppState, NativeEventSubscription, TouchableOpacity } from 'react-native';
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
  useState: jest.fn(),
  useRef: jest.fn(),
}));


jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react-native-email-link',() => ({
  openInbox: jest.fn()
}))

jest.mock('src/shared/utils/utilities', () => ({
  ...jest.requireActual('src/shared/utils/utilities'),
  CustomAlert: jest.fn()
}))

describe('<SuccessScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const animationRef = mockFunction;
  const navigation = {
    reset: mockFunction,
    navigate: mockFunction,
    goBack:mockFunction
}

const LottieView = {
  props:{
    autoplay: false,
    autosize: true
  },
  context:{},
  refs:{},
  resume: jest.fn()
}

beforeEach(() => {
  (useRef as jest.Mock).mockImplementation(() => ({current: 'inactive'}));
  (useNavigation as jest.Mock).mockReturnValue(navigation);
  (useState as jest.Mock).mockImplementation(() => [LottieView, animationRef]);
  jest.useFakeTimers({
    legacyFakeTimers: true
  })
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
    const appStateSpy = jest.spyOn(AppState, 'addEventListener').mockImplementation((_mockvalue,nextAppState) =>{
      nextAppState('inactive')
      return {
      } as NativeEventSubscription
    });
    appStateSpy.mock.calls[0][1]('active')
    expect(instance).toBeDefined();
    expect(LottieView.resume).toBeCalled();
  });

  it('When TouchableOpacity onPress 3', () => {
    const listButton = instance.container.findAllByType(TouchableOpacity)[3];
    fireEvent(listButton, 'onPress','TERMSANDCONDITIONS');
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.TERMS_AND_ABOUT_US,{"id": 57, "title": undefined});
  });

  it('When TouchableOpacity onPress 3, should call default', () => {
    const listButton = instance.container.findAllByType(TouchableOpacity)[3];
    fireEvent(listButton, 'onPress','default');
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
