import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {InputTextArea} from 'src/components/atoms/input-text-area/InputTextArea';

describe('<InputTextArea />', () => {
  let instance: RenderAPI;
  beforeEach(() => {
    const component = (
      <InputTextArea
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

  describe('should pass isPassword as true and value', () => {
    const onChangeTextMock = jest.fn();

    beforeEach(() => {
      const component = (
        <InputTextArea
          label="firstname"
          value="john"
          maxLength={200}
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

    it('should maxLength is 200', () => {
      expect(instance.container.props.maxLength).toEqual(200);
    });
  });

  describe('should trigger onChangeText', () => {
    const onChangeTextMock = jest.fn();
    const onSubmitEditingMock = jest.fn();

    const {getByTestId} = render(
      <InputTextArea
        label="firstname"
        testID="inputTextAreaTestID"
        onChangeText={onChangeTextMock}
        onSubmitEditing={onSubmitEditingMock}
      />,
    );

    fireEvent(getByTestId('inputTextAreaTestID'), 'focus');
    fireEvent(getByTestId('inputTextAreaTestID'), 'blur');
    fireEvent.changeText(getByTestId('inputTextAreaTestID'), 'john');
    expect(onChangeTextMock).toHaveBeenCalledWith('john');
    fireEvent(getByTestId('inputTextAreaTestID'), 'submitEditing');
  });
});

describe('should pass isPassword as true and value', () => {
  const mockFunction = jest.fn();
  let instance: RenderAPI;
  beforeEach(() => {
    const component = (
      <InputTextArea
        label="firstname"
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
