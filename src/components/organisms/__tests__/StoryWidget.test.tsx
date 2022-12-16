import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {StoryWidget} from 'src/components/organisms';
import { storyWidgetData } from 'src/constants/SampleData';
import { StoryCircle } from 'src/components/molecules';

describe('<StoryWidget>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  beforeEach(() => {
    const component = <StoryWidget data={storyWidgetData} onPress = {mockFunction}/>;
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

