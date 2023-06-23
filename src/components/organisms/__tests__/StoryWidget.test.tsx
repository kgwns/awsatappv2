import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {StoryWidget} from 'src/components/organisms';
import { storyWidgetData } from 'src/constants/Constants';
import { StoryCircle } from 'src/components/molecules';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

describe('<StoryWidget>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  beforeEach(() => {
    const component = (
      <GestureHandlerRootView>
        <StoryWidget data={storyWidgetData} onPress = {mockFunction}/>;
      </GestureHandlerRootView>
    )
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render StoryWidget component', () => {
    expect(instance).toBeDefined();
  });

  it('should render storyCircle component',() => {
    const element = instance.container.findAllByType(StoryCircle)[0];
    fireEvent(element,'onPress');
  })
  
});

