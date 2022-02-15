import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ArticleDetailWidget } from 'src/components/organisms'
import { ArticleDetailDataType } from '~/redux/articleDetail/types';

describe('<ArticleDetailWidget>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const data: ArticleDetailDataType = {
            title: 'title',
            body: 'body',
            nid: 'nid',
            image: 'image',
            view_node: 'view_node',
            news_categories: {
                title: 'news_categories_title',
                id: 'news_categories_id',
                url: 'news_categories_url',
                bundle: 'news_categories_bundle',
                name: 'news_categories_name'
            },
            author: 'author'
        }

        const component = <ArticleDetailWidget articleData={data }/>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })
})