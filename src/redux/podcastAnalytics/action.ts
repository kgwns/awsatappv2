import { FETCH_PODCAST_DATA } from "./actionTypes"
import { FetchPodcastDataPayloadType } from "./types"

export const fetchPodcastData = (payload:FetchPodcastDataPayloadType) => {
    return{
        type: FETCH_PODCAST_DATA,
        payload
    }
}
