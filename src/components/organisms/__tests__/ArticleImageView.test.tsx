import { useNavigation } from "@react-navigation/native";
import ArticleImageView from "../ArticleImageView";
import { fireEvent, render } from '@testing-library/react-native';
import React from "react";
import { ScreensConstants } from "src/constants/Constants";
import { MainSectionBlockType } from "src/redux/latestNews/types";
import { HomePageArticleType } from "src/redux/latestNews/types";
import { Image } from "src/components/atoms";
import * as svgImages from 'src/shared/styles/svgImages'
import { GestureHandlerRootView } from "react-native-gesture-handler";

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isTab: true
}));

const data: MainSectionBlockType[] = [
    {
        body: 'body',
        title: 'title',
        nid: '324334',
        image: 'image',
        news_categories: {},
        author: 'author',
        created: 'string',
        isBookmarked: false,
        type: HomePageArticleType.ALBUM,
        blockName: 'string',
        position: 'string',
        displayType: 'string',
    },
    {
        body: 'body',
        title: 'title',
        nid: '324234',
        image: 'image',
        news_categories: {},
        author: 'author',
        created: 'string',
        isBookmarked: false,
        type: HomePageArticleType.ARTICLE,
        blockName: 'string',
        position: 'string',
        displayType: 'string',
    },
    {
        body: 'body',
        title: 'title',
        nid: '',
        image: 'image',
        news_categories: {},
        author: 'author',
        created: 'string',
        isBookmarked: false,
        type: HomePageArticleType.ARTICLE,
        blockName: 'string',
        position: 'string',
        displayType: 'string',
    },
]

const props = {
    data: data,
}

const navigation = {
    navigate: jest.fn()
}
describe('Check ArticleImageView', () => {
    let instance: any;
    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValue(navigation);
        const component = render(
            <GestureHandlerRootView>
                <ArticleImageView {...props} />
            </GestureHandlerRootView>
        );
        instance = component;
    });

    afterEach(() => {
        jest.clearAllMocks();
    })
   
    it('Should click on article, and it navigates to ARTICLE_DETAIL_SCREEN',() => {
        const testId = instance.getAllByTestId('articleImageView')[1];
        fireEvent.press(testId);
        expect(navigation.navigate).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: '324234'});
    })

    it('Should click on article, and it does not navigates to any screens',() => {
        const testId = instance.getAllByTestId('articleImageView')[2];
        fireEvent.press(testId);
        expect(navigation.navigate).not.toHaveBeenCalled();
    })

})

describe('ArticleImageView', () => {
    it('should not display articles, when the data is empty', () => {
        const { queryByTestId } = render(
            <GestureHandlerRootView>
                <ArticleImageView data={[] as any} />
            </GestureHandlerRootView>
        )
        expect(queryByTestId('flatlistId')).toBeNull();
    })
    it('By default, it should show highlight title', () => {
        DeviceTypeUtilsMock.isTab = false;
        const { queryAllByTestId } = render(
            <GestureHandlerRootView>
                <ArticleImageView {...props} />
            </GestureHandlerRootView>
        )
        const highlightTitleId = queryAllByTestId('highlightTitleId')[0];
        expect(highlightTitleId).not.toBeNull();
        expect(highlightTitleId.props.style[1].fontSize).toEqual(12)
    })
    it('it should show highlight title in Tab', () => {
        DeviceTypeUtilsMock.isTab = true;
        const { queryAllByTestId } = render(
            <GestureHandlerRootView>
                <ArticleImageView {...props} />
            </GestureHandlerRootView>
        )
        const highlightTitleId = queryAllByTestId('highlightTitleId')[0];
        expect(highlightTitleId).not.toBeNull();
        expect(highlightTitleId.props.style[1].fontSize).toEqual(14)
    })
    it('it should not display highlight title', () => {
        const { queryAllByTestId } = render(
            <GestureHandlerRootView>
                <ArticleImageView {...props} showHighlightTitle = {false} />
            </GestureHandlerRootView>
        )
        const highlightTitleId = queryAllByTestId('highlightTitleId')[0];
        expect(highlightTitleId).toBeUndefined();
    })
    it('By Default, Should display article image', () => {
        const { container } = render(
            <GestureHandlerRootView>
                <ArticleImageView {...props} />
            </GestureHandlerRootView>
        )
        const articleImage = container.findAllByType(Image)[0];
        expect(articleImage).not.toBeNull();
    })
    it('Should display article image', () => {
        const { container } = render(
            <GestureHandlerRootView>
                <ArticleImageView {...props} showImage = {true} />
            </GestureHandlerRootView>
        )
        const articleImage = container.findAllByType(Image)[0];
        expect(articleImage).not.toBeNull();
    })
    it('Should not display article image', () => {
        const { container } = render(
            <GestureHandlerRootView>
                <ArticleImageView {...props} showImage = {false} />
            </GestureHandlerRootView>
        )
        const articleImage = container.findAllByType(Image)[0];
        expect(articleImage).toBeUndefined();
    })
    it('Should display Photo Gallery article image in Mobile', () => {
        DeviceTypeUtilsMock.isTab = false
        const svg = jest.spyOn(svgImages,'getSvgImages');
        const { container } = render(
            <GestureHandlerRootView>
                <ArticleImageView {...props} showImage = {true} />
            </GestureHandlerRootView>
        )
        const articleImage = container.findAllByType(Image)[0];
        expect(articleImage).not.toBeNull();
        expect(svg).toHaveBeenCalled();
        expect(svg).toHaveBeenCalledWith({height: 22, name: "photoIcon", width: 27});
    })
    it('Should display Photo Gallery article image in Tab', () => {
        DeviceTypeUtilsMock.isTab = true
        const svg = jest.spyOn(svgImages,'getSvgImages');
        const { container } = render(
            <GestureHandlerRootView>
                <ArticleImageView {...props} showImage = {true} />
            </GestureHandlerRootView>
        )
        const articleImage = container.findAllByType(Image)[0];
        expect(articleImage).not.toBeNull();
        expect(svg).toHaveBeenCalled();
        expect(svg).toHaveBeenCalledWith({height: 12, name: "photoIcon", width: 17});
    })
    it('Should click on article, and it navigates to PHOTO_GALLERY_DETAIL_SCREEN',() => {
        const { getAllByTestId } = render(
            <GestureHandlerRootView>
                <ArticleImageView {...props} />
            </GestureHandlerRootView>
        );
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        const testId = getAllByTestId('articleImageView')[0];
        fireEvent.press(testId);
        expect(navigation.navigate).toHaveBeenCalled();
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN, {nid: '324334'});
    })
})