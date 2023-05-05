import { FETCH_PODCAST_DATA } from "./actionTypes";

export interface FetchPodcastDataPayloadType {
    content_title: string,
    content_duration: string,
    content_type: string,
}

export type FetchPodcastDataType = {
    type: typeof FETCH_PODCAST_DATA,
    payload: FetchPodcastDataPayloadType
}

export type FetchPodcastDataAction = FetchPodcastDataType;
