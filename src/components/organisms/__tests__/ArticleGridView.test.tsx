import ArticleGridView from '../ArticleGridView';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from "react";
import { FlatList } from "react-native";
const data = [{
    body: 'body',
    title: 'title',
    nid: '324234',
    image: 'image',
    news_categories: 'NewsCategoriesType',
    author: 'author',
    created: 'string',
    isBookmarked: false,
    type: 'Album',
    blockName: 'string',
    position: 'string',
    displayType: 'string',
}]
describe('Check ArticleGridView should render component', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    beforeEach(() => {
        const component = (
            <ArticleGridView data={data} showHighlightTitle={true} showImage={true} />
        )
        instance = render(component)
    });
    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    })
    it('should render a component', () => {
        expect(instance).toBeDefined();
    })
    it('Should call FlatList renderItem', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'renderItem', { item: data[0], index: 0 });
        expect(mockFunction).toBeTruthy()
    });
    it('should call FlatList itemSeparatorComponent', () => {
        const testID = instance.container.findAllByType(FlatList)[0];
        fireEvent(testID, 'ItemSeparatorComponent');
        expect(mockFunction).toBeTruthy();
    });
    it('should onPress grid view',() => {
        const testId = instance.getByTestId('gridViewClick');
        fireEvent(testId,'onPress');
        expect(mockFunction).toBeTruthy();
    })
})

describe('Check ArticleGridView should return null when passing empty data', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    beforeEach(() => {
        const component = (
            <ArticleGridView data={{}} showHighlightTitle={true} showImage={true} />
        )
        instance = render(component)
    });
    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    })
    it('should render a component', () => {
        expect(instance).toBeDefined();
    })
})
