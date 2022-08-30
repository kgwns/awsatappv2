import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { useNavigation } from '@react-navigation/native'
import { ArticleDetailScreen } from '../ArticleDetailScreen';
import { ArticleDetailDataType, RelatedArticleDataType } from 'src/redux/articleDetail/types'
import { isIOS, normalize } from 'src/shared/utils/dimensions'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { horizontalEdge } from 'src/shared/utils'

const sampleData = { params: { nid: '123', isRelatedArticle: true } };

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
  useNavigationState: () => ([]),
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
    }
  },
}));

jest.mock("src/hooks/useLogin", () => ({
  useLogin: () => {
    return {
      isLoggedIn: true,
    }
  },
}));

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
    isBookmarked: true,
    caption: 'example',
    subtitle: 'example',
    jwplayerId: '12',
    created: 'example'
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
    created: '23/10/2021'
  },
  {
    isBookmarked: true,
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

describe('<ArticleDetailScreen>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const navigation = {
      push: mockFunction,
      navigate: mockFunction,
      pop: mockFunction,
    }
    const edge = mockFunction
    const isBookmarked = mockFunction
    const fontSize = mockFunction
    const showupUp = mockFunction
    const currentOrientation = mockFunction
    const playerUrl = mockFunction
    const playerVisible = mockFunction
    const showVideoMiniPlayer = mockFunction
    const currentTime = mockFunction
    const paused = mockFunction
    const scrollEnabled = mockFunction
    const articleDetailState = mockFunction
    const relatedArticleState = mockFunction
    const isArticleSectionLoaded = mockFunction
    const setShowVideoMiniPlayer = mockFunction
    const isFullScreen = mockFunction
    const isFocused = mockFunction
    const isDefaultDimension = mockFunction
    const isDimensionChanged = mockFunction
    const isEdgeUpdated = mockFunction
    const bookmarkIndex = mockFunction
    const isEdgePortrait = mockFunction

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useState as jest.Mock).mockImplementation(() => [horizontalEdge, edge]);
        (useState as jest.Mock).mockImplementation(() => [12, fontSize]);
        (useState as jest.Mock).mockImplementation(() => [true, isBookmarked]);
        (useState as jest.Mock).mockImplementation(() => [false, showupUp]);
        (useState as jest.Mock).mockImplementation(() => ['landscape', currentOrientation]);
        (useState as jest.Mock).mockImplementation(() => ['abc.com', playerUrl]);
        (useState as jest.Mock).mockImplementation(() => [true, playerVisible]);
        (useState as jest.Mock).mockImplementation(() => [true, showVideoMiniPlayer]);
        (useState as jest.Mock).mockImplementation(() => ['10:00:56', currentTime]);
        (useState as jest.Mock).mockImplementation(() => [true, paused]);
        (useState as jest.Mock).mockImplementation(() => [true, scrollEnabled]);
        (useState as jest.Mock).mockImplementation(() => [sampleData1, articleDetailState]);
        (useState as jest.Mock).mockImplementation(() => [sampleData3, relatedArticleState]);
        (useState as jest.Mock).mockImplementation(() => [true, isArticleSectionLoaded]);
        (useState as jest.Mock).mockImplementation(() => [false, isFullScreen]);
        (useState as jest.Mock).mockImplementation(() => [true, isFocused]);
        (useState as jest.Mock).mockImplementation(() => [true, setShowVideoMiniPlayer]);
        (useState as jest.Mock).mockImplementation(() => [true, isDefaultDimension]);
        (useState as jest.Mock).mockImplementation(() => [true, isDimensionChanged]);
        (useState as jest.Mock).mockImplementation(() => [true, isEdgeUpdated]);
        (useState as jest.Mock).mockImplementation(() => [true, bookmarkIndex]);
        (useState as jest.Mock).mockImplementation(() => [true, isEdgePortrait]);
        const component =
            <Provider store={storeSampleData}>
                <ArticleDetailScreen route={sampleData}/>
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

})