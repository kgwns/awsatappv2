import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { VideoInfo } from '../VideoInfo';
import {videoTabData} from 'src/constants/SampleData';

describe('<VideoInfo>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  describe('when VideoInfo only', () => {
    beforeEach(() => {
      const component = (
          <VideoInfo data={videoTabData[0]} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });

    it('Should render VideoInfo', () => {
      expect(instance).toBeDefined();
    });

    it('When VideoInfoBOL1 is pressed', () => {
      const testItemId = instance.getByTestId('VideoInfoBOL1');
      fireEvent(testItemId, 'onPress', {nid:'0'});
      expect(mockFunction).toBeTruthy();
    });
    
  });
});
