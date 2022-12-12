import InfoGraphicMapWidget from "../InfoGraphicMapWidget"
import {render, RenderAPI} from '@testing-library/react-native';
import React from "react";
describe('Check InfoGraphicMapWidget without html Content',()=>{
    let instance:RenderAPI
    beforeEach(()=>{
        const component = (
            <InfoGraphicMapWidget title = "title" />
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

describe('Check InfoGraphicMapWidget with html Content',()=>{
    let instance:RenderAPI
    beforeEach(()=>{
        const component = (
            <InfoGraphicMapWidget title = "title" htmlContent="<p>html content</p>"/>
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