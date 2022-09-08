import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ButtonOutline } from 'src/components/atoms/button-outline/ButtonOutline';

describe('<ButtonOutline>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const mockString = 'mockButtonOutline';
  describe('when ButtonOutline only', () => {
    beforeEach(() => {
      const component = (
        <ButtonOutline title={mockString} onPress={mockFunction} isDisable={true} leftIcon={mockFunction} rightIcon={mockFunction}/>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render ButtonOutline', () => {
      expect(instance).toBeDefined();
    });
  });
});

describe('<ButtonOutline>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const mockString = 'mockButtonOutline';
  describe('when ButtonOutline only', () => {
    beforeEach(() => {
      const component = (
        <ButtonOutline title={mockString} onPress={mockFunction} isDisable={false}/>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render ButtonOutline', () => {
      expect(instance).toBeDefined();
    });
  });
});

describe('<ButtonOutline>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const mockString = 'mockButtonOutline';
  describe('when ButtonOutline only', () => {
    beforeEach(() => {
      const component = (
        <ButtonOutline title={mockString} onPress={mockFunction}/>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    it('Should render ButtonOutline', () => {
      expect(instance).toBeDefined();
    });
  });
});
