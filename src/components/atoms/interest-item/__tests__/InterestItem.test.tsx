import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';

import {InterestItem} from 'src/components/atoms/interest-item/InterestItem';

describe('<InterestItem>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  describe('when InterestItem only', () => {
    beforeEach(() => {
      const component = (
        <InterestItem title="name" imageUrl="imageurl" onPress={mockFunction} />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render InterestItem', () => {
      expect(instance).toBeDefined();
    });

    it('When InterestItem is pressed', () => {
      const interestItemButton = instance.getByTestId('interestItemBtn');

      fireEvent(interestItemButton, 'onPress');
      expect(mockFunction).toHaveBeenCalled();
    });
  });
});
