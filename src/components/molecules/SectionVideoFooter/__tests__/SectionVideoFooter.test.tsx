import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import SectionVideoFooter from 'src/components/molecules/SectionVideoFooter/SectionVideoFooter';

describe('<SectionVideoFooter/>', () => {
  let instance: RenderAPI;
  // Test Data
  const mockFunction = jest.fn();
  const mockString = 'mockString';
  const addBookMark = true;
  describe('when SectionVideoFooter only', () => {
    beforeEach(() => {
      const component = (
        <SectionVideoFooter leftTitle={mockString} rightDate={mockString} addBookMark={addBookMark} isBookmarked={true} onPressBookmark={mockFunction} />
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

describe('<SectionVideoFooter/>', () => {
  let instance: RenderAPI;
  // Test Data
  const mockFunction = jest.fn();
  const mockString = 'mockString';
  const addBookMark = true;
  describe('when SectionVideoFooter only', () => {
    beforeEach(() => {
      const component = (
        <SectionVideoFooter leftViews={mockString} rightTitle={mockString} addBookMark={addBookMark} isBookmarked={true} onPressBookmark={mockFunction} />
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

describe('<SectionVideoFooter/>', () => {
  let instance: RenderAPI;
  // Test Data
  const mockFunction = jest.fn();
  const mockString = 'mockString';
  const addBookMark = true;
  describe('when SectionVideoFooter only', () => {
    beforeEach(() => {
      const component = (
        <SectionVideoFooter leftTitle={mockString} addBookMark={addBookMark} isBookmarked={false} onPressBookmark={mockFunction} />
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
