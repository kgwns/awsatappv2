import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  {DownloadNewsIOS, NativeView} from 'src/components/screens/downloadNews/DownloadNews.ios'
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
  useFocusEffect: () => jest.fn().mockImplementation(() => jest.fn())
}));

describe('<DownloadNews />', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const navigation = {
    navigate: mockFunction,
  }
  const data = {
    nativeEvent: {
      SelectedPDF: {
        title: 'abc.pdf'
      }
    }
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = <DownloadNewsIOS/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it('should render component', () => {
    expect(instance).toBeDefined()
  })

  test('Should call NativeView onArchiveButtonClick', () => {
    const element = instance.container.findByType(NativeView)
    fireEvent(element, 'onArchiveButtonClick');
    expect(navigation.navigate).toBeTruthy();
  });

})