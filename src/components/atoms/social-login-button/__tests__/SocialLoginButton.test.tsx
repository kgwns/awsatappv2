import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';

import {SocialLoginButton} from 'src/components/atoms/social-login-button/SocialLoginButton';

describe('<SocialLoginButton>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  describe('when SocialLoginButton only', () => {
    beforeEach(() => {
      const component = (
        <SocialLoginButton label={'testLabel'} onPress={mockFunction} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render SocialLoginButton', () => {
      expect(instance).toBeDefined();
    });
  });
});
