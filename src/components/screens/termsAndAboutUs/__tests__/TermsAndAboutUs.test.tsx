import React from 'react'
import { fireEvent, render, RenderAPI } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/SampleData'
import { TermsAndAboutUs } from '../TermsAndAboutUs'
import { ButtonIconWithLabel } from 'src/components/atoms'
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
}));

jest.mock("src/hooks/useTermsAndAboutUs", () => ({
    useTermsAndAboutUs: () => {
      return {
        isLoading: true,
        data: [
            {
                title: 'Example',
                body: 'Example',
            },
            {
                title: 'Example',
                body: 'Example',
            }
        ],
        fetchStaticDetail: () => [],
      }
    },
}));

describe('<TermsAndAboutUs>', () => {
    let instance: RenderAPI
    const mockFunction= jest.fn();

    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
        goBack: jest.fn(),
    }
    
    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValue(navigation);
        const component = 
            <Provider store={storeSampleData}>
                <TermsAndAboutUs route={{params: {id: 56}}} />
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

    test('Should call ButtonIconWithLabel onPress', () => {
        const element = instance.container.findAllByType(ButtonIconWithLabel)[0]
        fireEvent(element, 'onPress');
        expect(navigation.goBack).toBeTruthy();
    })
})