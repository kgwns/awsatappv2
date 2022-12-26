import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';


import { ArchiveImage } from 'src/components/atoms/archiveImage/ArchiveImage';


describe('<ArchiveImage>', () => {
  let instance: RenderAPI;

  describe('when ArchiveImage only', () => {
    beforeEach(() => {
      const component = (
        <ArchiveImage image={'abc.png'} isAlbum={false} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render ArchiveImage', () => {
      expect(instance).toBeDefined();
    });
  });

  describe('when ArchiveImage only', () => {
    beforeEach(() => {
      const component = (
        <ArchiveImage image={'abc.png'} isAlbum={true} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render ArchiveImage', () => {
      expect(instance).toBeDefined();
    });
  });
});


