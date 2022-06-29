import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { SectionVideoFooter } from 'src/components/molecules';
import { FlatList } from 'react-native';
import KeepNotifiedWidget from '../KeepNotifiedWidget';

describe('<KeepNotifiedWidget>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const sampleData: any = [
    {image: 'image', nid: 'nid', author: 'author', created: 'created'},
  ];

  beforeEach(() => {
    const component = <KeepNotifiedWidget data={sampleData} onPress={mockFunction}/>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render KeepNotifiedWidget component', () => {
    expect(instance).toBeDefined();
  });
  
});

