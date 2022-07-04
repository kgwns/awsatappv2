import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {MenuButton} from 'src/components/atoms/menu-Button/MenuButton';

describe('<MenuButton/>', () => {
  let instance: RenderAPI;

  // Test Data
  const mockFunction = jest.fn();
  const stringData = 'title';

  beforeEach(() => {
    const component = (
      <MenuButton
        icon={'newsIcon'}
        title={stringData}
        onPress={mockFunction}
        screenName={''}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('Should render MenuButton', () => {
    expect(instance).toBeDefined();
  });

  it('When MenuButton Press', () => {
    const listButton = instance.container.findByType(TouchableOpacity);
    fireEvent(listButton, 'onPress');
    expect(mockFunction).toHaveBeenCalled;
  });
});
