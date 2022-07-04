import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';

import {ButtonList} from 'src/components/atoms/button-list/ButtonList';

describe('<ButtonList>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const mockString = 'mockString';
  describe('when ButtonList only', () => {
    beforeEach(() => {
      const component = (
        <ButtonList title={mockString} onPress={mockFunction} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render ButtonList', () => {
      expect(instance).toBeDefined();
    });
  });
});
