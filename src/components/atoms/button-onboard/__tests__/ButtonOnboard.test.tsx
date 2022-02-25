import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ButtonOnboard } from 'src/components/atoms/button-onboard/ButtonOnboard';

describe('<ButtonOnboard>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const mockString = 'mockButtonOnboard';
  describe('when ButtonOnboard only', () => {
    beforeEach(() => {
      const component = (
        <ButtonOnboard title={mockString} onPress={mockFunction} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render ButtonOnboard', () => {
      expect(instance).toBeDefined();
    });
  });
});
