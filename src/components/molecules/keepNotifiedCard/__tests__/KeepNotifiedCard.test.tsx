import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import KeepNotifiedCard from 'src/components/molecules/keepNotifiedCard/KeepNotifiedCard';

describe('<KeepNotifiedCard>', () => {
  let instance: RenderAPI;

  //Test Data
  const labelTitle = 'أخبار عاجلة';
  const mockFunction = jest.fn();

  beforeEach(() => {
    const component = (
      <KeepNotifiedCard
        label={labelTitle}
        selected={false}
        onPress={mockFunction}
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

  it('should label name is labelTitle', () => {
    expect(instance.container.props.label).toBe(labelTitle);
  });

  it('should selected is falsy initially', () => {
    expect(instance.container.props.selected).toBeFalsy();
  });

  describe('should performs onPress', () => {
    //Test Data
    const onPressMock = jest.fn();
    const labelTitle = 'أخبار عاجلة';
    const {getByTestId} = render(
      <KeepNotifiedCard
        label={labelTitle}
        selected={false}
        onPress={onPressMock}
      />,
    );
    fireEvent.press(getByTestId('ImageTestID'));
    expect(onPressMock).toBeCalledTimes(1);
  });
});
