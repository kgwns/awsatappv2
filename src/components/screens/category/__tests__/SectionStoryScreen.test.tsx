import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { SectionStoryScreen } from '../SectionStoryScreen'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/SampleData'

jest.mock("src/hooks/useNewsView", () => ({
    useNewsView: (...args: any) => {
        return {
            isLoading: true,
            heroListData: [],
            topListData: [],
            bottomListData: [],
            fetchHeroListRequest: () => {
                return []
            },
            fetchTopListRequest: () => {
                return []
            },
            fetchBottomListRequest: () => {
                return []
            },
        }
    },
}));


describe('<SectionStoryScreen>', () => {
    let instance: RenderAPI

    const mockOnPress = jest.fn()

    beforeEach(() => {
        const component = <Provider store={storeSampleData}>
            <SectionStoryScreen />
        </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render SectionStoryScreen', () => {
        expect(instance).toBeDefined()
    })
})
