import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { ArticleDetailScreen } from '../ArticleDetailScreen'


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
            }
        }
    },
}));

describe('<ArticleDetailScreen>', () => {
    let instance: RenderAPI

    beforeEach(() => {
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

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })
})