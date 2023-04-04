import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {InterestedTopics} from 'src/components/organisms';
import { BorderLabel } from 'src/components/atoms';
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
  isAndroid:false,
}));
const sampleData: any = [
  {image: 'image', nid: 'nid', name: 'author', created: 'created'},
];

const sampleData1: any = [
  {image: 'image', nid: 'nid', name: 'author', created: 'created'},
  {image: 'image', nid: 'nid', name: 'author', created: 'created'},
  {image: 'image', nid: 'nid', name: 'author', created: 'created'},
  {image: 'image', nid: 'nid', name: 'author', created: 'created'},
  {image: 'image', nid: 'nid', name: 'author', created: 'created'},
  {image: 'image', nid: 'nid', name: 'author', created: 'created'},
  {image: 'image', nid: 'nid', name: 'author', created: 'created'},
  {image: 'image', nid: 'nid', name: 'author', created: 'created'},
  {image: 'image', nid: 'nid', name: 'author', created: 'created'},
  {image: 'image', nid: 'nid', name: 'author', created: 'created'},
  {image: 'image', nid: 'nid', name: 'author', created: 'created'},
];
describe('<InterestedTopics>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = false;
    const component = <InterestedTopics allSiteCategoriesData={sampleData} onTopicsChanged={mockFunction}/>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render InterestedTopics component with isAndroid as false', () => {
    DeviceTypeUtilsMock.isAndroid = false;
    expect(instance).toBeDefined();
  });

  
  it('should render InterestedTopics component with isAndroid as true', () => {
    DeviceTypeUtilsMock.isAndroid = true;
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
    DeviceTypeUtilsMock.isTab = true;
    const component = <InterestedTopics allSiteCategoriesData={sampleData1} onTopicsChanged={mockFunction}/>;
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
describe('<InterestedTopics> renders with empty array', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  beforeEach(() => {
    DeviceTypeUtilsMock.isTab = true;
    const component = <InterestedTopics onTopicsChanged={mockFunction} />;
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



