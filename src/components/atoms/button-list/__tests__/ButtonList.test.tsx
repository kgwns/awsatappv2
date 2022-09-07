import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import {ButtonList} from 'src/components/atoms/button-list/ButtonList';
import { ImagesName } from 'src/shared/styles';

describe('<ButtonList>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const mockString = 'mockString';
  describe('when ButtonList only', () => {
    beforeEach(() => {
      const component = (
        <ButtonList title={mockString} showIcon={true} onPress={mockFunction} onPressIcon={mockFunction} iconName={ImagesName.appleIcon} iconStyle={{ size: 16 }}/>
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

describe('<ButtonList>', () => {
  let instance: RenderAPI;
  const mockString = 'mockString';
  describe('when ButtonList only', () => {
    beforeEach(() => {
      const component = (
        <ButtonList title={mockString}/>
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

describe('<ButtonList>', () => {
  let instance: RenderAPI;
  const mockString = 'mockString';
  describe('when ButtonList only', () => {
    beforeEach(() => {
      const component = (
        <ButtonList title={mockString} showIcon={false}/>
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
