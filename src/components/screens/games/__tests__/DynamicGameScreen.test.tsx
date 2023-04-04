import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React, { useState } from 'react'
import  {DynamicGameScreen} from 'src/components/screens/games/DynamicGameScreen'
import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

describe('<DynamicGameScreen />', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const currentUrl = mockFunction;
  const navigation = {
    push: jest.fn(),
    navigate: jest.fn(),
  }
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useState as jest.Mock).mockImplementation(() => ['https://www.google.com/doodles', currentUrl]);
    const component = <DynamicGameScreen route={{params: {gameData : {url : 'https://cdn-eu1.amuselabs.com/pmm/crossword?id='}, showIntro: true}}}/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })

  it('should render component', () => {
    expect(render(<DynamicGameScreen route={{params: {gameData: {}, showIntro: false}}}/>)).toBeDefined()
  })

  test('Should call GameIntroCard onNavigationStateChange', () => {
    const element = instance.getByTestId('DynamicGameScreenID01');
    fireEvent(element, 'onNavigationStateChange', {nativeEvent: {url: 'https://cdn-eu1.amuselabs.com/pmm/crossword?id='}});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call GameIntroCard onShouldStartLoadWithRequest', () => {
    const element = instance.container.findByType(WebView);
    fireEvent(element,'onShouldStartLoadWithRequest',{url:'https://cdn-eu1.amuselabs.com/pmm/crossword?id='});
    expect(mockFunction).toBeTruthy()
    expect(navigation.push).toHaveBeenCalled();
  });

  test('Should call GameIntroCard onShouldStartLoadWithRequest url is empty', () => {
    const element = instance.container.findByType(WebView);
    fireEvent(element,'onShouldStartLoadWithRequest',{url:''});
    expect(mockFunction).toBeTruthy()
    expect(navigation.push).not.toHaveBeenCalled();
  });

})