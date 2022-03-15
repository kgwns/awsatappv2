import {render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import SplashNavigation from '../SplashNavigation';
import {useDispatch, useSelector} from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));


jest.mock("src/hooks/useBookmark", () => ({
  useBookmark: (...args: any) => {
      return {
        isLoading: true,
        bookMarkSuccessInfo: {},
        error: '',
        getBookmarkedId: () => []
      }
  },
}));


describe('<SplashNavigation>', () => {
  let instance: RenderAPI;
  const dispatchMock = jest.fn();
  const theme = true;
  const useColorScheme = jest.fn().mockReturnValueOnce(theme);

  describe('when SplashNavigation only', () => {
    beforeEach(() => {
      (useSelector as jest.Mock).mockImplementationOnce(useColorScheme);
      (useDispatch as jest.Mock).mockReturnValueOnce(dispatchMock);
      const component = <SplashNavigation />
      instance = render(component);
    });
    afterEach(() => {
      jest.clearAllMocks();
      instance.unmount();
    });
    xit('Should render SplashNavigation', () => {
      expect(instance).toBeDefined();
    });
  });
});
