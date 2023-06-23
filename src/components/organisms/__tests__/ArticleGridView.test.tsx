import { useNavigation } from '@react-navigation/native';
import ArticleGridView from '../ArticleGridView';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import React from "react";
import { FlatList } from "react-native";
import { ScreensConstants } from 'src/constants/Constants';
import { isTypeAlbum } from 'src/shared/utils';
import { GridViewItem } from 'src/components/molecules';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: false
}));

jest.mock('src/shared/utils/utilities',() => ({
    ...jest.requireActual('src/shared/utils/utilities'),
    isTypeAlbum: jest.fn(),
}))

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

const dataWithoutNid = [{
    body: 'body',
    title: 'title',
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

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

describe('Check ArticleGridView should render component', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const useNavigationMock = mockFunction;
    const isTypeAlbumMock = jest.fn();
    const navigation = {
        navigate: jest.fn()
    }
    beforeEach(() => {
        (useNavigation as jest.Mock).mockImplementation(useNavigationMock);
        (useNavigationMock).mockReturnValue(navigation);
        (isTypeAlbum as jest.Mock).mockImplementation(isTypeAlbumMock);
        isTypeAlbumMock.mockReturnValue(false);
        const component = (
            <GestureHandlerRootView>
                <ArticleGridView data={data} showHighlightTitle={true} showImage={true} />
            </GestureHandlerRootView>
        )
        instance = render(component)
    });
    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    })

    it("should display Divider in mobile device",() => {
        DeviceTypeUtilsMock.isTab = false;
        expect(instance.queryAllByTestId('dividerId')[0]).not.toBeNull();
    });

    it("should display 2 columns in mobile device",() => {
        DeviceTypeUtilsMock.isTab = false;
        const testId = instance.container.findByType(FlatList);
        expect(testId.props.numColumns).toEqual(2);
    })

    it('Should click Article Grid and navigate to ArticleDetailScreen', () => {
        const gridViewClickId = instance.getByTestId('gridViewClick');
        fireEvent(gridViewClickId, 'onPress');
        expect(navigation.navigate).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.ARTICLE_DETAIL_SCREEN,{nid: data[0].nid});
    });

    it('should call FlatList itemSeparatorComponent', () => {
        const testID = instance.container.findByType(FlatList);
        fireEvent(testID, 'ItemSeparatorComponent');
        expect(instance.queryAllByTestId('dividerId')[0]).not.toBeNull();
    });

    it("should display description(body) in 3 lines in mobile",() => {
        DeviceTypeUtilsMock.isTab = false;
        const element = instance.container.findByType(GridViewItem);
        expect(element.props.tabBodyLineCount).toBe(3);
    })


})

describe('Check ArticleGridView should render component', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const useNavigationMock = mockFunction;
    const isTypeAlbumMock = jest.fn();
    const navigation = {
        navigate: jest.fn()
    }
    beforeEach(() => {
        (useNavigation as jest.Mock).mockImplementation(useNavigationMock);
        (useNavigationMock).mockReturnValue(navigation);
        (isTypeAlbum as jest.Mock).mockImplementation(isTypeAlbumMock);
        isTypeAlbumMock.mockReturnValue(true);
        DeviceTypeUtilsMock.isTab = true;
    });
    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    })

    it('Should click Article Grid and navigate to PhotoGalleryDetailScreen', () => {
        const component = (
            <GestureHandlerRootView>
                <ArticleGridView data={data} showHighlightTitle={false} showImage={true} />
            </GestureHandlerRootView>
        )
        instance = render(component)
        const gridViewClickId = instance.getByTestId('gridViewClick');
        fireEvent(gridViewClickId, 'onPress');
        expect(navigation.navigate).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN,{nid: data[0].nid});
    });
    it('should not navigate to any screens when nid is empty', () => {
        const component = (
            <GestureHandlerRootView>
                <ArticleGridView data={dataWithoutNid} showHighlightTitle={true} showImage={true} />
            </GestureHandlerRootView>
        )
        instance = render(component)
        const gridViewClickId = instance.getByTestId('gridViewClick');
        fireEvent(gridViewClickId, 'onPress');
        expect(navigation.navigate).not.toHaveBeenCalled();
    })

    it("should display 2 columns in tablet and ipad devices",() => {
        const component = (
            <GestureHandlerRootView>
                <ArticleGridView data={data} showHighlightTitle={true} showImage={true} />
            </GestureHandlerRootView>
        )
        instance = render(component)
        const testId = instance.container.findByType(FlatList);
        expect(testId.props.numColumns).toEqual(3);
    })

    it("should display 3 columns in tab/iPad device",() => {
        const component = (
            <GestureHandlerRootView>
                <ArticleGridView data={data} showHighlightTitle={true} showImage={true} />
            </GestureHandlerRootView>
        )
        instance = render(component)
        const testId = instance.container.findByType(FlatList);
        expect(testId.props.numColumns).toEqual(3);
    })

    it("should display description(body) in 2 lines in Tab",() => {
        const component = (
            <GestureHandlerRootView>
                <ArticleGridView data={data} showHighlightTitle={true} showImage={true} />
            </GestureHandlerRootView>
        )
        instance = render(component)
        const element = instance.container.findByType(GridViewItem);
        expect(element.props.tabBodyLineCount).toBe(2);
    })

})
describe('Check ArticleGridView should return null when passing empty data', () => {
    let instance: RenderAPI
    const navigation = {
        navigate: jest.fn()
    }
    const useNavigationMock = jest.fn()
    beforeEach(() => {
        (useNavigation as jest.Mock).mockImplementation(useNavigationMock);
        (useNavigationMock).mockReturnValue(navigation);
        const component = (
            <ArticleGridView data={{}} showHighlightTitle={true} showImage={true} />
        )
        instance = render(component)
    });
    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    })
    it('should return nothing, when the data is empty', () => {
        const component = (
            <ArticleGridView data={{}} showHighlightTitle={true} showImage={true} />
        )
        instance = render(component)
        expect(instance.queryByTestId('flatListId')).toBeNull();
    })
})
