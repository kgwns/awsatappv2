import ArticleGridView from "../ArticleGridView"
import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
const data = {
    body: 'body',
    title: 'title',
    nid: '324234',
    image: 'image',
    news_categories: 'NewsCategoriesType',
    author: 'author',
    created: 'string',
    isBookmarked: false,
    type: 'HomePageArticleType',
    blockName: 'string',
    position: 'string',
    displayType: 'string',
}
describe('Check ArticleGridView', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        const component = (
            <ArticleGridView data={data} showHighlightTitle={false} />
        );
        instance = render(component)
    })
    it("render component", () => {
        expect(instance).toBeDefined();
    })

})