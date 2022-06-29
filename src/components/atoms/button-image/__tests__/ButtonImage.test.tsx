import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';

import {ButtonImage} from 'src/components/atoms/button-image/ButtonImage';
import { ImagesName } from '../../../../shared/styles';

describe('<ButtonImage>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  describe('when ButtonImage only', () => {
    beforeEach(() => {
      const component = (
        <ButtonImage image={ImagesName.clock} onPress={mockFunction} testId={'PlayIconID'} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render ButtonImage', () => {
      expect(instance).toBeDefined();
    });

    it('When ButtonTab is pressed', () => {
      const testItemId = instance.getByTestId('PlayIconID');
      fireEvent(testItemId, 'onPress');
      expect(mockFunction).toHaveBeenCalled();
    });
  });
});
