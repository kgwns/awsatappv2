import React from 'react';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {SectionHeader} from 'src/components/molecules/podcast/SectionHeader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

describe('<SectionHeader/>', () => {
  let instance: RenderAPI;

  //Test Data
  const headerLeft = 'إياد أبو شقرا';
  const headerRight = 'رفين';

  beforeEach(() => {
    const component = (
      <GestureHandlerRootView>
          <SectionHeader headerLeft={headerLeft} headerRight={headerRight} />
      </GestureHandlerRootView>
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render SectionHeader component', () => {
    expect(instance).toBeDefined();
  });

  it('should press more button', () => {
    const element = instance.getByTestId('leftButtonTestId');
    fireEvent.press(element);
  });
});
