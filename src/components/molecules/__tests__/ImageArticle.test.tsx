import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { BannerImageWithOverlay } from 'src/components/atoms'
import FixedTouchable from 'src/shared/utils/FixedTouchable'
import { ArticleFooter, ImageArticle } from '..'

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
        const component = <ImageArticle nid='2' author={'الأمن'} created={'الأمن'} isBookmarked={false} onPressBookmark={mockFunction} {...data} />
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
