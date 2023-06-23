import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {Image} from 'src/components/atoms/image/Image';
import { ImagesName } from 'src/shared/styles';
import { isDarkTheme } from 'src/shared/utils';

jest.mock("src/shared/utils/utilities", () => ({
  ...jest.requireActual('src/shared/utils/utilities'),
      isDarkTheme:jest.fn(),
}));

describe('<Image>', () => {
  let instance: RenderAPI;
  const IMAGE_SIZE = 40;
  const IMAGE_URL = 'https:www.abc.com/abc.png';
  const mockFunction = jest.fn();
  const isDarkThemeMock = jest.fn();

  beforeEach(() => {
    (isDarkTheme as jest.Mock).mockImplementation(isDarkThemeMock);
    isDarkThemeMock.mockReturnValue(true);

    const component = (
      <Image name={'bookmarkActive'} type="round" size={IMAGE_SIZE} fallback={true} fallbackName={ImagesName.placeholderImgName} />
    );
    instance = render(component);
  });

  it('should render component', () => {
    expect(instance).toBeDefined();
  });

  it('should Image name is bookmarkActive', () => {
    expect(instance.container.props.name).toBe('bookmarkActive');
  });

  it('should type is round', () => {
    expect(instance.container.props.type).toBe('round');
  });

  it('should size is 40', () => {
    expect(instance.container.props.size).toBe(IMAGE_SIZE);
  });

  describe('when Image render without type and size', () => {
    beforeEach(() => {
      const component = <Image name={'bookmarkActive'} />;
      instance = render(component);
    });

    it('Should render component', () => {
      expect(instance).toBeDefined();
    });
  });

  describe('when Image render with url', () => {
    beforeEach(() => {
      const component = <Image url={IMAGE_URL} />;
      instance = render(component);
    });

    it('Should render component', () => {
      expect(instance).toBeDefined();
    });
  });

  describe('when Image render without type and size', () => {
    beforeEach(() => {
      const component = <Image/>;
      instance = render(component);
    });

    test('Should call FastImage onError', () => {
      const element = instance.container.findByType(FastImage)
      fireEvent(element, 'onError');
      expect(mockFunction).toBeTruthy()
    });

    test('Should call FastImage onLoadEnd', () => {
      const element = instance.container.findByType(FastImage)
      fireEvent(element, 'onLoadEnd');
      expect(mockFunction).toBeTruthy()
    });
  });
});

describe('<Image>', () => {
  let instance: RenderAPI;
  const IMAGE_SIZE = 40;
  const mockFunction = jest.fn();
  const isDarkThemeMock = jest.fn();

  beforeEach(() => {
    (isDarkTheme as jest.Mock).mockImplementation(isDarkThemeMock);
    isDarkThemeMock.mockReturnValue(false);
    const component = (
        <Image type="round" size={IMAGE_SIZE} url=''/>
      );
      instance = render(component);
    });

    it('should render component', () => {
      expect(instance).toBeDefined();
    });

    it('should type is round', () => {
      expect(instance.container.props.type).toBe('round');
    });

    it('should size is 40', () => {
      expect(instance.container.props.size).toBe(IMAGE_SIZE);
    });

    test('Should call FastImage onError', () => {
      const element = instance.container.findByType(FastImage)
      fireEvent(element, 'onError');
      expect(mockFunction).toBeTruthy()
    });

    test('Should call FastImage onLoadEnd', () => {
      const element = instance.container.findByType(FastImage)
      fireEvent(element, 'onLoadEnd');
      expect(mockFunction).toBeTruthy()
    });
});
