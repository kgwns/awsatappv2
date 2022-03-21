import React, { useState } from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/SampleData';
import {NewsLetterScreen} from '../NewsLetterScreen';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('<NewsLettersScreen>', () => {
  let instance: RenderAPI;

  const setDisableNext = jest.fn()
  const setCanGoBack = jest.fn()
  const setNewsLettersDataInfo = jest.fn()

  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [false, setDisableNext]);
    (useState as jest.Mock).mockImplementation(() => [false, setCanGoBack]);
    (useState as jest.Mock).mockImplementation(() => [[], setNewsLettersDataInfo]);

    const component = (
      <Provider store={storeSampleData}>
        <NewsLetterScreen route={{ params: { nid: 123 } }}/>
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render NewsLettersScreen component', () => {
    expect(instance).toBeDefined();
  });

  xit('Should Press Next Button', () => {
    const element = instance.getByTestId('nextButtonTestId');
    fireEvent.press(element);
  });
  
});
