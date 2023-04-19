import { AppState, Selector } from "../rootReducer";

export const getPodcastData: Selector<any> = (state: AppState)  => state.podcastData;
