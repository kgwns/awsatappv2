import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {SocialButtonSection} from '../SocialButtonSection';

describe('<SocialButtonSection>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn()
  describe('when SocialButtonSection only', () => {
    beforeEach(() => {
      const component = <SocialButtonSection onButtonPress={mockFunction} />;
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render SocialButtonSection', () => {
      expect(instance).toBeDefined();
    });
    it('when onPree Social Buttons', () => {
      const testID = instance.getByTestId('signin_facebook');
      fireEvent(testID, 'onPress');
      expect(mockFunction).toHaveBeenCalled();
    })
    it('when onPree Social Buttons', () => {
      const testID = instance.getByTestId('signin_google');
      fireEvent(testID, 'onPress');
      expect(mockFunction).toHaveBeenCalled();
    })
  });
});
