import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../../constants/SampleData';
import { SuccessScreen } from '../SuccessScreen';

describe('<SuccessScreen>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <SuccessScreen />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render SuccessScreen', () => {
    expect(instance).toBeDefined();
  });
});
