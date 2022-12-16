import React, { useState , useRef} from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../../constants/SampleData';
import LottieView from 'lottie-react-native';
import {AppState} from 'react-native'
import LiveArticleDetailHeader from '../LiveArticleDetailHeader';



jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useRef: jest.fn(),
}));

describe('<LiveArticleDetailHeader>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const appState = mockFunction;
 
  const animationRef = mockFunction;

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [LottieView, animationRef]);
    (useRef as jest.Mock).mockImplementation(() => [AppState.currentState, appState]);
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
    expect(instance).toBeDefined();
  });

});