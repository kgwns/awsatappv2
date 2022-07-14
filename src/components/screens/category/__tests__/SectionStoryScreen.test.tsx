import React, { useState } from 'react'
import { render, RenderAPI } from '@testing-library/react-native'
import { SectionStoryScreen } from '../SectionStoryScreen'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/SampleData'

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
  }));
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
            emptyAllListData: () => {
                return []
            },
        }
    },
}));


describe('<SectionStoryScreen>', () => {
    let instance: RenderAPI

    const mockFunction = jest.fn()
    const setHeroListDataInfo = mockFunction;
    const setBottomListDataInfo = mockFunction;
    const setTopListDataInfo = mockFunction;
    const setVideoListData = mockFunction;
    const setShowPopUp = mockFunction;
    const setIsBottomListLoading = mockFunction;
    const setCurrentSectionId = mockFunction;
    const setChildSection = mockFunction;

    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [[], setHeroListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setBottomListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setTopListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setVideoListData]);
        (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
        (useState as jest.Mock).mockImplementation(() => [false, setIsBottomListLoading]);
        (useState as jest.Mock).mockImplementation(() => ['1', setCurrentSectionId]);
        (useState as jest.Mock).mockImplementation(() => [[], setChildSection]);
        
        const component = <Provider store={storeSampleData}>
            <SectionStoryScreen sectionId={''} childInfo={[]} onUpdateChildSection={mockFunction} />
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
