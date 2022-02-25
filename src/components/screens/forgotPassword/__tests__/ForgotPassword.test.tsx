import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../../constants/SampleData';
import { ForgotPassword } from '../ForgotPassword';

describe('<SuccessScreen>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <Provider store={storeSampleData}>
        <ForgotPassword />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render ForgotPassword', () => {
    expect(instance).toBeDefined();
  });
});
