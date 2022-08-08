import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { VideoScreen } from '../VideoScreen'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

describe('<VideoScreen>', () => {
    let instance: RenderAPI

    const mockFunction = jest.fn()

    const navigation = {
        navigate: mockFunction,
    }

    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        const component = <VideoScreen tabIndex={0} currentIndex={0}/>
        instance = render(component)
    })

    afterEach(() => {
        jest.clearAllMocks()
        instance.unmount()
    })

    it('Should render VideoScreen', () => {
        expect(instance).toBeDefined()
    })

    test('Should call main_FlatList1 onPress', () => {
        const element = instance.getByTestId('main_FlatList1');
        fireEvent(element, 'onScrollBeginDrag');
        expect(global.refFlatList).toBeTruthy()
    });

    test('Should call main_FlatList1 keyExtractor', () => {
        const element = instance.getByTestId('main_FlatList1');
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call documentary_Video_Item_FlatList1 onPress', () => {
        const element = instance.getByTestId('documentary_Video_Item_FlatList1');
        fireEvent(element, 'onScrollBeginDrag');
        expect(global.refFlatList).toBeTruthy()
    });

    test('Should call documentary_Video_Item_FlatList1 keyExtractor', () => {
        const element = instance.getByTestId('documentary_Video_Item_FlatList1');
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call video_Item_FlatList1 onPress', () => {
        const element = instance.getByTestId('video_Item_FlatList1');
        fireEvent(element, 'onScrollBeginDrag');
        expect(global.refFlatList).toBeTruthy()
    });

    test('Should call video_Item_FlatList1 keyExtractor', () => {
        const element = instance.getByTestId('video_Item_FlatList1');
        fireEvent(element, 'keyExtractor', '', 2);
        expect(mockFunction).toBeTruthy()
    });

    test('Should call ScreenContainer onCloseSignUpAlert', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'onCloseSignUpAlert');
        expect(mockFunction).toBeTruthy()
    });
    
    test('Should call ScreenContainer isSignUpAlertVisible', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'isSignUpAlertVisible');
        expect(mockFunction).toBeTruthy()
    });
    
})