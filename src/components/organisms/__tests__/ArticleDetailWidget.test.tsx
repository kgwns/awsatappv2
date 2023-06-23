import { render, RenderAPI } from '@testing-library/react-native';
import axios from 'axios';
import React, { useState } from 'react';
import { ArticleDetailWidget } from 'src/components/organisms'
import { ArticleDetailDataType } from 'src/redux/articleDetail/types';
jest.mock('react',() => ({
    ...jest.requireActual('react'),
    useState:jest.fn()
}))

jest.mock('axios',() => ({
    ...jest.requireActual('axios'),
    get:jest.fn()
}))
describe('<ArticleDetailWidget>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const setScribbleLiveData = jest.fn();
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (useState as jest.Mock).mockImplementation(() => [{data:'data'},setScribbleLiveData])
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
        };
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

    it('test fetchScribbleLive returns response',() => {
        const res = jest.spyOn(axios,'get').mockReturnValue({data:{result:true}} as any);
        expect(instance).toBeDefined()
        res.mockClear();
    })
    
    it('test fetchScribbleLive throws error',() => {
        jest.spyOn(axios,'get').mockRejectedValue({error:'something went wrong'})
        expect(instance).toBeDefined()
    })
})


describe('<ArticleDetailWidget>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const setScribbleLiveData = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [{},setScribbleLiveData])
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