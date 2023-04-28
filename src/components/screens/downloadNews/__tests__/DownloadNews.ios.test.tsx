import {fireEvent, render, RenderAPI} from '@testing-library/react-native'
import React from 'react'
import  {DownloadNewsIOS, NativeView} from 'src/components/screens/downloadNews/DownloadNews.ios'
import {useNavigation} from '@react-navigation/native';
import { ScreensConstants } from 'src/constants/Constants';
import { recordLogEvent } from 'src/shared/utils';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('src/shared/utils/analytics',() => ({
  ...jest.requireActual('src/shared/utils/analytics'),
  recordLogEvent: jest.fn()
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

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    const component = <DownloadNewsIOS/>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  test('should render component', () => {
    expect(instance).toBeDefined()
  })

  test('Should call NativeView onArchiveButtonClick and navigate to PDFArchive', () => {
    const element = instance.container.findByType(NativeView)
    fireEvent(element, 'onArchiveButtonClick');
    expect(navigation.navigate).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.PDFArchive);
  });

  test('Should call NativeView onItemClick and navigate to PDF_EDITOR_VIEW', () => {
    const element = instance.container.findByType(NativeView)
    fireEvent(element, 'onItemClick', { nativeEvent: {SelectedPDF: 'abc.pdf'} });
    expect(navigation.navigate).toHaveBeenCalled();
    expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.PDF_EDITOR_VIEW,{selectedPDF: 'abc.pdf'});
  });

  test('Should call NativeView onDownloadComplete and log the event', () => {
    const element = instance.container.findByType(NativeView)
    fireEvent(element, 'onDownloadComplete', { nativeEvent: {DownloadedPdf: { issueDate: '121212'}} });
    expect(recordLogEvent).toHaveBeenCalled();
  });

})