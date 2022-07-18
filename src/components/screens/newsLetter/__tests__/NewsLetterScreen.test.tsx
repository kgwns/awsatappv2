import React, { useState } from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/SampleData';
import {NewsLetterScreen} from '../NewsLetterScreen';
import { useNewsLetters } from 'src/hooks';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('src/hooks/useNewsLetters', () => ({useNewsLetters: jest.fn()}));

describe('<NewsLettersScreen>', () => {
  let instance: RenderAPI;

  const useNewsLettersMock = jest.fn();
  const setDisableNext = jest.fn()
  const setCanGoBack = jest.fn()
  const setNewsLettersDataInfo = jest.fn()
  const sendSelectedNewsLettersInfoMock = jest.fn();
  const getSelectedNewsLettersDataMock = jest.fn();
  const getMyNewsLettersDataMock = jest.fn();
  const emptySelectedNewsLettersInfoDataMock = jest.fn();
  const emptySelectedNewsletterDataOnboardMock = jest.fn();
  const sendSelectedFromNewsletterOnboardMock = jest.fn();

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, setDisableNext]);
    (useState as jest.Mock).mockImplementation(() => [false, setCanGoBack]);
    (useState as jest.Mock).mockImplementation(() => [[], setNewsLettersDataInfo]);
    (useNewsLetters as jest.Mock).mockImplementation(useNewsLettersMock);
    useNewsLettersMock.mockReturnValue({
      isLoading: false,
      sentNewsLettersInfoData: {},
      selectedNewsLettersData: {},
      isMyNewsLoading: false,
      myNewsLetters: {},
      selectedNewsLetterDataOnboard: {},
      sendSelectedNewsLettersInfo: sendSelectedNewsLettersInfoMock,
      getSelectedNewsLettersData: getSelectedNewsLettersDataMock,
      getMyNewsLettersData: getMyNewsLettersDataMock,
      emptySelectedNewsLettersInfoData: emptySelectedNewsLettersInfoDataMock,
      sendSelectedFromNewsletterOnboard: sendSelectedFromNewsletterOnboardMock,
      emptySelectedNewsletterDataOnboard: emptySelectedNewsletterDataOnboardMock,
    });
    const component = (
      <Provider store={storeSampleData}>
        <NewsLetterScreen route={{ params: { nid: 123, canGoBack: true } }}/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render NewsLettersScreen component', () => {
    expect(instance).toBeDefined();
  });

  it('Should render NewsLettersScreen component', () => {
    expect(render(<Provider store={storeSampleData}>
      <NewsLetterScreen route={{ params: { canGoBack: false } }}/>
    </Provider>)).toBeDefined();
  });
  
});
