import { PodcastEpisodeModalInfo } from "../PodcastEpisodeModalInfo"
import { fireEvent, render, RenderAPI } from "@testing-library/react-native";
import React, { useState } from "react";
import { Linking } from "react-native";
import {fetchSingleEpisodeSpreakerApi} from 'src/services/podcastService';
import { ButtonOutline } from "src/components/atoms/button-outline/ButtonOutline";
jest.mock("react-native-safe-area-context", () => {
    const insets = { bottom: 0 }
    return {
        useSafeAreaInsets: jest.fn().mockImplementation(() => insets)
    }
})
jest.mock('src/services/podcastService');
jest.mock("react", () => {
    return {
        ...jest.requireActual('react'),
        useState: jest.fn(),
    }
})

const DeviceTypeUtilsMock = jest.requireMock('src/shared/utils/dimensions');
jest.mock('src/shared/utils/dimensions', () => ({
    ...jest.requireActual('src/shared/utils/dimensions'),
    isTab: false,
}));
  
const data = {
    nid: '3023',
    isBookmarked: false,
    onPressBookmark: () => { },
    field_podcast_sect_export: {
        img_podcast_mobile: 'img',
        anghami: {
            url: 'anghami@test.com',
        },
        apple_podcasts: {
            url: 'apple@test.com',
        },
        google_podcast: {
            url: 'google@test.com',
        },
        spotify: {
            url: 'spotify@test.com',
        },
    },
    created_export: 'createdExport',
    field_spreaker_episode_export: 'string',
    field_new_sub_title_export:'field_new_sub_title_export',
    duration:'duration'
}

const setDuration = jest.fn()
describe("rendering PodcastEpisodeModalInfo", () => {
    let instance: RenderAPI
    const mockFunction = jest.fn()
    const fetchSingleEpisodeSpreakerApiMock = jest.fn();

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
        (fetchSingleEpisodeSpreakerApi as jest.Mock).mockImplementation(fetchSingleEpisodeSpreakerApiMock);
        (fetchSingleEpisodeSpreakerApiMock).mockReturnValue({response:{episode:{result:true}}});
        (useState as jest.Mock).mockImplementation(() => [1, setDuration])
        const component = (
            <PodcastEpisodeModalInfo data={data} onListenPress={mockFunction} />
        )
        instance = render(component);

    })
    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    })
    it("Should render a component", () => {
        expect(instance).toBeDefined();
    });
    it("test fetchSingleEpisodeSpreakerApi to return response",async() => {
        const response = await fetchSingleEpisodeSpreakerApi({episodeId:'2'});
        expect(response).toEqual({response:{episode:{result:true}}});
    });
    it("test fetchSingleEpisodeSpreakerApi to return response",async() => {
        (fetchSingleEpisodeSpreakerApiMock).mockImplementation(() => { throw new Error('error message') });
        try{
            const response = await fetchSingleEpisodeSpreakerApi({episodeId:'2'});
            expect(response).toEqual({response:{episode:{result:true}}});
        }
        catch(error) {
            expect(error.message).toBe('error message');
        }
    });
});
describe('test the social urls when onPress in renderPodcastView method', () => {
    let instance: RenderAPI
    const mockFunction = jest.fn()
    beforeEach(() => {
        (useState as jest.Mock).mockImplementation(() => [0, setDuration])
        const component = (
            <PodcastEpisodeModalInfo data={data} onListenPress={mockFunction} />
        )
        instance = render(component);
    })
    afterEach(() => {
        jest.clearAllMocks();
        instance.unmount();
    })
    it("test spotify url", () => {
        const testId = instance.getByTestId('spotifyUrl')
        fireEvent(testId, 'onPress');
        expect(Linking.openURL).toBeCalled();
    });
    it("test apple url", () => {
        const testId = instance.getByTestId('appleUrl')
        fireEvent(testId, 'onPress');
        expect(Linking.openURL).toBeCalled();
    });
    it("test google url", () => {
        const testId = instance.getByTestId('googleUrl')
        fireEvent(testId, 'onPress');
        expect(Linking.openURL).toBeCalled();
    });
    it("test anghami url", () => {
        const testId = instance.getByTestId('anghamiUrl')
        fireEvent(testId, 'onPress');
        expect(Linking.openURL).toBeCalled();
    })
});

const dataWithAnnouncerName = {
    nid: '3023',
    isBookmarked: false,
    onPressBookmark: () => { },
    field_podcast_sect_export: {
        img_podcast_mobile: 'img',
        anghami: {
            url: 'anghami@test.com',
        },
        apple_podcasts: {
            url: 'apple@test.com',
        },
        google_podcast: {
            url: 'google@test.com',
        },
        spotify: {
            url: 'spotify@test.com',
        },
    },
    created_export: 'createdExport',
    field_spreaker_episode_export: 'string',
    field_announcer_name_export:'field_announcer_name_export',
    body_export:'body_export'
}


describe("rendering bottomOutline",() => {
    let instance:RenderAPI;
    const mockFunction = jest.fn();
    beforeEach(()=>{
        DeviceTypeUtilsMock.isTab = true
        const component = (
            <PodcastEpisodeModalInfo data={dataWithAnnouncerName} onListenPress={mockFunction}/>
        )
        instance = render(component);
    })
    it('should render a component',() => {
        expect(instance).toBeDefined();
    })
    it("should render onPress in BottomOutline",() => {
        const element = instance.container.findByType(ButtonOutline);
        fireEvent(element,'onPress');
        expect(mockFunction).toHaveBeenCalled()
    })
})