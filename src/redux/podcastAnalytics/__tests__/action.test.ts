import { fetchPodcastData } from "../action"
import { FETCH_PODCAST_DATA } from "../actionTypes"

describe("PodcastAnalytics action", () => {
    const payload = {
        content_title: 'title',
        content_duration: 'duration',
        content_type: 'podcast'
    }
    const response = {
        type: FETCH_PODCAST_DATA,
        payload
    }
    it("Check the podcast data returns response",() => {
        const result = fetchPodcastData(payload);
        expect(result).toEqual(response);
    })
})