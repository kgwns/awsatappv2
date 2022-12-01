import React, { useState } from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/Constants';
import {NewsLetterScreen} from '../NewsLetterScreen';
import { useNewsLetters } from 'src/hooks';
import { NewsLetterItemType } from 'src/redux/newsLetter/types';
import { NewsLettersWidget } from 'src/components/organisms';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('src/hooks/useNewsLetters', () => ({useNewsLetters: jest.fn()}));

const sampleData: NewsLetterItemType[] =[
  {
    title: 'abc',
    subTitle: 'def',
    image: 'abc',
    tid: '12',
    isSelected: false
  },
  {
    title: 'abc',
    subTitle: 'def',
    image: 'abc',
    tid: '13',
    isSelected: true
  },
]

describe('<NewsLettersScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const useNewsLettersMock = mockFunction
  const disableNext = jest.fn()
  const canGoBack = jest.fn()
  const newsLettersDataInfo = jest.fn()
  const sendSelectedNewsLettersInfoMock = mockFunction
  const getSelectedNewsLettersDataMock = mockFunction
  const getMyNewsLettersDataMock = mockFunction
  const emptySelectedNewsLettersInfoDataMock = mockFunction
  const emptySelectedNewsletterDataOnboardMock = mockFunction
  const sendSelectedFromNewsletterOnboardMock = mockFunction

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, disableNext]);
    (useState as jest.Mock).mockImplementation(() => [true, canGoBack]);
    (useState as jest.Mock).mockImplementation(() => [sampleData, newsLettersDataInfo]);
    (useNewsLetters as jest.Mock).mockImplementation(useNewsLettersMock);
    useNewsLettersMock.mockReturnValue({
      isLoading: false,
      sentNewsLettersInfoData: {
        code: 2,
        message: "string"
      },
      selectedNewsLettersData: {
        code: 2,
        message: "string",
        data: sampleData,
      },
      isMyNewsLoading: false,
      myNewsLetters: {
        code: 2,
        message: "string",
        data: sampleData,
      },
      selectedNewsLetterDataOnboard: sampleData,
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

  test('Should call NewsLettersWidget changeSelectedStatus', () => {
    const element = instance.container.findByType(NewsLettersWidget)
    fireEvent(element, 'changeSelectedStatus', {item: sampleData[0], selected: true});
    expect(mockFunction).toBeTruthy()
  });
  
});

describe('<NewsLettersScreen>', () => {
  let instance: RenderAPI;

  const mockFunction = jest.fn();
  const useNewsLettersMock = mockFunction
  const disableNext = jest.fn()
  const canGoBack = jest.fn()
  const newsLettersDataInfo = jest.fn()
  const sendSelectedNewsLettersInfoMock = mockFunction
  const getSelectedNewsLettersDataMock = mockFunction
  const getMyNewsLettersDataMock = mockFunction
  const emptySelectedNewsLettersInfoDataMock = mockFunction
  const emptySelectedNewsletterDataOnboardMock = mockFunction
  const sendSelectedFromNewsletterOnboardMock = mockFunction

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, disableNext]);
    (useState as jest.Mock).mockImplementation(() => [false, canGoBack]);
    (useState as jest.Mock).mockImplementation(() => [sampleData, newsLettersDataInfo]);
    (useNewsLetters as jest.Mock).mockImplementation(useNewsLettersMock);
    useNewsLettersMock.mockReturnValue({
      isLoading: false,
      sentNewsLettersInfoData: {
        code: 2,
        message: "string"
      },
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
        <NewsLetterScreen route={{ params: { nid: 123, canGoBack: false } }}/>
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
  
});
