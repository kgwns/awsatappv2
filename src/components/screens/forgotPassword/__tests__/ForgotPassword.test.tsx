import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from '../../../../constants/SampleData';
import { ForgotPassword } from '../ForgotPassword';
import { TouchableOpacity } from 'react-native';

jest.mock("src/hooks/useLogin", () => ({
  useLogin: () => {
      return {
        emptyforgotPassworResponseInfo:()=>{}
      }
  },
}));

describe('<SuccessScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

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

  it('When TouchableOpacity onPress 3', () => {
    const listButton = instance.container.findAllByType(TouchableOpacity)[3];
    fireEvent(listButton, 'onPress','TERMSANDCONDITIONS');
    expect(mockFunction).toHaveBeenCalled;
  });

  it('When TouchableOpacity onPress 0', () => {
    const listButton = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent(listButton, 'onPress');
    expect(listButton).toBeTruthy();
  });

  it('When TouchableOpacity onPress 0', () => {
    const listButton = instance.container.findAllByType(TouchableOpacity)[1];
    fireEvent(listButton, 'onPress');
    expect(listButton).toBeTruthy();
  });

  it('When TouchableOpacity onPress 2', () => {
    const listButton = instance.container.findAllByType(TouchableOpacity)[2];
    fireEvent(listButton, 'onPress');
    expect(listButton).toBeTruthy();
  });

});
