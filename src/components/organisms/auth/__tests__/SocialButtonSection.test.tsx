import {render, RenderAPI, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {SocialButtonSection} from '../SocialButtonSection';

describe('<SocialButtonSection>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn()
  const testData = [{testId:'signin_google'},{testId:'signin_apple'},{testId:'signin_facebook'}]
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
    xit.each(testData)('when onPree Social Buttons', ({ testId }) => {
      const testID = instance.getByTestId(testId);
      fireEvent(testID, 'onPress');
      expect(mockFunction).toHaveBeenCalled();
    })
  });
});
