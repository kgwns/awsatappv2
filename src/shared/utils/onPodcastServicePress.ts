import { Linking } from "react-native";
import { podcastServices } from "src/constants/Constants";

export const onPodcastServicePress = (podcastSectionData:any,podcastService: string) => {
    switch (podcastService) {
        case podcastServices.anghami:
            Linking.openURL(podcastSectionData.anghami.url);
            return;
        case podcastServices.apple:
            Linking.openURL(podcastSectionData.apple_podcasts.url)
            return;
        case podcastServices.google:
            Linking.openURL(podcastSectionData.google_podcast.url);
            return;
        case podcastServices.spotify:
            Linking.openURL(podcastSectionData.spotify.url)
            return;
        default:
            return;
    }
}
