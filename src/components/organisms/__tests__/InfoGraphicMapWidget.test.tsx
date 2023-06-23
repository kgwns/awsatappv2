import InfoGraphicMapWidget from "../InfoGraphicMapWidget"
import {render, RenderAPI} from '@testing-library/react-native';
import React from "react";

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
  ...jest.requireActual('src/shared/utils/dimensions'),
  isIOS: false,
}));
describe('Check InfoGraphicMapWidget with empty values',()=>{
    let instance:RenderAPI
    beforeEach(()=>{
        DeviceTypeUtilsMock.isIOS = true
        const component = (
            <InfoGraphicMapWidget headerTitle = "" htmlContent = "" />
        )
        instance = render(component);
    })
    afterEach(()=>{
        jest.clearAllMocks();
        instance.unmount();
    })
    it('render infoGraphicMapWidget',()=>{
        expect(instance).toBeDefined();
    })
});

describe('Check InfoGraphicMapWidget with title and html Content',()=>{
    let instance:RenderAPI
    beforeEach(()=>{
        DeviceTypeUtilsMock.isIOS = false
        const component = (
            <InfoGraphicMapWidget headerTitle = "title" htmlContent="<p>html content</p>"/>
        )
        instance = render(component);
    })
    afterEach(()=>{
        jest.clearAllMocks();
        instance.unmount();
    })
    it('render infoGraphicMapWidget',()=>{
        expect(instance).toBeDefined();
    })
});