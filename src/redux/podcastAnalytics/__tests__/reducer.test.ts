import podcastDataReducer from 'src/redux/podcastAnalytics/reducer';
import { FETCH_PODCAST_DATA } from '../actionTypes';

describe("PodcastAnalytics reducer",() => {
    const payload = {
        content_title: 'title',
        content_duration: 'duration',
        content_type: 'podcast'
    }

    const initialState = {
        podcastData: {}
    }
    
    it("should return initial State if the type is invalid",() => {
        const nextState = podcastDataReducer(initialState,{ type: 'InvalidType'} as any);
        expect(nextState).toEqual(initialState)
    });

    it("should return podcast details",() => {
        const nextState = podcastDataReducer(initialState,{
            type: FETCH_PODCAST_DATA,
            payload
        });
        expect(nextState).toStrictEqual(payload)
    })


})

