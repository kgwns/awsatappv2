import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {SectionComboOne} from 'src/components/organisms';
import { WidgetHeader } from 'src/components/atoms';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));

describe('<SectionComboOne>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const navigation = {
        navigate: mockFunction,
    }

  const sampleData: any = [
    {
      title: 'string',
      body: 'string',
      nid: 'string',
      image: 'string',
      news_categories: [],
      author: 'string',
      created: 'string',
      isBookmarked: true
    },
  ];

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    DeviceTypeUtilsMock.isTab = false
    const component = <SectionComboOne data={sampleData} onPress={mockFunction} sectionId={''} onUpdateBookmark={mockFunction} showSignUpPopUp={mockFunction}/>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render SectionComboOne component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call WidgetHeader onPress', () => {
    const element = instance.container.findAllByType(WidgetHeader)[0];
    fireEvent(element, 'onPress', {sectionId:'12', title: 'title'});
    expect(navigation.navigate).toBeTruthy();
  });

  it('should onPress MainArticleImage',() => {
    const testId = instance.getByTestId('mainArticleImageId');
    fireEvent(testId,'onPress');
    expect(mockFunction).toHaveBeenCalled()
  })
  
});

describe('should render <SectionComboOne> in Tablet', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const navigation = {
      navigate: mockFunction,
  }

const sampleData: any = [
  {
    title: 'string',
    body: 'string',
    nid: 'string',
    image: 'string',
    news_categories: [],
    author: 'string',
    created: 'string',
    isBookmarked: true
  },
];

beforeEach(() => {
  (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
  DeviceTypeUtilsMock.isTab = true
  const component = <SectionComboOne data={sampleData} onPress={mockFunction} sectionId={''} onUpdateBookmark={mockFunction} showSignUpPopUp={mockFunction}/>;
  instance = render(component);
});

afterEach(() => {
  jest.clearAllMocks();
  instance.unmount();
});

it('should render SectionComboOne component', () => {
  expect(instance).toBeDefined();
});
});
