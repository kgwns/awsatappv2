import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import SectionVideoFooter from 'src/components/molecules/SectionVideoFooter/SectionVideoFooter';

describe('<SectionVideoFooter/>', () => {
  let instance: RenderAPI;
  // Test Data
  const mockString = 'mockString';
  const addBookMark = true;
  describe('when SectionVideoFooter only', () => {
    beforeEach(() => {
      const component = (
        <SectionVideoFooter leftTitle={mockString} addBookMark={addBookMark} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render SectionVideoFooter', () => {
      expect(instance).toBeDefined();
    });
    it('Should Press BookMark', () => {
      const element = instance.getByTestId('bookmarkTestId');
      fireEvent.press(element);
    });
  });
});
