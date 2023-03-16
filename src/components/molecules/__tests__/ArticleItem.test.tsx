import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import FixedTouchable from 'src/shared/utils/FixedTouchable'
import  ArticleItem  from 'src/components/molecules/ArticleItem'
import  ArticleWithOutImage  from 'src/components/molecules/ArticleWithOutImage'

import {useNavigation} from '@react-navigation/native';
import { ScreensConstants } from 'src/constants/Constants';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('<ImageArticle>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const navigation = {
        navigate: mockFunction,
        push: mockFunction,
    }
    const data = {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        body: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    }

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        const component = <ArticleItem isJournalist={true} isAlbum={false} nid={'1'} author={'بالقنال'} created={'بالقنال'} isBookmarked={false} index={0} {...data} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call FixedTouchable onPress', () => {
        const element = instance.container.findByType(FixedTouchable)
        fireEvent(element, 'onPress', {nid:'0'});
        expect(navigation.push).toHaveBeenCalledWith(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: '1', isRelatedArticle: true })
    })

    test('Should call ArticleWithOutImage onPress', () => {
        const element = instance.container.findByType(ArticleWithOutImage)
        fireEvent(element, 'onPress', {nid:'0'});
        expect(navigation.push).toHaveBeenCalledWith(ScreensConstants.ARTICLE_DETAIL_SCREEN,  { nid: '1', isRelatedArticle: true })
    })
})

describe('<ImageArticle>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const navigation = {
        navigate: mockFunction,
    }
    const data = {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        body: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    }

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        const component = <ArticleItem nid={'1'} isJournalist={false} isAlbum={true} author={'بالقنال'} created={'بالقنال'} isBookmarked={false} index={0} {...data} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call FixedTouchable onPress', () => {
        const element = instance.container.findByType(FixedTouchable)
        fireEvent(element, 'onPress', {nid:'0'});
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN,{nid: '1'})
    })

    test('Should call ArticleWithOutImage onPress', () => {
        const element = instance.container.findByType(ArticleWithOutImage)
        fireEvent(element, 'onPress', {nid:'0'});
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN, {nid: '1'})
    })
})

describe('<ImageArticle>', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn();
    const navigation = {
        navigate: mockFunction,
    }
    const data = {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        body: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    }

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        const component = <ArticleItem nid={'1'} isJournalist={false} isAlbum={false} author={'بالقنال'} created={'بالقنال'} isBookmarked={false} index={0} {...data} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call FixedTouchable onPress', () => {
        const element = instance.container.findByType(FixedTouchable)
        fireEvent(element, 'onPress', {nid:'0'});
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.ARTICLE_DETAIL_SCREEN,{nid: '1'})
    })

    test('Should call ArticleWithOutImage onPress', () => {
        const element = instance.container.findByType(ArticleWithOutImage)
        fireEvent(element, 'onPress', {nid:'0'});
        expect(navigation.navigate).toHaveBeenCalledWith(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: '1'})
    })
})
