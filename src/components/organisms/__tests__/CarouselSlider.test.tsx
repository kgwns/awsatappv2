import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {CarouselSlider} from 'src/components/organisms';
import { ImageArticle } from 'src/components/molecules';

describe('<CarouselSlider>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const mockString= "example";
  
  const sampleData: any = [
    {
      body: mockString,
      title: mockString,
      nid: mockString,
      image: mockString,
      news_categories : {
        id: mockString,
        title: mockString,
        url: mockString,
        bundle: mockString,
        name: mockString,
      },
      author: mockString,
      created: mockString,
      isBookmarked: true,
      type: mockString,
      blockName: mockString,
      position: mockString,
    }
  ];

  beforeEach(() => {
    const component = <CarouselSlider info={sampleData} onUpdateHeroBookmark={mockFunction}/>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render CarouselSlider component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call ImageArticle onPress', () => {
    const element = instance.container.findByType(ImageArticle)
    fireEvent(element, 'onPressBookmark');
    expect(mockFunction).toBeTruthy()
  });
});
