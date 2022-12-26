import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { AnimatedHeader } from 'src/components/atoms/animatedHeader/AnimatedHeader';
import { storeSampleData } from 'src/constants/Constants';


describe('<AnimatedHeader>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  describe('when AnimatedHeader only', () => {
    beforeEach(() => {
      const component = (
        <AnimatedHeader />
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount;
    });
    it('Should render AnimatedHeader', () => {
      expect(instance).toBeDefined();
    });

    test('Should call Article onPress', () => {
      const element = instance.getByTestId('animatedHeaderID');
      fireEvent(element, 'onPress');
      expect(mockFunction).toBeCalled();
    });
  });
});


