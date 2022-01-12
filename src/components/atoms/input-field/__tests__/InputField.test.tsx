import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {InputField} from 'src/components/atoms/input-field/InputField';

describe('<InputField />', () => {
  let instance: RenderAPI;
  beforeEach(() => {
    const component = (
      <InputField
        label={'test'}
        onChangeText={() => {
          console.log('test');
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
});
