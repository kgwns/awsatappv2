import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {StoryWidget} from 'src/components/organisms';
import { storyWidgetData } from 'src/constants/Constants';

describe('<StoryWidget>', () => {
  let instance: RenderAPI;

  beforeEach(() => {
    const component = <StoryWidget data={storyWidgetData}/>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render StoryWidget component', () => {
    expect(instance).toBeDefined();
  });
  
});

