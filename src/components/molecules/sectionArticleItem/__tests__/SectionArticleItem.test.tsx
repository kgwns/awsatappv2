import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import SectionArticleItem from 'src/components/molecules/sectionArticleItem/SectionArticleItem';
import {moleculesTestID} from 'src/constants';

describe('<SectionArticleItem/>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const mockString = 'mock';

  describe('when SectionVideoFooter only', () => {
    beforeEach(() => {
      const component = <SectionArticleItem leftTitle={'test'} isBookmarked={false} onPressBookmark={mockFunction} body={mockString} nid={'2'}/>;
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
    it('Should go Article Detail Screen', () => {
      const element = instance.getByTestId('onPressTestID');
      fireEvent.press(element);
    });
  });
});
