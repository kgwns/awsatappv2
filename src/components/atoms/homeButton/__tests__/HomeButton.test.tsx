import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { HomeButton } from 'src/components/atoms/homeButton/HomeButton';

describe('<HomeButton/>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = (
      <HomeButton
        onPress={() => { }}
        containerStyle={{}}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render HomeButton', () => {
    expect(instance).toBeDefined();
  });
});
