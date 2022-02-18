import { render, RenderAPI } from "@testing-library/react-native"
import React from "react"
import HeadlinesSection, { HeadlinesSectionProps } from "src/components/organisms/headlinesSection/HeadlinesSection"

describe('HeadLinesSection', () => {
    let instance: RenderAPI
    const tickerData = {
        title: 'أولى',
        body: 'مع اختتام الجولة الرابعة من مفاوضات فيينا الرامية لإعادة العمل بالاتفاق النووي المبرم بين إيران والقوى الكبرى عام',
        nid: "2982381",
        image: '/sites/default/files/styles/large/public/2021/05/19/news-200521-iran.vienna2_0.jpg?itok=VC7GwX1M',
        author: 'فيينا: راغدة بهنام',
        created: '2021-05-20T23:04:52+0000',
        news_categories: {
            id: "726",
            title: "أولى",
            url: "http://srpcawsatdev.prod.acquia-sites.com/taxonomy/term/726",
            bundle: "news_categories",
            name: "أولى"
        },

    }
    beforeEach(() => {
        const data: HeadlinesSectionProps = {
            headlineTitle: 'أولى',
            headlineDescription: "تفاؤل حذر بعد انتهاء الجولة الرابعة من «فيينا»",
            tickerData: Array(5).fill(tickerData)
        }
        const component = <HeadlinesSection {...data} />
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