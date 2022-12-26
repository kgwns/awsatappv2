import ArticleLiveBlog from "../ArticleLiveBlog"
import React from "react";
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';
import AutoHeightWebView from "react-native-autoheight-webview";
import { Linking } from "react-native";

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
    ...jest.requireActual('src/shared/utils/dimensions'),
    isIOS: false,
}));
describe('<ArticleLiveBlog /> in IOS', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        DeviceTypeUtilsMock.isIOS = true;
        const component = (
            <ArticleLiveBlog scribbleId="1" />
        )
        instance = render(component);
    });
    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    })
    it('should render a component', () => {
        expect(instance).toBeDefined();
    });
    it('Should call AutoHeightWebView onNavigationStateChange', () => {
        const element = instance.container.findAllByType(AutoHeightWebView)[0];
        fireEvent(element, 'onNavigationStateChange', { nativeEvent: { url: 'https://test.com' } });
        expect(Linking.openURL).toHaveBeenCalled();
    });
})

describe('<ArticleLiveBlog /> in Android', () => {
    let instance: RenderAPI;
    beforeEach(() => {
        DeviceTypeUtilsMock.isIOS = false;
        const component = (
            <ArticleLiveBlog scribbleId="1" />
        )
        instance = render(component);
    });
    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    })
    it('should render a component', () => {
        expect(instance).toBeDefined();
    });
})