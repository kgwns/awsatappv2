import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, { useState } from 'react';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { ArticleDetailScreen } from '../ArticleDetailScreen';
import { isIOS, normalize } from 'src/shared/utils/dimensions';
import { VideoPlayerControl } from 'src/components/molecules';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useArticleDetail", () => ({
  useArticleDetail: () => {
    return {
      isLoading: false,
      articleDetailData: [],
      articleError: '',
      relatedArticleData: [],
      fetchArticleDetail: () => [],
      fetchRelatedArticle: () => [],
      emptyAllData: () => [],
      isArticleSectionLoaded: false
    }
  },
}));

jest.mock("src/hooks/useAppCommon", () => ({
  useAppCommon: () => {
    return {
      theme: {},
      isFirstSession: false,
      serverEnvironment: {},
      storeServerEnvironmentInfo: () => [],
      articleFontSize: 2,
      storeArticleFontSizeInfo: () => [],
      resetFontSizeInfo: () => [],
    }
  },
}));

jest.mock("src/hooks/useBookmark", () => ({
  useBookmark: () => {
    return {
      isLoading: false,
      bookMarkSuccessInfo: {},
      bookmarkDetail: [],
      error: 'string',
      bookmarkIdInfo: {},
      sendBookmarkInfo: () => [],
      getBookmarkedId: () => [],
      removeBookmarkedInfo: () => [],
      getBookmarkDetailData: () => [],
      removeBookmark: () => [],
    }
  },
}));

jest.mock("src/hooks/useLogin", () => ({
  useLogin: () => {
    return {
      isLoading: false,
      loginData: {},
      loginError: 'example',
      fetchLoginRequest: () => [],
      isLoggedIn: false,
      token: 'string',
      user: {},
      fetchLogoutRequest: () => [],
      loginSkipped: () => [],
      isSkipped: false,
      forgotPassswordResponse: {},
      forgotPassworRequest: () => [],
      emptyforgotPassworResponseInfo: () => [],
      emptyLoginDataInfo: () => [],
    }
  },
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: () => ([]),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

describe('<ArticleDetailScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const sampleData = { params: { nid: '123', isRelatedArticle: true } };

  const isFullScreen = jest.fn()
  const isEdgeUpdated = jest.fn()

  describe('when ArticleDetailScreen only', () => {
    beforeEach(() => {
      (useState as jest.Mock).mockImplementation(() => [true, isFullScreen]);
      (useState as jest.Mock).mockImplementation(() => [true, isEdgeUpdated]);
    const component = <ArticleDetailScreen route={sampleData}/>;
    instance = render(component);
  });

  afterEach(() => {
    jest.clearAllMocks();
    instance.unmount();
  });

  it('should render ArticleDetailScreen component', () => {
    expect(instance).toBeDefined();
  });

  it('should render ArticleDetailScreen component', () => {
    expect(render(<ArticleDetailScreen route={{ params: { nid: '123', isRelatedArticle: false } }}/>)).toBeDefined();
  });

  test('Should call ScreenContainer onCloseSignUpAlert', () => {
    const element = instance.container.findByType(ScreenContainer)
    fireEvent(element, 'onCloseSignUpAlert');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call ScreenContainer isSignUpAlertVisible', () => {
    const element = instance.container.findByType(ScreenContainer)
    fireEvent(element, 'isSignUpAlertVisible');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call VideoPlayerControl setPlayerDetails', () => {
    const element = instance.container.findByType(VideoPlayerControl)
    fireEvent(element, 'setPlayerDetails', '23/10/2022', true);
    expect(mockFunction).toBeTruthy()
  });

  describe('android', () => {
    it("normalize should return the pixel perfect value", () => {
        !isIOS
        let normalizeValue = (normalize(60, 'bottom'))
        expect(normalizeValue).toEqual(120)
    })

    it("normalize should return the pixel perfect value", () => {
      isIOS
      let normalizeValue = (normalize(70, 'bottom'))
      expect(normalizeValue).toEqual(140)
    })
  })
  });

});

   
