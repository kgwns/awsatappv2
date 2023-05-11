import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { Provider } from 'react-redux'
import { storeSampleData } from '../../../../constants/Constants'
import { TermsAndAboutUs } from '../TermsAndAboutUs'
import { HtmlRenderer } from 'src/components/atoms'
import {useNavigation} from '@react-navigation/native';
import { ABOUT_US, TERMS_AND_CONDITION } from 'src/services/apiEndPoints'
import AutoHeightWebView from 'react-native-autoheight-webview'

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

    const navigation = {
        reset: jest.fn(),
        navigate: jest.fn(),
        goBack: jest.fn(),
    }
    
    beforeEach(() => {
        (useNavigation as jest.Mock).mockReturnValue(navigation);
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('Should render HTMLRenderer Component', () => {
        const { container } = render(
            <Provider store={storeSampleData}>
                <TermsAndAboutUs route={{params: {id: TERMS_AND_CONDITION}}} />
            </Provider> 
        )
        const element = container.findByType(HtmlRenderer);
        expect(element).not.toBeNull();
    })

    test('Should render webView for AboutUs page', () => {
        const { container } = render(
            <Provider store={storeSampleData}>
                <TermsAndAboutUs route={{params: {id: ABOUT_US}}} />
            </Provider> 
        )
        const element = container.findByType(AutoHeightWebView);
        fireEvent(element,'onLoadEnd');
        expect(element).not.toBeNull();
    })
})