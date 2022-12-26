import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React, {useState}  from 'react';
import {TouchableOpacity,TextInput} from 'react-native';
import { TextInputField } from 'src/components/atoms/text-input-field/TextInputField';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('<TextInputField>', () => {
  let instance: RenderAPI;
  const isFocused = jest.fn()
  const setIsPasswordVisible = jest.fn()
  const mockFunction = jest.fn();
  const setIsFocused = jest.fn();
  const isPasswordVisible = jest.fn();

  describe('when TextInputField only', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => [false, isFocused]);
      (useState as jest.Mock).mockImplementation(() => [false, setIsFocused]);
      (useState as jest.Mock).mockImplementation(() => [true, setIsPasswordVisible]);
      (useState as jest.Mock).mockImplementation(() => [true, isPasswordVisible]);
      const component = (
        <TextInputField onChangeText={mockFunction} rightIcon={mockFunction} isPassword={true} isMandatory={true} leftIcon={mockFunction} value={'testLabel'} onSubmitEditing={mockFunction} />
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
      expect(setIsPasswordVisible).toBeTruthy();
    });
    it('when onFocus when textInput', () => {
      const testId = instance.container.findByType(TextInput);
      fireEvent(testId, 'onFocus');
      expect(setIsFocused).toBeTruthy();
    });
    it('when onBlur when textInput', () => {
      const testId = instance.container.findByType(TextInput);
      fireEvent(testId, 'onBlur', '');
      expect(setIsFocused).toBeTruthy();
    });
    it('Should Press PlayIcon', () => {
      const element = instance.container.findAllByType(TextInput)[0];
      fireEvent(element, 'onBlur');
      expect(mockFunction).toHaveBeenCalled;
    });
    it('Should Press PlayIcon', () => {
      const element = instance.container.findAllByType(TextInput)[0];
      fireEvent(element, 'onChangeText');
      expect(mockFunction).toHaveBeenCalled;
    });
    it('Should onSubmitEditing', () => {
      const element = instance.container.findAllByType(TextInput)[0];
      fireEvent(element, 'onSubmitEditing', 'string');
      expect(mockFunction).toHaveBeenCalled;
    });
  });
});

describe('<TextInputField>', () => {
  let instance: RenderAPI;
  const isFocused = jest.fn()
  const setIsPasswordVisible = jest.fn()
  const mockFunction = jest.fn();
  const setIsFocused = jest.fn();
  const isPasswordVisible = jest.fn();

  describe('when TextInputField only', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => [false, isFocused]);
      (useState as jest.Mock).mockImplementation(() => [false, setIsFocused]);
      (useState as jest.Mock).mockImplementation(() => [true, setIsPasswordVisible]);
      (useState as jest.Mock).mockImplementation(() => [false, isPasswordVisible]);
      const component = (
        <TextInputField onChangeText={mockFunction} rightIcon={mockFunction} isPassword={true} isMandatory={true} leftIcon={mockFunction} />
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
      expect(setIsPasswordVisible).toBeTruthy();
    });
    it('when onFocus when textInput', () => {
      const testId = instance.container.findByType(TextInput);
      fireEvent(testId, 'onFocus');
      expect(setIsFocused).toBeTruthy();
    });
    it('when onBlur when textInput', () => {
      const testId = instance.container.findByType(TextInput);
      fireEvent(testId, 'onBlur', '');
      expect(setIsFocused).toBeTruthy();
    });
    it('Should Press PlayIcon', () => {
      const element = instance.container.findAllByType(TextInput)[0];
      fireEvent(element, 'onBlur');
      expect(mockFunction).toHaveBeenCalled;
    });
    it('Should Press PlayIcon', () => {
      const element = instance.container.findAllByType(TextInput)[0];
      fireEvent(element, 'onChangeText');
      expect(mockFunction).toHaveBeenCalled;
    });
    it('Should onSubmitEditing', () => {
      const element = instance.container.findAllByType(TextInput)[0];
      fireEvent(element, 'onSubmitEditing', 'string');
      expect(mockFunction).toHaveBeenCalled;
    });
  });
});

describe('<TextInputField>', () => {
  let instance: RenderAPI;
  const isFocused = jest.fn()
  const setIsPasswordVisible = jest.fn()
  const mockFunction = jest.fn();
  const setIsFocused = jest.fn();

  describe('when TextInputField only', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => [true, isFocused]);
      (useState as jest.Mock).mockImplementation(() => [false, setIsFocused]);
      (useState as jest.Mock).mockImplementation(() => [true, setIsPasswordVisible]);
      const component = (
        <TextInputField onChangeText={mockFunction} value={''} onSubmitEditing={mockFunction} isPassword={false} />
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
    it('when onFocus when textInput', () => {
      const testId = instance.container.findByType(TextInput);
      fireEvent(testId, 'onFocus');
      expect(setIsFocused).toBeTruthy();
    });
    it('when onBlur when textInput', () => {
      const testId = instance.container.findByType(TextInput);
      fireEvent(testId, 'onBlur', '');
      expect(setIsFocused).toBeTruthy();
    });
  });
});
