import { render } from "@testing-library/react-native"
import { PodcastAnalyticsManager } from "../PodcastAnalyticsManager"
import React, { useRef } from "react"
import { useProgress } from "react-native-track-player";
import { AnalyticsEvents, recordLogEvent } from "../analytics";
import { storeSampleData } from "src/constants/Constants";
import { Provider, useSelector } from "react-redux";

jest.mock('src/shared/utils/analytics',() => ({
    ...jest.requireActual('src/shared/utils/analytics'),
    recordLogEvent: jest.fn()
}));

jest.mock('react-native-track-player', () => {
    return {
      useProgress: jest.fn()
    };
});
jest.mock('react',() => ({
    ...jest.requireActual('react'),
    useRef: jest.fn()
}))

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

const eventParameter = {
    content_title: 'podcastTitle',
    content_duration: '15:30',
    content_type: 'podcast'
}

describe("PodcastAnalyticsManager",() => {
    beforeEach(() => {
        (useSelector as jest.Mock).mockReturnValue(eventParameter);
    })
    it("should not log the event, when the podcast is in initial state",() => {
        (useRef as jest.Mock).mockReturnValueOnce({current:0});
        (useProgress as jest.Mock).mockReturnValue({
            position: 0,
            duration: 10
        });
        render(
            <Provider store={storeSampleData}>
                <PodcastAnalyticsManager/>
            </Provider>
        );
      
        expect(recordLogEvent).not.toHaveBeenCalled();
    })
    it("should log the event, when the podcast reached 10%",() => {
        (useRef as jest.Mock).mockReturnValueOnce({current:0});
        (useProgress as jest.Mock).mockReturnValue({
            position: 2,
            duration: 10
        });
        render(
            <Provider store={storeSampleData}>
                <PodcastAnalyticsManager/>
            </Provider>
        );
        const eventParam = {
            ...eventParameter,
            progress_percentage: 10
        }
        expect(recordLogEvent).toHaveBeenCalled();
        expect(recordLogEvent).toHaveBeenCalledWith(AnalyticsEvents.PODCAST_PROGRESS,eventParam)
    })
    it("should log the event, when the podcast completed",() => {
        (useRef as jest.Mock).mockReturnValueOnce({current:75});
        (useProgress as jest.Mock).mockReturnValue({
            position: 10,
            duration: 10
        });
        render(
            <Provider store={storeSampleData}>
                <PodcastAnalyticsManager/>
            </Provider>
        );
        const eventParam = {
            ...eventParameter,
            progress_percentage: 100
        }
        expect(recordLogEvent).toHaveBeenCalled();
        expect(recordLogEvent).toHaveBeenCalledWith(AnalyticsEvents.PODCAST_COMPLETED,eventParam)
    })
    it("should not log the event, when the podcast is not reached(10%/25%/50%/75%)",() => {
        (useRef as jest.Mock).mockReturnValueOnce({current:27});
        (useProgress as jest.Mock).mockReturnValue({
            position: 8,
            duration: 10
        });
        render(
            <Provider store={storeSampleData}>
                <PodcastAnalyticsManager/>
            </Provider>
        );
        expect(recordLogEvent).not.toHaveBeenCalled();
    })
})