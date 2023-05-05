import { render, RenderAPI } from '@testing-library/react-native';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'src/shared/styles/ThemeProvider';
import { storeSampleData } from 'src/constants/Constants';
import { DEFAULT_LIGHT_THEME } from '../colors';
import { useAppCommon } from 'src/hooks';
jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')
  return {
    ...ActualReact,
    useContext: () => ({})
  }
})

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isAndroid: false
}));

jest.mock("src/hooks/useAppCommon", () => ({
  useAppCommon: jest.fn()
}));

jest.mock('react',() => ({
  ...jest.requireActual('react'),
  useCallBack:jest.fn(),
}))
describe('<ThemeProvider> with dark theme ', () => {
  let instance: RenderAPI;
  
  beforeEach(() => {
    (useAppCommon as jest.Mock).mockReturnValue({
        theme: 'dark',
        isFirstSession: false,
        serverEnvironment: {},
        storeServerEnvironmentInfo: () => [],
        articleFontSize: 2,
        storeArticleFontSizeInfo: () => [],
        resetFontSizeInfo: () => [],
      });
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
  });

  it('Should render LatestNewsSummarySection component in Android', () => {
    DeviceTypeUtilsMock.isAndroid = true;
  });
});

describe('<ThemeProvider> with light theme', () => {
  let instance: RenderAPI;
  
  beforeEach(() => {
    (useAppCommon as jest.Mock).mockReturnValue({
        theme: 'light',
        isFirstSession: false,
        serverEnvironment: {},
        storeServerEnvironmentInfo: () => [],
        articleFontSize: 2,
        storeArticleFontSizeInfo: () => [],
        resetFontSizeInfo: () => [],
      });
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
  });
});
