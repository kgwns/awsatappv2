import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {InterestedTopics} from 'src/components/organisms';
import { BorderLabel } from 'src/components/atoms';

describe('<InterestedTopics>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const sampleData: any = [
    {image: 'image', nid: 'nid', name: 'author', created: 'created'},
  ];

  beforeEach(() => {
    const component = <InterestedTopics allSiteCategoriesData={sampleData} onTopicsChanged={mockFunction} isTab={true}/>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render InterestedTopics component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call FixedTouchable onPress', () => {
    const element = instance.container.findByType(BorderLabel)
    fireEvent(element, 'onPress');
    expect(mockFunction).toBeTruthy()
  });
  
});

describe('<InterestedTopics>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  beforeEach(() => {
    const component = <InterestedTopics onTopicsChanged={mockFunction} isTab={false}/>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render InterestedTopics component', () => {
    expect(instance).toBeDefined();
  });
  
});

