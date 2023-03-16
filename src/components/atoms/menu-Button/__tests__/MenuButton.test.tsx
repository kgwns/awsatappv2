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
        icon='bookmarkActive'
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

  it('When ListenToArticleCardBI1 is pressed', () => {
    const testItemId = instance.getByTestId('menuArticleId');
    fireEvent(testItemId, 'onPress', {screenName:''});
    expect(mockFunction).toBeTruthy();
  });
});
