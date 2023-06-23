import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {ImageWithIcon} from 'src/components/atoms/ImageWithIcon/ImageWithIcon';

describe('<ImageWithIcon/>', () => {
  let instance: RenderAPI;
  const mockString = 'mockString';
  const mockFn = jest.fn();
  describe('when ImageWithIcon only', () => {
    beforeEach(() => {
      const component = (
        <GestureHandlerRootView>
          <ImageWithIcon bottomTag={mockString} onPress={mockFn} />
        </GestureHandlerRootView>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render ImageWithIcon', () => {
      expect(instance).toBeDefined();
    });
  });
});
