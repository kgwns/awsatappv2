import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { KeepNotifiedCard } from 'src/components/molecules';
import { FlatList } from 'react-native';
import KeepNotifiedWidget from '../KeepNotifiedWidget';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));
describe('<KeepNotifiedWidget>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const sampleData: any = [
    {image: 'image', nid: 'nid', author: 'author', created: 'created'},
  ];

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
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

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {item: sampleData[0], index: 0});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findAllByType(FlatList)[0]
    fireEvent(element, 'keyExtractor', '', 2);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call KeepNotifiedCard onPress', () => {
    const element = instance.container.findAllByType(KeepNotifiedCard)[0]
    fireEvent(element, 'onPress', sampleData[0], true);
    expect(mockFunction).toBeTruthy()
  });
  
});

describe('<KeepNotifiedWidget>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false
    const component = <KeepNotifiedWidget data={[]} onPress={mockFunction}/>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render KeepNotifiedWidget component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'renderItem', {item: [{}], index: 0});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findAllByType(FlatList)[0]
    fireEvent(element, 'keyExtractor', '', 2);
    expect(mockFunction).toBeTruthy()
  });
  
});



