import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/Constants'
import { useNavigation } from '@react-navigation/native'
import { ArticleDetailScreen } from '../ArticleDetailScreen';
import { ArticleDetailDataType, HTMLElementParseStore, RelatedArticleDataType, RichHTMLType } from 'src/redux/articleDetail/types'
import { isIOS, normalize } from 'src/shared/utils/dimensions'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { useLogin } from 'src/hooks';
import { FlatList } from 'react-native'
import { ArticleDetailWidget, ShortArticle } from 'src/components/organisms'
import * as ArticleDetailSaga from 'src/redux/articleDetail/sagas';
import 'moment/locale/ar';

const sampleData = { params: { nid: '123', isRelatedArticle: true } };
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false,
  isTab: false
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: () => ([{ name: 'ArticleDetailScreen' }]),
  useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

jest.mock("src/hooks/useArticleDetail", () => ({
  useArticleDetail: () => {
    return {
      sendEventToServer: () => [],
    }
  },
}));

jest.mock("src/hooks/useAppCommon", () => ({
  useAppCommon: () => {
    return {
      articleFontSize: 20,
      storeArticleFontSizeInfo: () => [],
    }
  },
}));

jest.mock("src/hooks/useBookmark", () => ({
  useBookmark: () => {
    return {
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
      removeBookmarkedInfo: () => [],
      validateBookmark: () => true,
    }
  },
}));

jest.mock('src/hooks/useLogin', () => ({ useLogin: jest.fn() }));

jest.mock("src/hooks/useAppPlayer", () => ({
  useAppPlayer: () => {
    return {
      showMiniPlayer: true,
      selectedTrack: {
        id: 1,
        artwork: 'abc.com'
      },
    }
  },
}));

jest.mock('src/services/articleDetailService', () => ({
  requestArticleDetail: () => {
    return sampleData1
  }
}));

jest.mock('react-native-orientation-locker', () => {
  return {
    lockToLandscape: jest.fn(),
    lockToPortrait: jest.fn(),
    getAutoRotateState: jest.fn(),
    addDeviceOrientationListener: jest.fn(),
    removeDeviceOrientationListener: jest.fn(),
    unlockAllOrientations: jest.fn(),
    getDeviceOrientation: jest.fn(),
  };
});

const richHTMLMock: HTMLElementParseStore[] = [
  {
    type: RichHTMLType.READ_ALSO,
    data: {
      id: 'string',
      type: 'string',
      bundle: 'string',
      related_content: ['123'],
      title: 'title',
      readAlsoData: [{ title: '123' }]
    }
  }
]

const sampleData1: ArticleDetailDataType[] = [
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
    isBookmarked: true,
    caption: 'example',
    subtitle: 'example',
    jwplayerId: '12',
    created:  '',
    journalistCity: [],
    journalistId: [],
    journalistName: [],
    richHTML: richHTMLMock,
    publishedDate: '',
    shortUrl: 'www.example.com',
    link_node: 'www.example.com',
    scribbleLiveId: '123',
  },
];

const sampleData3: RelatedArticleDataType[] = [
  {
    isBookmarked: true,
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
    created: '',
  },
];

describe('<ArticleDetailScreen>', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const navigation = {
    push: mockFunction,
    navigate: mockFunction,
    pop: mockFunction,
  }
  const useLoginMock = mockFunction
  const isLoading = mockFunction

  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);
    (useState as jest.Mock).mockImplementation(() => [true, isLoading]);
    useLoginMock.mockReturnValue({
      isLoggedIn: false,
    });
    const component =
      <Provider store={storeSampleData}>
        <ArticleDetailScreen route={sampleData} />
      </Provider>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  test('Should render component', () => {
    DeviceTypeUtilsMock.isTab = true;
    DeviceTypeUtilsMock.isIOS = true;
    expect(instance).toBeDefined()
  })

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

  it('should render ArticleDetailScreen component', () => {
    expect(render(<ArticleDetailScreen route={{ params: { nid: '123', isRelatedArticle: false } }} />)).toBeDefined();
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

});

describe('<< With Valid Article Detail >>', () => {
  let instance: RenderAPI;
  const mockFunction = jest.fn();
  const articleDetailState = mockFunction;
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
    (useState as jest.Mock).mockImplementation(() => [sampleData1, articleDetailState]);

    const component =
      <Provider store={storeSampleData}>
        <ArticleDetailScreen route={sampleData} />
      </Provider>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  test('Should call FlatList keyExtractor', () => {
    const element = instance.container.findByType(FlatList)
    fireEvent(element, 'keyExtractor', '', 2);
    expect(element).toBeDefined()
  });

  test('Should call FlatList onViewableItemsChanged', () => {
    const element = instance.container.findByType(FlatList)
    const item = {title: '',author: '',publishedDate: '',tagTopicsList: [],body: ''}
    fireEvent(element, 'onViewableItemsChanged', { changed: [{ index: 0, item }] });
  });

  test('Test ArticleDetailWidget setMiniPlayerVisible', () => {
    const element = instance.container.findAllByType(ArticleDetailWidget)[0];
    fireEvent(element, 'setMiniPlayerVisible', true)
  })

  test('Test ArticleDetailWidget onChangeFullScreen', () => {
    const element = instance.container.findAllByType(ArticleDetailWidget)[0];
    fireEvent(element, 'onChangeFullScreen', true)
  })
})

describe('<ArticleDetailScreen>', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const navigation = {
    push: mockFunction,
    navigate: mockFunction,
    pop: mockFunction,
  }

  const isEdgePortrait = mockFunction
  const useLoginMock = mockFunction

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);

    (useState as jest.Mock).mockImplementation(() => [true, isEdgePortrait]);

    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    const component =
      <Provider store={storeSampleData}>
        <ArticleDetailScreen route={sampleData} />
      </Provider>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  test('Should render component', () => {
    expect(instance).toBeDefined()
  })

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

  it('should render ArticleDetailScreen component', () => {
    expect(render(<ArticleDetailScreen route={{ params: { nid: '123', isRelatedArticle: false } }} />)).toBeDefined();
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

})

describe('<ArticleDetailScreen Related Article Test>', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();
  const navigation = {
    push: mockFunction,
    navigate: mockFunction,
    pop: mockFunction,
  }

  const relatedArticleState = mockFunction
  const useLoginMock = mockFunction

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);

    (useState as jest.Mock).mockImplementation(() => [sampleData3, relatedArticleState]);
    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    const component =
      <Provider store={storeSampleData}>
        <ArticleDetailScreen route={sampleData} />
      </Provider>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  test('### Test onPress event for Related Article', () => {
    const element = instance.container.findAllByType(ShortArticle)[0];
    fireEvent(element, 'onPress', '123')
  })

  test('Test onPress event for Related Article with different nid', () => {
    const element = instance.container.findAllByType(ShortArticle)[0];
    fireEvent(element, 'onPress', '321')
  })
})


describe('should call parseArticleDetailSuccess', () => {
  let instance: RenderAPI
  const mockFunction = jest.fn();

  const responseFromParseArticleDetailSuccess = {
    articleDetailData: [{
      title: 'title',
      body: 'body',
      nid: '32',
      image: 'image',
      view_node: 'viewNode',
      news_categories: {
        id: 'id',
        title: 'title',
        url: 'url',
        bundle: 'string',
        name: 'string',
      },
      tag_topics: {
        id: 'id',
        title: 'title',
        url: 'url',
        bundle: 'string',
        name: 'string',
      },
      author: 'author',
      isBookmarked: true,
      caption: 'string',
      subtitle: 'subTitle',
      jwplayerId: 'string',
      journalistId: ['journalistId1'],
      journalistName: ['journalistName'],
      journalistCity: ['journalistCity'],
      shortUrl: 'shortURL',
      scribbleLiveId: 'scribbleLiveId',
      created:  '',
      link_node: 'linkNode',
      publishedDate: '',
    }],
    pager:{
      current_page: 34,
      items_per_page: 23
    }
  }
  const navigation = {
    push: mockFunction,
    navigate: mockFunction,
    pop: mockFunction,
  }

  const isEdgePortrait = mockFunction
  const useLoginMock = mockFunction

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
    (useLogin as jest.Mock).mockImplementation(useLoginMock);

    (useState as jest.Mock).mockImplementation(() => [true, isEdgePortrait]);

    useLoginMock.mockReturnValue({
      isLoggedIn: true,
    });
    const component =
      <Provider store={storeSampleData}>
        <ArticleDetailScreen route={sampleData} />
      </Provider>
    instance = render(component)
  })

  afterEach(() => {
    jest.clearAllMocks()
    instance.unmount()
  })

  it("test parseArticleDetailSuccess method", () => {
    const spy = jest.spyOn(ArticleDetailSaga, 'parseArticleDetailSuccess').mockReturnValue(responseFromParseArticleDetailSuccess);
    ArticleDetailSaga.parseArticleDetailSuccess(34);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(34);
  });

})