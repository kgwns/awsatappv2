import React from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/SampleData'
import { LatestNewsScreen } from '../LatestNewsScreen'

const mockUseLatestNewsTab = jest.fn();

jest.mock("src/hooks/useLatestNewsTab", () => ({
    useLatestNewsTab: (...args: any) => {
        return {
            isLoading: true,
            hero: [],
            heroList: [],
            topList: [],
            sectionComboOne: [],
            sectionComboTwo: [],
            sectionComboThree: [],
            sectionComboFour: [],
            fetchTickerAndHeroArticle: () => {
                return []
            },
            fetchHeroListTopList: () => {
                return []
            },
            fetchSectionComboOne: () => {
                return []
            },
            fetchSectionComboTwo: () => {
                return []
            },
            fetchSectionComboThree: () => {
                return []
            },
            fetchSectionComboFour: () => {
                return []
            }
        }
    },
}));

describe('<LatestNewsScreen>', () => {
    let instance: RenderAPI


    beforeEach(() => {
        const component =
            <Provider store={storeSampleData}>
                <LatestNewsScreen />
            </Provider>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render component', () => {
        expect(instance).toBeDefined()
    })
})