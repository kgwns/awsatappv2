import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { AnimatedHeader } from 'src/components/atoms/animatedHeader/AnimatedHeader';
import { isDarkTheme } from 'src/shared/utils';

jest.mock("src/shared/utils/utilities", () => ({
  ...jest.requireActual('src/shared/utils/utilities'),
      isDarkTheme:jest.fn(),
}));
describe('<AnimatedHeader>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const sampleData = {interpolate: jest.fn()}

  describe('AnimatedHeader renders when animated is true', () => {
    const isDarkThemeMock = jest.fn();
    beforeEach(() => {
        (isDarkTheme as jest.Mock).mockImplementation(isDarkThemeMock);
    isDarkThemeMock.mockReturnValue(true);
      const component = (
        <AnimatedHeader scrollY={sampleData} animated={true}/>
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
      const element = instance.getByTestId('onPressLeftIconId');
      fireEvent(element, 'onPress');
      expect(mockFunction).toBeTruthy();
    });
    test('Should call Article onPress', () => {
      const element = instance.getByTestId('onPressRightIconId');
      fireEvent(element, 'onPress');
      expect(mockFunction).toBeTruthy();
    });
  });

  describe('AnimatedHeader renders when animated is false', () => {
    beforeEach(() => {
      const component = (
        <AnimatedHeader scrollY={sampleData} animated={false}/>
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
      const element = instance.getByTestId('onPressLeftIconId');
      fireEvent(element, 'onPress');
      expect(mockFunction).toBeTruthy();
    });
    test('Should call Article onPress', () => {
      const element = instance.getByTestId('onPressRightIconId');
      fireEvent(element, 'onPress');
      expect(mockFunction).toBeTruthy();
    });
  });
});


describe('AnimatedHeader renders when animated is true', () => {
  let instance: RenderAPI;
  const sampleData = {interpolate: jest.fn()}

  const isDarkThemeMock = jest.fn();
  beforeEach(() => {
      (isDarkTheme as jest.Mock).mockImplementation(isDarkThemeMock);
  isDarkThemeMock.mockReturnValue(false);
    const component = (
      <AnimatedHeader scrollY={sampleData} animated={false}/>
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
});

