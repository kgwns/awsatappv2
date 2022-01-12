import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {Divider} from 'src/components/atoms/divider/Divider';

describe('<Divider />', () => {
  let instance: RenderAPI;
  beforeEach(() => {
    const component = <Divider />;
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
