import ArchiveArticleSection from "../ArchiveArticleSection";
import { render, RenderAPI } from '@testing-library/react-native';
import React from 'react';
import { isDarkTheme } from "src/shared/utils";
const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
    ...jest.requireActual('src/shared/utils/dimensions'),
    isTab: false,
}));
const isDarkModeUtilsMock = jest.requireMock('src/shared/utils/utilities');
jest.mock('src/shared/utils/utilities', () => ({
    ...jest.requireActual('src/shared/utils/utilities'),
    TimeIcon: jest.fn(),
    isDarkMode: false
}))
jest.mock("src/shared/utils/utilities", () => ({
    ...jest.requireActual('src/shared/utils/utilities'),
        isDarkTheme:jest.fn(),
  }));
const data = [{
    title: 'title',
    type: 'HomePageArticleType',
    nid: '343422',
    body: 'string',
    image: 'string',
    created: 'string',
    author: 'author',
    publication_date: '9/12/2022',
    news_categories: 'NewsCategoriesType',
}]

describe('ArchiveArticleSection', () => {
    const isDarkThemeMock = jest.fn();
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    beforeEach(() => {
        (isDarkTheme as jest.Mock).mockImplementation(isDarkThemeMock);
        isDarkThemeMock.mockReturnValue(true);
        const component = (
            <ArchiveArticleSection data={data} onPress={mockFunction} />
        )
        instance = render(component)
    })
    it('should render component in Tab', () => {
        DeviceTypeUtilsMock.isTab = true
        isDarkModeUtilsMock.isDarkMode = true
        expect(instance).toBeDefined();
    })
    it('should render component', () => {
        DeviceTypeUtilsMock.isTab = false;
        isDarkModeUtilsMock.isDarkMode = false;
        expect(instance).toBeDefined();
    })
})

const dataAsObject = {
    title: 'title',
    type: 'HomePageArticleType',
    nid: '343422',
    body: 'string',
    image: 'string',
    created: 'string',
    author: 'author',
    publication_date: '9/12/2022',
    news_categories: 'NewsCategoriesType',
}

describe('ArchiveArticleSection returns null', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    beforeEach(() => {
        const component = (
            <ArchiveArticleSection data={dataAsObject} onPress={mockFunction} />
        )
        instance = render(component)
    })
    it('should render component', () => {
        expect(instance).toBeDefined();
    })
})

describe('ArchiveArticleSection', () => {
    const isDarkThemeMock = jest.fn();
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    beforeEach(() => {
        (isDarkTheme as jest.Mock).mockImplementation(isDarkThemeMock);
        isDarkThemeMock.mockReturnValue(false);
        const component = (
            <ArchiveArticleSection data={data} onPress={mockFunction} />
        )
        instance = render(component)
    })
    it('should render component', () => {
        expect(instance).toBeDefined();
    })
})