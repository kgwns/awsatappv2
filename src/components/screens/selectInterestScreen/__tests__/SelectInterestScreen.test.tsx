import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {storeSampleData} from '../../../../constants/SampleData';
import {SelectInterestScreen} from '../SelectInterestScreen';

describe('<SelectInterestScreen>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <SelectInterestScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render SelectInterestScreen', () => {
    expect(instance).toBeDefined();
  });
});
