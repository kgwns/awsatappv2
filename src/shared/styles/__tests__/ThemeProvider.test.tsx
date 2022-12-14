import { render, RenderAPI } from '@testing-library/react-native';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'src/shared/styles/ThemeProvider';
import { storeSampleData } from 'src/constants/SampleData';
import { DEFAULT_LIGHT_THEME } from '../colors';
import { NativeModules } from 'react-native';

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')
  return {
    ...ActualReact,
    useContext: () => ({})
  }
})

jest.mock("src/hooks/useAppCommon", () => ({
  useAppCommon: () => {
    return {
      theme: {
        LIGHT: 'light',
        DARK: 'dark'
      },
      isFirstSession: false,
      serverEnvironment: {},
      storeServerEnvironmentInfo: () => [],
      articleFontSize: 2,
      storeArticleFontSizeInfo: () => [],
      resetFontSizeInfo: () => [],
    }
  },
}));

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: jest.fn(),
// }));

describe('<ThemeProvider>', () => {
  let instance: RenderAPI;
  const setTheme = jest.fn()
  const { ThemeManager } = NativeModules;
  
  beforeEach(() => {
    // (React.useState as jest.Mock).mockImplementation(() => ['dark', ThemeManager.setTheme]);
    // (useState as jest.Mock).mockImplementation(() => [DEFAULT_LIGHT_THEME, ThemeManager.setTheme]);
    // (useState as jest.Mock).mockImplementation(() => ['dark',setTheme])
    const component = (
      <Provider store={storeSampleData}>
        <ThemeProvider initial={DEFAULT_LIGHT_THEME}/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render LatestNewsSummarySection component', () => {
    expect(instance).toBeDefined();
    // expect(ThemeManager.setTheme()).toBeCalled();
  });
});

// describe('<ThemeProvider>', () => {
//   const { ThemeManager } = NativeModules;
//   test('Should render ThemeManager', () => {
//     jest.spyOn(React, 'useEffect').mockImplementation();
//     // jest.spyOn(ThemeManager, 'setTheme');
//     render(<ThemeProvider initial={DEFAULT_LIGHT_THEME}/>)
//     expect(ThemeManager.setTheme()).toBeCalled();
//   });
// });