import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { PopulateWidget, PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';
import { moleculesTestID } from 'src/constants';

describe('<PopulateWidget/>', () => {
  let instance: RenderAPI;

  const sampleArticleData: any = {
    image: 'image',
    nid: 'nid',
    author: 'author',
    created: 'created'
  }

  const mockOnPressBookmark = jest.fn()

  describe('when article data only', () => {
    beforeEach(() => {
      const component = <PopulateWidget type={PopulateWidgetType.ARTICLE} props={sampleArticleData}
        onPressBookmark={mockOnPressBookmark} />;
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render SectionVideoFooter', () => {
      expect(instance).toBeDefined();
    });

    it('Should Press bookMark', () => {
      const element = instance.getByTestId(moleculesTestID.storySaveBtn);
      fireEvent.press(element);
    });
  });

  describe('when empty data only', () => {
    beforeEach(() => {
      const component = <PopulateWidget props={null}
        onPressBookmark={mockOnPressBookmark} />;
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render SectionVideoFooter', () => {
      expect(instance).toBeDefined();
    });
  });
});
