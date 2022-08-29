import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import React, { useState } from 'react';
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer';
import { ArticleDetailScreen } from '../ArticleDetailScreen';
import { isIOS, normalize } from 'src/shared/utils/dimensions';
import { VideoPlayerControl } from 'src/components/molecules';
import { FlatList } from 'react-native';
import { ArticleDetailDataType, RelatedArticleDataType } from 'src/redux/articleDetail/types';
import { ArticleDetailWidget, ShortArticle } from 'src/components/organisms';
import {useNavigation} from '@react-navigation/native';

const sampleData1: ArticleDetailDataType[] =[
  {
    title: 'example',
    body: 'example',
    nid: '12',
    image: 'example',
    view_node: 'example',
    news_categories: {
      id: '1',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example'
    },
    tag_topics: {
      id: '12',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example'
    },
    author: 'example',
    isBookmarked: false,
    caption: 'example',
    subtitle: 'example',
    jwplayerId: '12',
    created: 'example'
  },
  {
    title: 'example',
    body: 'example',
    nid: '13',
    image: 'example',
    view_node: 'example',
    news_categories: {
      id: '1',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example'
    },
    tag_topics: {
      id: '13',
      title: 'example',
      url: 'example',
      bundle: 'example',
      name: 'example'
    },
    author: 'example',
    isBookmarked: false,
    caption: 'example',
    subtitle: 'example',
    jwplayerId: '13',
    created: 'example'
  },
];

const sampleData3: RelatedArticleDataType[] = [
  {
    isBookmarked: false,
    title: 'abc',
    body: 'body',
    nid: '12',
    image: 'abc',
    view_node: 'node',
    news_categories: {
      id: '1',
      title: 'qbc',
      url: 'url',
      bundle: 'bundle',
      name: 'name'
    },
    author: 'author',
    created: '23/10/2021'
  },
  {
    isBookmarked: false,
    title: 'abc',
    body: 'body',
    nid: '122',
    image: 'abc',
    view_node: 'node',
    news_categories: {
      id: '12',
      title: 'qbc',
      url: 'url',
      bundle: 'bundle',
      name: 'name'
    },
    author: 'author',
    created: '23/10/2021'
  },
];

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock("src/hooks/useArticleDetail", () => ({
  useArticleDetail: () => {
    return {
      isLoading: false,
      articleDetailData: [],
      articleError: 'example',
      relatedArticleData: sampleData3,
      fetchArticleDetail: () => [],
      fetchRelatedArticle: () => [],
      emptyAllData: () => [],
      isArticleSectionLoaded: true,
      sendEventToServer: () => [],
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
      error: 'example',
      bookmarkIdInfo: [
        {
            nid: '1',
            bundle: 'string'
        },
        {
            nid: '2',
            bundle: 'string'
        }
    ],
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
      isLoggedIn: true,
      token: 'example',
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

const mockFunction = jest.fn();

const sampleData = { params: { nid: '123', isRelatedArticle: true } };

const isFullScreen = jest.fn()
const isEdgeUpdated = jest.fn()
const articleDetailState = jest.fn()
const relatedArticleState = jest.fn()
const setShowVideoMiniPlayer = jest.fn()

describe('<ArticleDetailScreen>', () => {
  let instance: RenderAPI;
  const navigation = {
    push: mockFunction,
    navigate: mockFunction,
    pop: mockFunction,
  }

  describe('when ArticleDetailScreen only', () => {
    beforeEach(() => {
      (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
      (useState as jest.Mock).mockImplementation(() => [false, isFullScreen]);
      (useState as jest.Mock).mockImplementation(() => [true, isEdgeUpdated]);
      (useState as jest.Mock).mockImplementation(() => [true, setShowVideoMiniPlayer]);
      (useState as jest.Mock).mockImplementation(() => [sampleData3, relatedArticleState]);
      (useState as jest.Mock).mockImplementation(() => [sampleData1, articleDetailState]);
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
    const element = instance.container.findAllByType(VideoPlayerControl)[0]
    fireEvent(element, 'setPlayerDetails', '23/10/2022', true);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList onScroll', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'onScroll', {nativeEvent: {contentOffset: {y: 120}}});
    expect(mockFunction).toBeTruthy()
  });

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'keyExtractor', 'example', 2);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call ShortArticle onUpdateBookmark', () => {
    const element = instance.container.findByType(ShortArticle)
    fireEvent(element, 'onUpdateBookmark', '122', true);
    expect(mockFunction).toBeTruthy()
  });

  test('Should call ShortArticle onPress', () => {
    const element = instance.container.findByType(ShortArticle)
    fireEvent(element, 'onPress', '122');
    expect(mockFunction).toBeTruthy()
    expect(navigation.push).toBeTruthy()
  });

  test('Should call ShortArticle showSignUpPopUp', () => {
    const element = instance.container.findByType(ShortArticle)
    fireEvent(element, 'showSignUpPopUp');
    expect(mockFunction).toBeTruthy()
  });

  test('Should call ArticleDetailWidget setMiniPlayerVisible', () => {
    const element = instance.container.findAllByType(ArticleDetailWidget)[0]
    fireEvent(element, 'setMiniPlayerVisible');
    expect(setShowVideoMiniPlayer).toBeTruthy()
  });

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

   
