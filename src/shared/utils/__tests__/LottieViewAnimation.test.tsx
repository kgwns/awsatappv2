import { LottieViewAnimation } from "../LottieViewAnimation"
import {render, RenderAPI} from '@testing-library/react-native';
import React, { useRef, useState } from "react";
import { AppState, NativeEventSubscription } from "react-native";
jest.mock('react',() => {
    return {
        ...jest.requireActual('react'),
        useState: jest.fn(),
        useRef: jest.fn()
    }
})
const LottieView = {
    props: {
        autoplay: false,
        autosize: true
    },
    context: {},
    refs: {},
    resume: jest.fn()
}
const appState = {
    current: 'inactive'
}
describe("test LottieView",() => {
    let instance: RenderAPI;
    const animationRef = jest.fn();
    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [LottieView,animationRef]);
        (useRef as jest.Mock).mockImplementation(() => appState);
        const component = (
            <LottieViewAnimation source = {{}} style = {{}} />
        )
        instance = render(component);
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    it("should render a component",() => {
        expect(instance).toBeDefined();
    })
    it("should call event listener lottie view",() => {
        const appStateSpy = jest.spyOn(AppState,'addEventListener').mockImplementation((_mockvalue,nextAppState) => {
            nextAppState('inactive')
            return {
            } as NativeEventSubscription
        });
        appStateSpy.mock.calls[0][1]('active');
        expect(LottieView.resume).toBeCalled();
    })
})