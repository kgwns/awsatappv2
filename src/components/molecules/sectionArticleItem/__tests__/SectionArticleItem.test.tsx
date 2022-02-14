import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import  SectionArticleItem from 'src/components/molecules/sectionArticleItem/SectionArticleItem'

describe('<SectionArticleItem/>', () => {
  let instance: RenderAPI;
  // Test Data
  describe('when SectionVideoFooter only', () => {
    beforeEach(() => {
      const component = (
        <SectionArticleItem
          leftTitle={'test'}
        />
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
  });
});