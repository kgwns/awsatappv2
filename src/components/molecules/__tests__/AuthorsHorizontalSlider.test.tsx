import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, { useRef } from 'react';
import {AuthorsHorizontalSlider} from '..';
import {ScrollView, TouchableWithoutFeedback} from 'react-native';
import { AuthorsItemType } from '../AuthorsHorizontalSlider';

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false
}));


// const sampleData: any = {
//   current : {
//     scrollToEnd:() => []
//   }
// }

describe('<AuthorsHorizontalSlider>', () => {
  let instance: RenderAPI;
  const mockData: AuthorsItemType[] = [
    {
      name: 'الحكومة',
      field_opinion_writer_photo_export: 'https://picsum.photos/200/300',
      tid: 'الحكومة'
    },
  ];
  const mockStyle= {
      width: '100%',
      height: 1.2,
      position: 'absolute',
      bottom: 0,
  }
  const mockFn = jest.fn();
  

  beforeEach(() => {
    // (useRef as jest.Mock).mockImplementation(() => [sampleData, scrollRef]);
    const component = (
      <AuthorsHorizontalSlider
        selectedIndex={-1}
        authorsList={mockData}
        onPress={mockFn}
        style={mockStyle}
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

  test('Should call TouchableOpacity onPress', () => {
    const element = instance.getByTestId('onAllPress');
    fireEvent(element, 'onPress');
    // expect(sampleData.current.scrollToEnd()).toBeTruthy();
  })
});


describe('<AuthorsHorizontalSlider>', () => {
  let instance: RenderAPI;
  const mockData: AuthorsItemType[] = [
    {
      name: 'الحكومة',
      field_opinion_writer_photo_export: 'https://picsum.photos/200/300',
      tid: 'الحكومة'
    },
  ];
  const mockStyle= {
      width: '100%',
      height: 1.2,
      position: 'absolute',
      bottom: 0,
  }
  const mockFn = jest.fn();
  
  beforeEach(() => {
    // (useRef as jest.Mock).mockImplementation(() => [sampleData, scrollRef]);
    DeviceTypeUtilsMock.isIOS = true
    const component = (
      <AuthorsHorizontalSlider
        selectedIndex={0}
        authorsList={mockData}
        onPress={mockFn}
        style={mockStyle}
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

  test('Should call TouchableOpacity onPress', () => {
    const element = instance.getByTestId('onAllPress');
    fireEvent(element, 'onPress');
    // expect(sampleData.current.scrollToEnd()).toBeTruthy();
  })
});
