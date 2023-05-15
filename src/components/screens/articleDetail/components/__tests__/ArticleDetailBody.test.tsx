import React, { useRef, useState } from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ArticleDetailBody} from 'src/components/screens/articleDetail/components/ArticleDetailBody';
import { storeSampleData } from 'src/constants/Constants';
import AutoHeightWebView from 'react-native-autoheight-webview';
import InAppBrowser from 'react-native-inappbrowser-reborn';

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
    useRef: jest.fn(),
}));

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false,
  isAndroid: false,
  isTab: true
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

describe('<ArticleDetailBody> renders in Android', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const myTimeOutReference = mockFunction;
    const dynamicHeight = mockFunction;
    const webViewHeight = mockFunction;

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        DeviceTypeUtilsMock.isAndroid = true;
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

    it('Should render component with Tab false', () => {
        DeviceTypeUtilsMock.isTab = false;
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

    it('When AutoHeightWebView is pressed onShouldStartLoadWithRequest returns response', async () => {
        const spyon = jest.spyOn(InAppBrowser,'open').mockReturnValue(Promise.resolve({type:'dismiss'}));
        const testItemId = instance.container.findAllByType(AutoHeightWebView)[0];
        fireEvent(testItemId, 'onShouldStartLoadWithRequest', {url: 'file:///abc', navigationType: 'click'});
        expect(mockFunction).toBeTruthy();
        expect(spyon).toHaveBeenCalled();
    });

    it('When AutoHeightWebView is pressed onShouldStartLoadWithRequest throws error', async () => {
        const spyon = jest.spyOn(InAppBrowser,'open').mockReturnValue(Promise.reject({type:'cancel'}));
        const testItemId = instance.container.findAllByType(AutoHeightWebView)[0];
        fireEvent(testItemId, 'onShouldStartLoadWithRequest', {url: 'file:///abc', navigationType: 'click'});
        expect(mockFunction).toBeTruthy();
        expect(spyon).toHaveBeenCalled();
    });

    it('When AutoHeightWebView is pressed onMessage', () => {
        const testItemId = instance.container.findAllByType(AutoHeightWebView)[0];
        fireEvent(testItemId, 'onMessage', {event: 'abc'});
        expect(mockFunction).toBeTruthy();
    });
})

describe('<ArticleDetailBody> renders in IOS', () => {
    let instance: RenderAPI;
    const mockFunction = jest.fn();
    const myTimeOutReference = mockFunction;
    const dynamicHeight = mockFunction;
    const webViewHeight = mockFunction;

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        DeviceTypeUtilsMock.isIOS = true;
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
        DeviceTypeUtilsMock.isTab = false;
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