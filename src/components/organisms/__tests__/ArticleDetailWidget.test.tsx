import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { ArticleDetailWidget } from 'src/components/organisms'
import { ArticleDetailDataType } from 'src/redux/articleDetail/types';

describe('<ArticleDetailWidget>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
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
                url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
                bundle: 'news_categories_bundle',
                name: 'news_categories_name'
            },
            author: 'author',
            tag_topics: {
                id: '1',
                title: 'asd',
                url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
                bundle: 'asd',
                name: 'qsd'
            },
            isBookmarked: false,
            caption: 'asd',
            subtitle: 'asdf',
            jwplayerId: '1',
            created: 'asxdc',
            scribbleLiveId:'24324'
        }

        const component = 
        <ArticleDetailWidget 
            articleData={data} 
            isRelatedArticle={true} 
            isFirstItem={false} 
            paused={false}
            setPlayerDetails={mockFunction}
            setMiniPlayerVisible={mockFunction}
            onChangeFullScreen={mockFunction}
            currentTime= 'any'
            isFullScreen= {true}
            playerVisible= {true}
        />
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


describe('<ArticleDetailWidget>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();

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
                url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
                bundle: 'news_categories_bundle',
                name: 'news_categories_name'
            },
            author: 'author',
            tag_topics: {
                id: '1',
                title: 'asd',
                url: 'http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/94842',
                bundle: 'asd',
                name: 'qsd'
            },
            isBookmarked: false,
            caption: 'asd',
            subtitle: 'asdf',
            jwplayerId: '1',
            created: 'asxdc'
        }

        const component = 
        <ArticleDetailWidget 
            articleData={data} 
            isFirstItem={false} 
            paused={false}
            setPlayerDetails={mockFunction}
            setMiniPlayerVisible={mockFunction}
            onChangeFullScreen={mockFunction}
            currentTime= 'any'
            isFullScreen= {true}
            playerVisible= {true}
        />
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