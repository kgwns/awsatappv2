import React, { useState , useRef} from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/Constants';
import {AppState, NativeEventSubscription} from 'react-native'
import LiveArticleDetailHeader from '../LiveArticleDetailHeader';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useRef: jest.fn(),
}));

describe('<LiveArticleDetailHeader>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const appState = {
    current:'inactive'
  };
 
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
    (useState as jest.Mock).mockImplementation(() => [LottieView, animationRef]);
    (useRef as jest.Mock).mockImplementation(() => appState);
    const component = (
      <Provider store={storeSampleData}>
        <LiveArticleDetailHeader />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render LiveArticleDetailHeader', () => {
    const appStateSpy = jest.spyOn(AppState, 'addEventListener').mockImplementation((_mockvalue,nextAppState) =>{
      nextAppState('inactive')
      return {
      } as NativeEventSubscription
    });
    appStateSpy.mock.calls[0][1]('active')
    expect(instance).toBeDefined();
    expect(LottieView.resume).toBeCalled();
  });

});