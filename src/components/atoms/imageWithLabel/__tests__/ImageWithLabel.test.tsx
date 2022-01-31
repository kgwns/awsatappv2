import { render, RenderAPI } from '@testing-library/react-native'
import React from 'react'
import { ImageWithLabel } from '../ImageWithLabel'

describe('<ImageWithLabel />', () => {
    let instance: RenderAPI
    const data = {
        image: 'https://picsum.photos/200/300',
        title: `غرق عشرات المهاجرين بالقنال الإنجليزي لندن وباريس يتبادلات الاتهامات`,
        description: `تهمت وكالة الأمن السيبراني والبنية التحتية التابعة لوزارة الأمن الداخلي الأميركية الحكومة الايرانية، مجما.`,
        tagName: 'الحكومة'
    }

    beforeEach(() => {
        const component = <ImageWithLabel {...data} />
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
