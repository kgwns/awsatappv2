import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {PDFEditorView} from '../PDFEditorView';
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/Constants';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<PDFEditorView>', () => {
  let instance: RenderAPI;
  const navigation = {
    reset: jest.fn(),
    navigate: jest.fn(),
  }
  describe('when PDFEditorView only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      const component = (
        <Provider store={storeSampleData}>
          <PDFEditorView route={{params: {selectedPDF : { title: 'Title'}}}}  />
        </Provider>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render PDFEditorView', () => {
      expect(instance).toBeDefined();
    });
  });
});
