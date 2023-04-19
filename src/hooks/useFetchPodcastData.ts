import { useDispatch, useSelector } from "react-redux"
import { fetchPodcastData } from "src/redux/podcastAnalytics/action";
import { FetchPodcastDataPayloadType } from "src/redux/podcastAnalytics/types";
import { getPodcastData } from "src/redux/podcastAnalytics/selectors";

export const useFetchPodcastData = () => {
    const dispatch = useDispatch();
    const podcastData = useSelector(getPodcastData);

    const fetchPodcastDataAnalytics = (payload:FetchPodcastDataPayloadType) => {
        dispatch(fetchPodcastData(payload));
    }

    return {
        fetchPodcastDataAnalytics,
        podcastData
    }
}
