import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React, { useState } from 'react';
import { Archives } from 'src/components/organisms'
import { FilterComponent, FilterDataType } from 'src/components/molecules';
import { storeSampleData } from 'src/constants/SampleData';
import { Provider } from 'react-redux';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

jest.mock("src/hooks/useBookmark", () => ({
    useBookmark: () => {
      return {
        isLoading: false,
        bookmarkLoading: false,
        isAllBookmarkFetched: true,
        canRefreshBookmarkDetail: true,
        filterBookmarkDetailInfo: [],
        bookMarkSuccessInfo: {},
        bookmarkDetail: [],
        error: 'example',
        bookmarkIdInfo: [
            {
                nid: '1',
                bundle: 'string'
            },
            {
                nid: '2',
                bundle: 'string'
            }
        ],
        sendBookmarkInfo: () => [],
        getBookmarkedId: () => [],
        getSpecificBundleFavoriteDetail: () => [],
        removeBookmarkedInfo: () => [],
        getBookmarkDetailData: () => [],
        removeBookmark: () => [],
      }
    },
}));

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

describe('<Archives>', () => {
    let instance: RenderAPI
    const setInitialLoading = jest.fn();
    const filterItem = jest.fn();
    const tabSelectedIndex = jest.fn();
    const filterItemData = jest.fn();

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [false, setInitialLoading]);
        (useState as jest.Mock).mockImplementation(() => [0, tabSelectedIndex]);
        (useState as jest.Mock).mockImplementation(() => [filterData, filterItemData]);
        (useState as jest.Mock).mockImplementation(() => [filterData, filterItem]);
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

    xit('should render component', () => {
        expect(instance).toBeDefined()
    })

    // it('Test Change filter item', () => {
    //     const element = instance.container.findByType(FilterComponent)
    //     fireEvent(element,'onPress',0)
    //     expect(element).toBeTruthy()
    // })
})