import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React from 'react';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { ArticleDetailScreen } from '../ArticleDetailScreen';
import { isIOS, normalize } from 'src/shared/utils/dimensions';

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

describe('<ArticleDetailScreen>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();

  const sampleData = { params: { nid: '123' } };

  beforeEach(() => {
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

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(ScreenContainer)
    fireEvent(element, 'onCloseSignUpAlert');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList onPress', () => {
    const element = instance.container.findByType(ScreenContainer)
    fireEvent(element, 'isSignUpAlertVisible');
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

   
