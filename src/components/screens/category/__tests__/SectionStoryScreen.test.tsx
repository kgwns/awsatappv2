import React, { useState } from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { SectionStoryScreen } from '../SectionStoryScreen'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/SampleData'
import { PopUp } from 'src/components/organisms'
import {useNavigation} from '@react-navigation/native';
import { FlatList } from 'react-native'

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

jest.mock("src/hooks/useNewsView", () => ({
    useNewsView: () => {
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
    const setInitialLoading = mockFunction;

    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
    }
    
    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        (useState as jest.Mock).mockImplementation(() => [[], setHeroListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setBottomListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setTopListDataInfo]);
        (useState as jest.Mock).mockImplementation(() => [[], setVideoListData]);
        (useState as jest.Mock).mockImplementation(() => [false, setShowPopUp]);
        (useState as jest.Mock).mockImplementation(() => [false, setInitialLoading]);
        (useState as jest.Mock).mockImplementation(() => [false, setIsBottomListLoading]);
        (useState as jest.Mock).mockImplementation(() => ['12', setCurrentSectionId]);
        (useState as jest.Mock).mockImplementation(() => [[], setChildSection]);
        
        const component = <Provider store={storeSampleData}>
            <SectionStoryScreen sectionId={'1'} childInfo={[]} onUpdateChildSection={mockFunction} />
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


    test('Should call onPressButton', () => {
        const element = instance.container.findByType(PopUp)
        fireEvent(element, 'onPressButton');
        expect(navigation.reset).toBeTruthy()
    });

    test('Should call onClosePopUp', () => {
        const element = instance.container.findByType(PopUp)
        fireEvent(element, 'onClosePopUp');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList onPress', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'renderItem', {item: [{}], index: 0});
        expect(mockFunction).toBeTruthy()
    });

    test('Should call FlatList keyExtractor', () => {
        const element = instance.container.findByType(FlatList)
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

})
