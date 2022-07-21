import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {AuthorsHorizontalSlider} from '..';
import {ScrollView, TouchableWithoutFeedback} from 'react-native';

describe('<AuthorsHorizontalSlider>', () => {
  let instance: RenderAPI;
  const mockData = [
    {
      field_opinion_writer_photo_export: 'https://picsum.photos/200/300',
      name: 'الحكومة',
    },
  ];
  const mockFn = jest.fn();

  beforeEach(() => {
    const component = (
      <AuthorsHorizontalSlider
        selectedIndex={-1}
        authorsList={mockData}
        onPress={mockFn}
      />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render component', () => {
    expect(instance).toBeDefined();
  });

  test('Should call AuthorItem onPress', () => {
    const element = instance.getByTestId('MyNewsAuthor_0');
    fireEvent(element, 'onPress', [mockData, 0]);
    expect(mockFn).toBeCalled();
  });

  test('Should call ALL onPress', () => {
    const element = instance.container.findAllByType(
      TouchableWithoutFeedback as any,
    )[0];
    fireEvent(element, 'onPress', [null, -1]);
    expect(mockFn).toBeCalled();
  });

  test('Should call ScrollView onContentSizeChange', () => {
    const element = instance.container.findByType(ScrollView as any);
    fireEvent(element, 'onContentSizeChange');
    expect(mockFn).toBeTruthy();
  });
});
