import React, { useRef, useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ScreensConstants, storeSampleData } from '../../../../constants/Constants';
import { SuccessScreen } from '../SuccessScreen';
import {useNavigation} from '@react-navigation/native';
import { ButtonOnboard } from 'src/components/atoms';
import { AppState, NativeEventSubscription } from 'react-native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: true
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
  useRef: jest.fn()
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
    DeviceTypeUtilsMock.isTab = false;
    const appStateSpy = jest.spyOn(AppState, 'addEventListener').mockImplementation((_mockvalue,nextAppState) =>{
      nextAppState('inactive')
      return {
      } as NativeEventSubscription
    });
    appStateSpy.mock.calls[0][1]('active')
    expect(instance).toBeDefined();
    expect(LottieView.resume).toBeCalled();
  });

  it('Should click GoToHome', () => {
    const listButton = instance.container.findAllByType(ButtonOnboard)[0];
    fireEvent(listButton, 'onPress');
    expect(navigation.reset).toHaveBeenCalled();
    expect(navigation.reset).toHaveBeenCalledWith({index: 0, routes: [{name: ScreensConstants.AppNavigator}]});
  });

  it('Should click GotoMyNews', () => {
    const listButton = instance.container.findAllByType(ButtonOnboard)[1];
    fireEvent(listButton, 'onPress');
    expect(navigation.reset).toHaveBeenCalled();
    expect(navigation.reset).toHaveBeenCalledWith({index: 0, routes: [{name: ScreensConstants.AppNavigator, params: {isGoToMyNews: true}}]});
  });

});
