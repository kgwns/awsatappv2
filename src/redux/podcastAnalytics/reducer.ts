import { FETCH_PODCAST_DATA } from "./actionTypes";
import { FetchPodcastDataAction } from "./types";

const initialData = {
    podcastData:{}
}

export default (state = initialData,action: FetchPodcastDataAction) => {
    if(action.type === FETCH_PODCAST_DATA){
        state.podcastData = {...action.payload}
        return state.podcastData
    } else {
        return state
    }
}
