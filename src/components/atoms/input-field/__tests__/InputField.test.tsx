import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {InputField} from 'src/components/atoms/input-field/InputField';

describe('<InputField />', () => {
  let instance: RenderAPI;
  beforeEach(() => {
    const component = (
      <InputField
        label="firstname"
        onChangeText={() => {
          console.log('firstname');
        }}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render component', () => {
    expect(instance).toBeDefined();
  });

  it('should label name is firstname', () => {
    expect(instance.container.props.label).toBe('firstname');
  });

  it('should isPassword is true', () => {
    expect(instance.container.props.isPassword).toBeFalsy();
  });

  describe('should pass isPassword as true and value', () => {
    const onChangeTextMock = jest.fn();

    beforeEach(() => {
      const component = (
        <InputField
          label="firstname"
          value="john"
          isPassword
          onChangeText={onChangeTextMock}
        />
      );
      instance = render(component);
    });

    afterEach(() => {
      instance.unmount();
    });

    it('should value is john', () => {
      expect(instance.container.props.value).toBe('john');
    });

    it('should isPassword is true', () => {
      expect(instance.container.props.isPassword).toBeTruthy();
    });
  });

  describe('should trigger onChangeText', () => {
    const onChangeTextMock = jest.fn();
    const onSubmitEditingMock = jest.fn();

    const {getByTestId} = render(
      <InputField
        label="firstname"
        value=""
        testID="inputFieldTestID"
        isPassword
        onChangeText={onChangeTextMock}
        onSubmitEditing={onSubmitEditingMock}
      />,
    );

    fireEvent(getByTestId('inputFieldTestID'), 'focus');
    fireEvent(getByTestId('inputFieldTestID'), 'blur');
    fireEvent(getByTestId('inputFieldTestID'), 'submitEditing');
    fireEvent.changeText(getByTestId('inputFieldTestID'), 'john');
    fireEvent.press(getByTestId('inputFieldTestID_passwordVisibilityID'));
    expect(onChangeTextMock).toHaveBeenCalledWith('john');
  });
});
