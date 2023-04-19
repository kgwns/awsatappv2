import { useEffect, useRef } from "react"
import { useProgress } from "react-native-track-player";
import { recordLogEvent } from "./analytics";
import { useFetchPodcastData } from "src/hooks";

export const PodcastAnalyticsManager = () => {
    const progress = useProgress();
    const { podcastData } = useFetchPodcastData();
    const { content_title,content_duration,content_type} = podcastData;
    const ref = useRef<number>(0);

    const podcastAnalytics = () => {
        const percentageData = Math.floor((progress.position / progress.duration) * 100)
        let eventParameter:any = {
            content_title,
            content_duration,
            content_type,
        }
        if((percentageData >= 10) && (ref.current < 10)) {
            eventParameter = {
                ...eventParameter,
                progress_percentage: 10
            }
            recordLogEvent('podcast_progress', eventParameter);
            ref.current = 10
        } else if((percentageData >= 25) && (ref.current < 25)) {
            eventParameter = {
                ...eventParameter,
                progress_percentage: 25
            }
            recordLogEvent('podcast_progress', eventParameter);
            ref.current = 25
        } else if((percentageData >= 50) && (ref.current < 50)) {
            eventParameter = {
                ...eventParameter,
                progress_percentage: 50
            }
            recordLogEvent('podcast_progress', eventParameter);
            ref.current = 50
        } else if((percentageData >= 75) && (ref.current < 75)) {
            eventParameter = {
                ...eventParameter,
                progress_percentage: 75
            }
            recordLogEvent('podcast_progress', eventParameter);
            ref.current = 75
        } else if((percentageData >= 100) && (ref.current < 100)) {
            eventParameter = {
                ...eventParameter,
                is_completed: 1
            }
            recordLogEvent('podcast_completed', eventParameter);
            ref.current = 0;
        } else if(percentageData < 10) {
            ref.current = 0;
        }
        
    }

    useEffect(() => {
        podcastAnalytics();
    },[progress])

return (
    null
)}
