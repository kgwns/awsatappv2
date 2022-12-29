import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { AnimatedHeader } from 'src/components/atoms/animatedHeader/AnimatedHeader';


describe('<AnimatedHeader>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const sampleData = {interpolate: jest.fn()}

  describe('when AnimatedHeader only', () => {
    beforeEach(() => {
      const component = (
        <AnimatedHeader scrollY={sampleData} />
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
      expect(mockFunction).toBeTruthy();
    });
    test('Should call Article onPress', () => {
      const element = instance.getByTestId('animatedHeaderRightID');
      fireEvent(element, 'onPress');
      expect(mockFunction).toBeTruthy();
    });
  });
});


