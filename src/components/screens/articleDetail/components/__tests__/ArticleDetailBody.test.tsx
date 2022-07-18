import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ArticleDetailBody} from 'src/components/screens/articleDetail/components/ArticleDetailBody';
import { storeSampleData } from 'src/constants/SampleData';
import AutoHeightWebView from 'react-native-autoheight-webview';

describe('<ArticleDetailBody>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    
    beforeEach(() => {
        const component = 
            <Provider store={storeSampleData}>
                <ArticleDetailBody body={'abcd'} index={0} articleFontSize={16} webviewRef={0}/>
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

    it('When AutoHeightWebView is pressed onLoadEnd', () => {
        const testItemId = instance.container.findAllByType(AutoHeightWebView)[0];
        fireEvent(testItemId, 'onLoadEnd');
        expect(mockFunction).toBeTruthy();
    });

    it('When AutoHeightWebView is pressed onLoadProgress', () => {
        const testItemId = instance.container.findAllByType(AutoHeightWebView)[0];
        fireEvent(testItemId, 'onLoadProgress');
        expect(mockFunction).toBeTruthy();
    });

    it('When AutoHeightWebView is pressed onShouldStartLoadWithRequest', () => {
        const testItemId = instance.container.findAllByType(AutoHeightWebView)[0];
        fireEvent(testItemId, 'onShouldStartLoadWithRequest', {url: 'abc'});
        expect(mockFunction).toBeTruthy();
    });

    it('When AutoHeightWebView is pressed onMessage', () => {
        const testItemId = instance.container.findAllByType(AutoHeightWebView)[0];
        fireEvent(testItemId, 'onMessage', {event: 'abc'});
        expect(mockFunction).toBeTruthy();
    });
})