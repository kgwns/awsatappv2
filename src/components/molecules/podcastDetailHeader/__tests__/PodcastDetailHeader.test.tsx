import React from 'react';
import { RenderAPI, fireEvent, render } from '@testing-library/react-native';
import { PodcastDetailHeader } from "../PodcastDetailHeader";

describe("PodcastDetailHeader",() => {
    let instance: RenderAPI;
    const onBackPressMock = jest.fn();
    const onHomePressMock = jest.fn();

    it("should not display Home icon",() => {
        const component = (
            <PodcastDetailHeader onBackPress={onBackPressMock} onHomePress={onHomePressMock} />
        );
        instance = render(component);
        expect(instance.queryByTestId('podcastHomeId')).toBeNull();
    });

    it("should display Home icon",() => {
        const component = (
            <PodcastDetailHeader visibleHome = {true} 
            onBackPress={onBackPressMock} onHomePress={onHomePressMock} />
        );
        instance = render(component);
        const podcastHomeId = instance.getByTestId('podcastHomeId');
        expect(podcastHomeId).not.toBeNull();
        fireEvent.press(podcastHomeId);
    });

    it("should display Back icon",() => {
        const component = (
            <PodcastDetailHeader visibleHome = {true} 
            onBackPress={onBackPressMock} onHomePress={onHomePressMock} />
        );
        instance = render(component);
        const podcastBackIcon = instance.getByTestId('podcastBackIconId');
        expect(podcastBackIcon).not.toBeNull();
        fireEvent.press(podcastBackIcon);
    });
});