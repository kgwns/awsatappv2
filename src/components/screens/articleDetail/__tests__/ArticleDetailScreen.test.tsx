import React, { useState } from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { ArticleDetailScreen } from '../ArticleDetailScreen'

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }));

const mockUseLatestNewsTab = jest.fn();

jest.mock("src/hooks/useArticleDetail", () => ({
    useArticleDetail: (...args: any) => {
        return {
            isLoading: true,
            error: '',
            articleDetailData: [],
            pager: {},
            relatedArticleData: [],
            fetchArticleDetail: () => {
                return []
            },
            fetchRelatedArticle: () => {
                return []
            },
            emptyAllData: () => {
                return
            },
        }
    },
}));

jest.mock("src/hooks/useAppCommon", () => ({
    useAppCommon: (...args: any) => {
        return {
            theme: 'light',
            isFirstSession: true,
            articleFontSize: 16,
            storeArticleFontSizeInfo: () => {}
        }
    },
}));

describe('<ArticleDetailScreen>', () => {
    let instance: RenderAPI
    const setEdge = jest.fn();
    const setIsBookmarked = jest.fn();
    const setFontSize = jest.fn();
    const setPaused = jest.fn();
    const setShowPopUp = jest.fn();
    const setArticleDetail = jest.fn();
    const setRelatedArticle = jest.fn();
    const setOrientation = jest.fn();
    const setScrollY = jest.fn();
    const setPlayerUrl = jest.fn();
    const setPlayerVisible = jest.fn();
    const setCurrentTime = jest.fn();
    const setScrollEnabled = jest.fn();
    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [[], setEdge]);
        (useState as jest.Mock).mockImplementation(() => [false, setIsBookmarked]);
        (useState as jest.Mock).mockImplementation(() => [0, setFontSize]);
        (useState as jest.Mock).mockImplementation(() => [true, setPaused]);
        (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
        (useState as jest.Mock).mockImplementation(() => [[], setArticleDetail]);
        (useState as jest.Mock).mockImplementation(() => [[], setRelatedArticle]);
        (useState as jest.Mock).mockImplementation(() => ['', setOrientation]);
        (useState as jest.Mock).mockImplementation(() => [0, setScrollY]);
        (useState as jest.Mock).mockImplementation(() => ['', setPlayerUrl]);
        (useState as jest.Mock).mockImplementation(() => [false, setPlayerVisible]);
        (useState as jest.Mock).mockImplementation(() => [0, setCurrentTime]);
        (useState as jest.Mock).mockImplementation(() => [true, setScrollEnabled]);
        const component = 
            <Provider store={storeSampleData}>
                <ArticleDetailScreen route={{ params: { nid: 123 } }} />
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    xit('Should render component', () => {
        expect(instance).toBeDefined()
    })
})