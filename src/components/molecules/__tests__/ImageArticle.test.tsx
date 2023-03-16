import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { BannerImageWithOverlay } from 'src/components/atoms/bannerImageWithOverlay/BannerImageWithOverlay'
import FixedTouchable from 'src/shared/utils/FixedTouchable'
import  ArticleFooter  from 'src/components/molecules/articleFooter/ArticleFooter'
import  ImageArticle  from 'src/components/molecules/ImageArticle'

jest.mock('src/components/atoms/label/Label', () => ({
    ...jest.requireActual('src/components/atoms/label/Label'),
    LabelTypeProp: {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        p2: 'p2',
        p3: 'p3',
        p4: 'p4',
        p5: 'p5',
        caption3: 'caption3',
        caption2: 'caption2',
        title1: 'title1',
        title3: 'title3',
        title4: 'title4',
    }
  }))


describe('<ImageArticle>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const data = {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        body: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    }

    beforeEach(() => {
        const component = <ImageArticle nid='2' showDivider={true} author={'الأمن'} created={'الأمن'} isBookmarked={false} onPressBookmark={mockFunction} {...data} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call button image onPress', () => {
        const element = instance.container.findByType(BannerImageWithOverlay)
        fireEvent(element, 'onImageLoadEnd');
        expect(mockFunction).toBeTruthy();
    })

    test('Should call button image onPress', () => {
        const element = instance.container.findByType(ArticleFooter)
        fireEvent(element, 'onPress');
        expect(mockFunction).toBeTruthy();
    })

    test('Should call button image onPress', () => {
        const element = instance.container.findAllByType(FixedTouchable)[0]
        fireEvent(element, 'onPress');
        expect(mockFunction).toBeTruthy();
    })
})


describe('<ImageArticle>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const data = {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        body: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    }

    beforeEach(() => {
        const component = <ImageArticle author={'الأمن'} created={'الأمن'} isBookmarked={false} onPressBookmark={mockFunction} {...data} />
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('should render component', () => {
        expect(instance).toBeDefined()
    })

    test('Should call button image onPress', () => {
        const element = instance.container.findByType(BannerImageWithOverlay)
        fireEvent(element, 'onImageLoadEnd');
        expect(mockFunction).toBeTruthy();
    })

    test('Should call button image onPress', () => {
        const element = instance.container.findByType(ArticleFooter)
        fireEvent(element, 'onPress');
        expect(mockFunction).toBeTruthy();
    })

    test('Should call button image onPress', () => {
        const element = instance.container.findAllByType(FixedTouchable)[0]
        fireEvent(element, 'onPress');
        expect(mockFunction).toBeTruthy();
    })
})
