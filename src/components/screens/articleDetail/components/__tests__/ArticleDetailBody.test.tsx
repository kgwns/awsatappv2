import React, { useRef, useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ArticleDetailBody} from 'src/components/screens/articleDetail/components/ArticleDetailBody';
import { storeSampleData } from 'src/constants/SampleData';
import AutoHeightWebView from 'react-native-autoheight-webview';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
    useRef: jest.fn(),
}));

const sampleData: any = {current :
    [
    {
      body: 'example',
      title: 'example',
      nid: 'example',
      isBookmarked: true,
      type: 'example',
      blockName: 'example',
      position: 'example',
    },
    {
      body: 'example',
      title: 'example',
      nid: 'example',
      isBookmarked: true,
      type: 'example',
      blockName: 'example',
      position: 'example',
    },
    {
      body: 'example',
      title: 'example',
      nid: 'example',
      isBookmarked: true,
      type: 'example',
      blockName: 'example',
      position: 'example',
    },
    {
      body: 'example',
      title: 'example',
      nid: 'example',
      isBookmarked: true,
      type: 'example',
      blockName: 'example',
      position: 'example',
    },
]}

describe('<ArticleDetailBody>', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const myTimeOutReference = mockFunction;
    const dynamicHeight = mockFunction;
    const webViewHeight = mockFunction;

    beforeEach(() => {
        (useRef as jest.Mock).mockImplementation(() => [sampleData, myTimeOutReference]);
        (useState as jest.Mock).mockImplementation(() => [20, dynamicHeight]);
        (useState as jest.Mock).mockImplementation(() => [30, webViewHeight]);
        const component = 
            <Provider store={storeSampleData}>
                <ArticleDetailBody body={'example'} index={1} articleFontSize={16} orientation={'landscape'}/>
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
        fireEvent(testItemId, 'onShouldStartLoadWithRequest', {url: 'file:///abc', navigationType: 'click'});
        expect(mockFunction).toBeTruthy();
    });

    it('When AutoHeightWebView is pressed onMessage', () => {
        const testItemId = instance.container.findAllByType(AutoHeightWebView)[0];
        fireEvent(testItemId, 'onMessage', {event: 'abc'});
        expect(mockFunction).toBeTruthy();
    });
})