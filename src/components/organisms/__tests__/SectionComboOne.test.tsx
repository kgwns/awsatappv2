import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {SectionComboOne} from 'src/components/organisms';
import { WidgetHeader } from 'src/components/atoms';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<ImageArticle>', () => {
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
  
});

