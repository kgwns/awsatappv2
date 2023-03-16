import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { PodcastProgramHeader } from 'src/components/molecules/podcast/PodcastProgramHeader';

describe('<PodcastProgramHeader>', () => {
  let instance: RenderAPI;

  describe('when PodcastProgramHeader only', () => {
    beforeEach(() => {
      const component = (
          <PodcastProgramHeader />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render PodcastProgramHeader', () => {
      expect(instance).toBeDefined();
    });
  });
});
