import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/Constants'
import { MostReadScreen } from '../MostReadScreen'

jest.mock("src/hooks/useMostRead", () => ({
    useMostRead: () => {
        return {
            isLoading: false,
            mostReadData: [
                {
                    nid: '12',
                    title: 'example',
                    body: 'example',
                    field_image: 'example',
                    view_node: 'example',
                    field_news_categories_export: [
                        {
                            id: '1',
                            title: 'example',
                            url: 'example',
                            bundle: 'example',
                            name: 'example',
                        },
                        {
                            id: '2',
                            title: 'example',
                            url: 'example',
                            bundle: 'example',
                            name: 'example',
                        },
                    ],
                    field_publication_date_export: 'example',
                },
                {
                    nid: '13',
                    title: 'example',
                    body: 'example',
                    field_image: 'example',
                    view_node: 'example',
                    field_news_categories_export: [
                        {
                            id: '12',
                            title: 'example',
                            url: 'example',
                            bundle: 'example',
                            name: 'example',
                        },
                        {
                            id: '22',
                            title: 'example',
                            url: 'example',
                            bundle: 'example',
                            name: 'example',
                        },
                    ],
                    field_publication_date_export: 'example',
                },
            ],
            fetchMostReadRequest: () => {return [] }
        }
    },
  }));

describe('<MostReadScreen>', () => {
    let instance: RenderAPI

    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <MostReadScreen />
            </Provider> 
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    test('Should render component', () => {
        expect(instance).toBeDefined()
    })
})