import { PodcastEpisodeModalInfo } from "../PodcastEpisodeModalInfo"
import { fireEvent, render, RenderAPI } from "@testing-library/react-native";
import React, { useState } from "react";
import { Linking } from "react-native";
import * as PodcastService from 'src/services/podcastService';
import {fetchSingleEpisodeSpreakerApi} from 'src/services/podcastService';
jest.mock("react-native-safe-area-context", () => {
    const insets = { bottom: 0 }
    return {
        useSafeAreaInsets: jest.fn().mockImplementation(() => insets)
    }
})

jest.mock("react", () => {
    return {
        ...jest.requireActual('react'),
        useState: jest.fn(),
    }
})

// jest.mock("react-native-track-player",()=>{
//     return {
//         ...jest.requireActual('react-native-track-player'),
//         usePlayBackState:jest.fn(),
//         State:{
//             Buffering:'Buffering'
//         }
//     }
// })
// jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')
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
    field_spreaker_episode_export: 'string'
}

const setDuration = jest.fn()
describe("rendering PodcastEpisodeModalInfo", () => {
    let instance: RenderAPI
    const mockFunction = jest.fn()
    beforeEach(() => {
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
    })
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

describe('test getPodcastDuration', () => {
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
    it('test fetchSingleEpisodeSpreakerApi returns a response',() => {
        jest.spyOn(PodcastService, 'fetchSingleEpisodeSpreakerApi').mockReturnValue({
            response: {
                episode: {
                    result: true
                }
            }   
        } as any);
        const response = fetchSingleEpisodeSpreakerApi({episodeId:data.field_spreaker_episode_export})
        expect(response).toBeInstanceOf(Object) 
    })

    it('test fetchSingleEpisodeSpreakerApi throws error',() => {
        jest.spyOn(PodcastService, 'fetchSingleEpisodeSpreakerApi').mockImplementationOnce(()=>{throw new Error('throws error')});
        return fetchSingleEpisodeSpreakerApi({episodeId:data.field_spreaker_episode_export}).catch(error=>{
            expect(error.message).toEqual('throws error')
        })
    })
})