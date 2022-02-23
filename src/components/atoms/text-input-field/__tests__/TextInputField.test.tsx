import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React, {useState}  from 'react';
import {TouchableOpacity,TextInput} from 'react-native';
import {TextInputField} from '../TextInputField';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('<TextInputField>', () => {
  let instance: RenderAPI;
  const setIsFocused = jest.fn()
  const setIsPasswordVisible = jest.fn()
  const mockFunction = jest.fn();
  describe('when TextInputField only', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => [false, setIsFocused]);
      (useState as jest.Mock).mockImplementation(() => [true, setIsPasswordVisible]);
      const component = (
        <TextInputField onChangeText={mockFunction} value={'testLabel'} isPassword />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render TextInputField', () => {
      expect(instance).toBeDefined();
    });
    it('when onPress password icon', () => {
      const testId = instance.container.findByType(TouchableOpacity);
      fireEvent(testId, 'onPress');
      expect(setIsPasswordVisible).toHaveBeenCalled();
    });
    it('when onFocus when textInput', () => {
      const testId = instance.container.findByType(TextInput);
      fireEvent(testId, 'onFocus');
      expect(setIsFocused).toBeTruthy();
    });
    it('when onBlur when textInput', () => {
      const testId = instance.container.findByType(TextInput);
      fireEvent(testId, 'onBlur');
      expect(setIsFocused).toBeTruthy();
    });
  });
});
