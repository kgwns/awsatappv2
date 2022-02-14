import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import SectionVideoFooter from 'src/components/molecules/SectionVideoFooter/SectionVideoFooter';

describe('<SectionVideoFooter/>', () => {
  let instance: RenderAPI;
  // Test Data
  describe('when SectionVideoFooter only', () => {
    beforeEach(() => {
      const component = (
        <SectionVideoFooter
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