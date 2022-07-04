import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { storeSampleData } from 'src/constants/SampleData';
import CustomDrawerContent, { SocialMediaType }  from '../CustomDrawerContent';
import {ButtonImage, ButtonList} from 'src/components/atoms';
import { ScreensConstants } from 'src/constants';

describe('<CustomDrawerContent>', () => {
    let instance: RenderAPI;
    const mockFunction =jest.fn();

    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <CustomDrawerContent />
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

    test('Should call ButtonList onPress', () => {
        const element = instance.container.findAllByType(ButtonList)[0]
        fireEvent(element, 'onPress', {screen: ScreensConstants.TERMS_AND_ABOUT_US, params: { title: 'advertiseWithUs', id: 49 }});
        expect(mockFunction).toBeTruthy();
    })

    test('Should call ButtonList onPress', () => {
        const element = instance.container.findAllByType(ButtonList)[1]
        fireEvent(element, 'onPress', {screen: ScreensConstants.TERMS_AND_ABOUT_US, params: { title: 'aboutTheEast', id: 153 }});
        expect(mockFunction).toBeTruthy();
    })

    test('Should call ButtonList onPress', () => {
        const element = instance.container.findAllByType(ButtonList)[2]
        fireEvent(element, 'onPress', {screen: ScreensConstants.TERMS_AND_ABOUT_US, params: { title: 'about_the_news_paper', id: 56 }});
        expect(mockFunction).toBeTruthy();
    })

    test('Should call ButtonList onPress', () => {
        const element = instance.container.findAllByType(ButtonList)[3]
        fireEvent(element, 'onPress', {screen: ScreensConstants.TERMS_AND_ABOUT_US, params: { title: 'termsOfUse', id: 57 }});
        expect(mockFunction).toBeTruthy();
    })

})
