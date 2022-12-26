import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from 'src/constants/Constants'
import { FavoriteScreen } from '../FavoriteScreen'
import { ScreenContainer } from '../../ScreenContainer/ScreenContainer'
import { SignupAlertCard } from 'src/components/molecules'
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
    useIsFocused: () => jest.fn().mockImplementation(() => Boolean),
    useFocusEffect: () => jest.fn().mockImplementation(() => jest.fn())
}));

jest.mock('react',() => ({
    ...jest.requireActual('react'),
    useCallBack:jest.fn()
}))

describe('<FavoriteScreen>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
    }

    
    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        jest.mock("src/hooks/useLogin", () => ({
            useLogin: () => {
              return {
                isLoggedIn: true,
              }
            },
        }));
        const component =
            <Provider store={storeSampleData}>
                <FavoriteScreen />
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

    test('Should call ScreenContainer onCloseSignUpAlert', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'onCloseSignUpAlert');
        expect(mockFunction).toBeTruthy()
    });

})

describe('<FavoriteScreen>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
    }

    jest.mock("src/hooks/useLogin", () => ({
        useLogin: () => {
          return {
            isLoggedIn: false,
          }
        },
    }));
    
    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValueOnce(navigation);
        const component =
            <Provider store={storeSampleData}>
                <FavoriteScreen />
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

    test('Should call ScreenContainer onCloseSignUpAlert', () => {
        const element = instance.container.findByType(ScreenContainer)
        fireEvent(element, 'onCloseSignUpAlert');
        expect(mockFunction).toBeTruthy()
    });

    test('Should call SignupAlertCard onPress', () => {
        const element = instance.container.findByType(SignupAlertCard)
        fireEvent(element, 'onPress');
        expect(navigation.reset).toBeTruthy()
    });

})