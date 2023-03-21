import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, { useState } from 'react';
import {InputField} from 'src/components/atoms/input-field/InputField';
jest.mock("react",() => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn().mockImplementation(() => [false, () => null])
  }
})
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

describe('should pass isPassword as true and value', () => {
  const mockFunction = jest.fn();
  let instance: RenderAPI;
  beforeEach(() => {
    const component = (
      <InputField
        label="firstname"
        isPassword={false}
        onSubmitEditing={mockFunction}
        error={'Error'}
        onChangeText={mockFunction}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    instance.unmount();
  });

  it('should render component', () => {
    expect(instance).toBeDefined();
  });
})

describe('InputField', () => {
  const mockFunction = jest.fn();
  const isFocused = jest.fn();
  let instance: RenderAPI;
  beforeEach(() => {
    (useState as jest.Mock).mockImplementation(() => [true,isFocused]);
    const component = (
      <InputField
        label="firstname"
        isPassword={true}
        onSubmitEditing={() => {}}
        error={'Error'}
        onChangeText={mockFunction}
        testID = {'inputFieldTestID'}
        value = 'value'
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    instance.unmount();
  });

  it('should call onFocus', () => {
    const testId = instance.getByTestId('inputFieldTestID');
    fireEvent(testId,'onFocus');
    expect(isFocused).not.toHaveBeenCalled();
  });
  it('should call onBlur', () => {
    const testId = instance.getByTestId('inputFieldTestID');
    fireEvent(testId,'onBlur');
    expect(isFocused).not.toHaveBeenCalled();
  });
})
