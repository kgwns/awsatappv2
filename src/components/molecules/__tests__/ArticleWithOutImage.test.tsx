import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { ArticleWithOutImage } from '..'

describe('<ArticleWithOutImage>', () => {
    let instance: RenderAPI
    const data = {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        body: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    }

    beforeEach(() => {
        const component = <ArticleWithOutImage isBookmarked={false} {...data} />
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

describe('<ArticleWithOutImage>', () => {
    let instance: RenderAPI
    const data = {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        body: '',
        tagName: 'الحكومة'
    }

    beforeEach(() => {
        const component = <ArticleWithOutImage showDivider={false} isBookmarked={false} {...data} />
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
