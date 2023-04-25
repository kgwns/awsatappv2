import { useEffect, useRef } from "react"
import { useProgress } from "react-native-track-player";
import { AnalyticsEvents, recordLogEvent } from "./analytics";
import { useFetchPodcastData } from "src/hooks";

export const PodcastAnalyticsManager = () => {
    const progress = useProgress();
    const { podcastData } = useFetchPodcastData();
    const { content_title,content_duration,content_type} = podcastData;
    const currentDataRef = useRef<number>(0);

    const podcastAnalytics = () => {
        const percentageData = Math.floor((progress.position / progress.duration) * 100)
        let eventParameter:any = {
            content_title,
            content_duration,
            content_type,
        }

        const progressDataSet = [ 10, 25, 50, 75, 100 ];
        const currentIndex = progressDataSet.findIndex((item) => item === currentDataRef.current);
        const nextValue = currentIndex > -1 ? progressDataSet[currentIndex + 1] : 10;

        if ((percentageData >= nextValue) && (currentDataRef.current < nextValue)) {
            eventParameter = {
                ...eventParameter,
                progress_percentage: nextValue
            }
            const eventName = nextValue === 100 ? AnalyticsEvents.PODCAST_COMPLETED : 
                AnalyticsEvents.PODCAST_PROGRESS;
            recordLogEvent(eventName, eventParameter);
            currentDataRef.current = nextValue
        } else if (percentageData < 10) {
            currentDataRef.current = 0;
        }  
    }

    useEffect(() => {
        podcastAnalytics();
    },[progress])

    return null
}
