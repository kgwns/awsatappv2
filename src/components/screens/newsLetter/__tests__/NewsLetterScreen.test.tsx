import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/SampleData';
import {NewsLetterScreen} from '../NewsLetterScreen';

describe('<NewsLettersScreen>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <NewsLetterScreen />
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
