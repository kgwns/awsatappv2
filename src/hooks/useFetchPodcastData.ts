import { useDispatch } from "react-redux"
import { fetchPodcastData } from "src/redux/podcastAnalytics/action";
import { FetchPodcastDataPayloadType } from "src/redux/podcastAnalytics/types";

export const useFetchPodcastData = () => {
    const dispatch = useDispatch();

    const fetchPodcastDataAnalytics = (payload:FetchPodcastDataPayloadType) => {
        dispatch(fetchPodcastData(payload));
    }

    return {
        fetchPodcastDataAnalytics
    }
}
