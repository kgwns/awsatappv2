import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/SampleData';
import { NewPassword } from 'src/components/screens/newPassword/NewPassword';
import { TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { SocialLoginButton } from 'src/components/atoms';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<NewPassword>', () => {
  let instance: RenderAPI;
  const mockFunction= jest.fn();

  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
    goBack: jest.fn(),
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = (
      <Provider store={storeSampleData}>
        <NewPassword />
      </Provider>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  test('Should render NewPassword', () => {
    expect(instance).toBeDefined();
  });

  it('When MenuButton Press', () => {
    const listButton = instance.container.findAllByType(TouchableOpacity)[0];
    fireEvent(listButton, 'onPress');
    expect(navigation.goBack).toHaveBeenCalled;
  });

  it('When MenuButton Press', () => {
    const listButton = instance.container.findAllByType(TouchableOpacity)[1];
    fireEvent(listButton, 'onPress', {type: 'TERMSANDCONDITIONS'});
    expect(mockFunction).toHaveBeenCalled;
    expect(navigation.navigate).toHaveBeenCalled;
  });
  
  it('When SocialLoginButton Press', () => {
    const listButton = instance.container.findAllByType(SocialLoginButton)[0];
    fireEvent(listButton, 'onPress');
    expect(mockFunction).toHaveBeenCalled;
  });

});