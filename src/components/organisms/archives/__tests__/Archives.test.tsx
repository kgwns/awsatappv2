import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useRef, useState } from 'react';
import { Archives } from 'src/components/organisms'
import { FilterComponent, FilterDataType } from 'src/components/molecules';
import { storeSampleData } from 'src/constants/Constants';
import { Provider } from 'react-redux';
import { useBookmark } from 'src/hooks';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
    useRef: jest.fn()
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
    ...jest.requireActual('src/shared/utils/dimensions'),
    isTab: true,
}));


jest.mock("src/hooks/useBookmark", () => ({
    useBookmark: jest.fn()
}));

const bookmarkIdData = [
    {
        nid: '1',
        bundle: 'string'
    },
    {
        nid: '2',
        bundle: 'string'
    }
];

const bookmarkData = [
    {
        nid: '1',
        bundle: 'string',
        tid: '2'
    },
    {
        nid: '2',
        bundle: 'string',
        tid: '1'
    }
];

const defaultBookmarkValue = {
    isLoading: false,
    bookmarkLoading: false,
    isAllBookmarkFetched: false,
    canRefreshBookmarkDetail: true,
    filterBookmarkDetailInfo: [],
    bookMarkSuccessInfo: {},
    bookmarkDetail: [],
    error: 'example',
    bookmarkIdInfo: bookmarkIdData,
    sendBookmarkInfo: () => [],
    getBookmarkedId: () => [],
    getSpecificBundleFavoriteDetail: () => [],
    removeBookmarkedInfo: () => [],
    getBookmarkDetailData: () => [],
    removeBookmark: () => [],
    getSpecificBundleArticleCount: () => jest.fn(),
};

const filterData: FilterDataType[] = [
    {
        name: 'favorite.filters.everyone',
        isSelected: true
    },
    {
        name: 'favorite.filters.articles',
        isSelected: false
    },
    {
        name: 'favorite.filters.video',
        isSelected: false
    },
    {
        name: 'favorite.filters.opinion',
        isSelected: false
    },
    {
        name: 'favorite.filters.podcast',
        isSelected: false
    }
]

const filteredData = [
    {
        bookmarkedDetailInfo: ['video', 'game'],
        page: 10,
        bundle: 'multimedia'
    },
    {
        bookmarkedDetailInfo: ['video'],
        page: 30,
        bundle: 'multimedia'
    }
]

describe('Testing widgetNameByIndex method in <Archives>', () => {
    let instance: RenderAPI
    const setInitialLoading = jest.fn();
    const filterItem = jest.fn();
    const tabSelectedIndex = jest.fn();
    const filterItemData = jest.fn();
    const setFilteredData = jest.fn();
    const useBookmarkMock = jest.fn();
    const useRefMock = jest.fn();
    const bookmarkReturnValue = { ...defaultBookmarkValue };

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [false, setInitialLoading]);
        (useState as jest.Mock).mockImplementation(() => [0, tabSelectedIndex]);
        (useState as jest.Mock).mockImplementation(() => [filterData, filterItemData]);
        (useState as jest.Mock).mockImplementation(() => [filterData, filterItem]);
        (useState as jest.Mock).mockImplementation(() => [filteredData, setFilteredData]);
        (useBookmark as jest.Mock).mockImplementation(useBookmarkMock);
        useBookmarkMock.mockReturnValue(bookmarkReturnValue);
        (useRef as jest.Mock).mockImplementation(useRefMock);
        useRefMock.mockReturnValueOnce({
            current: false
        });
        const component =
            <Provider store={storeSampleData}>
                <Archives />
            </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Test filter item with index value 1', () => {
        const element = instance.container.findByType(FilterComponent)
        fireEvent(element, 'onPress', 1)
        expect(element).toBeTruthy()
    })
    it('Test filter item with index value 2', () => {
        const element = instance.container.findByType(FilterComponent)
        fireEvent(element, 'onPress', 2)
        expect(element).toBeTruthy()
    })
    it('Test filter item with index value 3', () => {
        const element = instance.container.findByType(FilterComponent)
        fireEvent(element, 'onPress', 3)
        expect(element).toBeTruthy()
    })
    it('Test filter item with index value 4', () => {
        const element = instance.container.findByType(FilterComponent)
        fireEvent(element, 'onPress', 4)
        expect(element).toBeTruthy()
    })
    it('Test filter item with index value 5', () => {
        const element = instance.container.findByType(FilterComponent)
        fireEvent(element, 'onPress', 5)
        expect(element).toBeTruthy()
    })
    it('Test filter item with index value 6 to check default value', () => {
        const element = instance.container.findByType(FilterComponent)
        fireEvent(element, 'onPress', 6)
        expect(element).toBeTruthy()
    })
})

describe('Testing filter component renders in <Archives>', () => {
    let instance: RenderAPI
    const setInitialLoading = jest.fn();
    const filterItem = jest.fn();
    const tabSelectedIndex = jest.fn();
    const filterItemData = jest.fn();
    const setFilteredData = jest.fn();
    const useBookmarkMock = jest.fn();
    const useRefMock = jest.fn();

    const bookmarkReturnValue = {
        ...defaultBookmarkValue,
        isLoading: false,
        bookmarkLoading: true,
        isAllBookmarkFetched: true,
        canRefreshBookmarkDetail: true,
        filterBookmarkDetailInfo: [],
        bookMarkSuccessInfo: {},
        bookmarkDetail: bookmarkData,
    }

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [true, setInitialLoading]);
        (useState as jest.Mock).mockImplementation(() => [0, tabSelectedIndex]);
        (useState as jest.Mock).mockImplementation(() => [filterData, filterItemData]);
        (useState as jest.Mock).mockImplementation(() => [filterData, filterItem]);
        (useState as jest.Mock).mockImplementation(() => [[], setFilteredData]);
        (useBookmark as jest.Mock).mockImplementation(useBookmarkMock);
        useBookmarkMock.mockReturnValue(bookmarkReturnValue);
        (useRef as jest.Mock).mockImplementation(useRefMock);
        useRefMock.mockReturnValueOnce({
            current: false
        });
        const component =
            <Provider store={storeSampleData}>
                <Archives />
            </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        DeviceTypeUtilsMock.isTab = false;
        (useRef as jest.Mock).mockImplementation(useRefMock);
        useRefMock.mockReturnValueOnce({
            current: true
        });
        expect(instance).toBeDefined()
    })

    it('Test filter item with index value 0', () => {
        const element = instance.container.findByType(FilterComponent)
        fireEvent(element, 'onPress', 0)
        expect(element).toBeTruthy()
    })
    it('Test filter item with index value 1', () => {
        const element = instance.container.findByType(FilterComponent)
        fireEvent(element, 'onPress', 1)
        expect(element).toBeTruthy()
    })
    it('Test filter item with index value 2', () => {
        const element = instance.container.findByType(FilterComponent)
        fireEvent(element, 'onPress', 2)
        expect(element).toBeTruthy()
    })
    it('Test filter item with index value 3', () => {
        const element = instance.container.findByType(FilterComponent)
        fireEvent(element, 'onPress', 3)
        expect(element).toBeTruthy()
    })
    it('Test filter item with index value 4', () => {
        const element = instance.container.findByType(FilterComponent)
        fireEvent(element, 'onPress', 4)
        expect(element).toBeTruthy()
    })
    it('Test filter item with index value 5', () => {
        const element = instance.container.findByType(FilterComponent)
        fireEvent(element, 'onPress', 5)
        expect(element).toBeTruthy()
    })


})


describe('Test returnItems', () => {
    let instance: RenderAPI
    const setInitialLoading = jest.fn();
    const filterItem = jest.fn();
    const tabSelectedIndex = jest.fn();
    const filterItemData = jest.fn();
    const setFilteredData = jest.fn();
    const useBookmarkMock = jest.fn();
    const useRefMock = jest.fn();

    const bookmarkReturnValue = {
        ...defaultBookmarkValue,
        isLoading: false,
        bookmarkLoading: true,
        isAllBookmarkFetched: true,
        canRefreshBookmarkDetail: true,
        filterBookmarkDetailInfo: [],
        bookMarkSuccessInfo: {},
        bookmarkDetail: {
            data: bookmarkData
        },
    }

    beforeEach(() => {
        DeviceTypeUtilsMock.isTab = true;
        (useState as jest.Mock).mockImplementation(() => [true, setInitialLoading]);
        (useState as jest.Mock).mockImplementation(() => [0, tabSelectedIndex]);
        (useState as jest.Mock).mockImplementation(() => [filterData, filterItemData]);
        (useState as jest.Mock).mockImplementation(() => [filterData, filterItem]);
        (useState as jest.Mock).mockImplementation(() => [[], setFilteredData]);
        (useBookmark as jest.Mock).mockImplementation(useBookmarkMock);
        useBookmarkMock.mockReturnValue(bookmarkReturnValue);
        (useRef as jest.Mock).mockImplementation(useRefMock);
        useRefMock.mockReturnValueOnce({
            current: false
        });
        const component =
            <Provider store={storeSampleData}>
                <Archives />
            </Provider>
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


describe("should call Dynamic Widget", () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const useRefMock = jest.fn();
    beforeEach(() => {
        DeviceTypeUtilsMock.isTab = false;
        (useRef as jest.Mock).mockImplementation(useRefMock);
        useRefMock.mockReturnValueOnce({
            current: false
        });
        const component =
            <Provider store={storeSampleData}>
                <Archives />
            </Provider>
        instance = render(component)
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it("should render component", () => {
        (useState as jest.Mock).mockImplementationOnce(() => [filteredData, mockFunction]).mockImplementationOnce(() => [false, mockFunction]);
        expect(instance).toBeDefined();
    })

})