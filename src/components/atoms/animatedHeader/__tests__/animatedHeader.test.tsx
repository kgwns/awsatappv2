import { useNavigation } from '@react-navigation/native';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { AnimatedHeader } from 'src/components/atoms/animatedHeader/AnimatedHeader';
import { isDarkTheme } from 'src/shared/utils';

jest.mock("src/shared/utils/utilities", () => ({
  ...jest.requireActual('src/shared/utils/utilities'),
  isDarkTheme:jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<AnimatedHeader>', () => {
  let instance: RenderAPI;
  const sampleData = {interpolate: jest.fn()}
  const navigation = {
    dispatch: jest.fn(),
    navigate: jest.fn()
  }

  describe('AnimatedHeader renders when animated is true', () => {
    const isDarkThemeMock = jest.fn();
    beforeEach(() => {
      (isDarkTheme as jest.Mock).mockImplementation(isDarkThemeMock);
      isDarkThemeMock.mockReturnValueOnce(true).mockReturnValueOnce(false);
      (useNavigation as jest.Mock).mockReturnValue(navigation);
      const component = (
        <AnimatedHeader scrollY={sampleData} animated={true}/>
      );
      instance = render(component);
    });

    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount;
    });

    test('Should click search icon and navigate to SearchScreen', () => {
      const element = instance.getByTestId('onPressLeftIconId');
      fireEvent(element, 'onPress');
      expect(navigation.navigate).toHaveBeenCalled();
    });

    test('Should click menu icon and it toggles drawer', () => {
      const element = instance.getByTestId('onPressRightIconId');
      fireEvent(element, 'onPress');
      expect(navigation.dispatch).toHaveBeenCalled();
    });

    test("should display HeaderDarkLogoSvg in darkmode and not display the logo",() => {
      expect(instance.queryByTestId('headerDarkLogoId')).not.toBeNull();
      expect(instance.queryByTestId('headerLogoId')).toBeNull();
    })

    test("should display HeaderLogoSvg in lightMode and not display darkMode svg",() => {
      expect(instance.queryByTestId('headerLogoId')).not.toBeNull();
      expect(instance.queryByTestId('headerDarkLogoId')).toBeNull();
    })

    test("should not display non animated logo",() => {
      expect(instance.queryByTestId('logoId')).toBeNull();
    })

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

    test("should not display animated logo",() => {
      expect(instance.queryByTestId('headerDarkLogoId')).toBeNull();
      expect(instance.queryByTestId('headerLogoId')).toBeNull();
    })

    test("should display non animated logo",() => {
      expect(instance.queryByTestId('logoId')).not.toBeNull();
    })
  });
});


describe('AnimatedHeader, default rendering', () => {
  let instance: RenderAPI;
  const sampleData = {interpolate: jest.fn()}

  const isDarkThemeMock = jest.fn();
  beforeEach(() => {
    (isDarkTheme as jest.Mock).mockImplementation(isDarkThemeMock);
    isDarkThemeMock.mockReturnValueOnce(true).mockReturnValueOnce(false);
    const component = (
      <AnimatedHeader scrollY={sampleData} />
    );
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount;
  });
  test("should display HeaderDarkLogoSvg in darkmode and not display the logo",() => {
    expect(instance.queryByTestId('headerDarkLogoId')).not.toBeNull();
    expect(instance.queryByTestId('headerLogoId')).toBeNull();
  })

  test("should display HeaderLogoSvg in lightMode and not display darkMode svg",() => {
    expect(instance.queryByTestId('headerLogoId')).not.toBeNull();
    expect(instance.queryByTestId('headerDarkLogoId')).toBeNull();
  })
});

