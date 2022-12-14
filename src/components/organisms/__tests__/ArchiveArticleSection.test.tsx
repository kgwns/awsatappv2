import ArchiveArticleSection from "../ArchiveArticleSection";
import {render, RenderAPI} from '@testing-library/react-native';
import React from "react";
const props = {
    data:{
        title: 'title',
        type: 'HomePageArticleType',
        nid: '343422',
        body: 'string',
        image: 'string',
        created: 'string',
        author: 'author',
        publication_date: '9/12/2022',
        news_categories: 'NewsCategoriesType',
    },
    title:'title',
    onPress:()=>{}
}
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false,
}));
describe("Check ArchiveArticleSection returns null",() => {
    let instance:RenderAPI
    beforeEach(()=>{
        DeviceTypeUtilsMock.isTab = true
        const component = (
            <ArchiveArticleSection props = {props} />
        )
        instance = render(component)
    })
    it('render ArchiveArticleSection',() => {
        expect(instance).toBeDefined();
    })
})

const propsData = {
    data:[
        {
            title: 'title',
            type: 'HomePageArticleType',
            nid: '343422',
            body: 'string',
            image: 'string',
            created: 'string',
            author: 'author',
            publication_date: '9/12/2022',
            news_categories: 'NewsCategoriesType',
        },
        {
            title: 'title1',
            type: 'HomePageArticleType1',
            nid: '3434223',
            body: 'string1',
            image: 'string1',
            created: 'string1',
            author: 'author1',
            publication_date: '9/12/2022',
            news_categories: 'NewsCategoriesType1',
        },
    ],
    title:'title',
    onPress:()=>{}

}
describe("Check ArchiveArticleSection returns ",() => {
    let instance:RenderAPI
    beforeEach(()=>{
        DeviceTypeUtilsMock.isTab = false
        const component = (
            <ArchiveArticleSection props = {propsData} />
        )
        instance = render(component)
    })
    it('render ArchiveArticleSection',() => {
        expect(instance).toBeDefined();
    })
})