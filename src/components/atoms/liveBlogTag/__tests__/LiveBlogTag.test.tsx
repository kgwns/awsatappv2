import React, {useState, useRef} from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/Constants';
import {LiveBlogTag} from '../LiveBlogTag';
import LottieView from 'lottie-react-native';
import {AppState} from 'react-native';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useRef: jest.fn(),
}));

jest.mock('lottie-react-native');


describe('<LiveBlogTag>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const appState = mockFunction;

  const animationRef = mockFunction;

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [
      LottieView,
      animationRef,
    ]);
    (useRef as jest.Mock).mockImplementation(() => [
      AppState.currentState,
      appState,
    ]);
    const component = (
      <Provider store={storeSampleData}>
        <LiveBlogTag isImageTag={false} enableBottomMargin={false} enableTopMargin={false}/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render LiveBlogTag', () => {
    const appStateSpy = jest.spyOn(AppState, 'addEventListener');
    expect(instance).toBeDefined();
    appStateSpy.mock.calls[0][1]('active')

  });

});

describe('<LiveBlogTag>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const appState = mockFunction;

  const animationRef = mockFunction;
 

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [
      LottieView,
      animationRef,
    ]);
    (useRef as jest.Mock).mockImplementation(() => [
      AppState.currentState,
      appState,
    ]);
    const component = (
      <Provider store={storeSampleData}>
        <LiveBlogTag isImageTag={true} enableBottomMargin={true} enableTopMargin={true}/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render LiveBlogTag', () => {
    const appStateSpy = jest.spyOn(AppState, 'addEventListener');
    appStateSpy.mock.calls[0][1]('active')
    expect(instance).toBeDefined();
  });

});