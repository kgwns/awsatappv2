import { Linking } from "react-native";
import { onPodcastServicePress } from "../onPodcastServicePress"
const data = {
    anghami: {
        url: 'anghami@test.com',
    },
    apple_podcasts: {
        url: 'apple@test.com',
    },
    google_podcast: {
        url: 'google@test.com',
    },
    spotify: {
        url: 'spotify@test.com',
    },
}

describe("test onPodcastServicePress", () => {
    it("should open anghami url", () => {
        onPodcastServicePress(data, 'anghami');
        expect(Linking.openURL).toHaveBeenCalled();
        expect(Linking.openURL).toHaveBeenCalledWith('anghami@test.com');
    })
    it("should open google_podcast url", () => {
        onPodcastServicePress(data, 'google_podcast');
        expect(Linking.openURL).toHaveBeenCalled();
        expect(Linking.openURL).toHaveBeenCalledWith('google@test.com');
    })
    it("should open spotify url", () => {
        onPodcastServicePress(data, 'spotify');
        expect(Linking.openURL).toHaveBeenCalled();
        expect(Linking.openURL).toHaveBeenCalledWith('spotify@test.com');
    })
    it("should open apple_podcasts url", () => {
        onPodcastServicePress(data, 'apple_podcasts');
        expect(Linking.openURL).toHaveBeenCalled();
        expect(Linking.openURL).toHaveBeenCalledWith('apple@test.com');
    })
    it("should render default block", () => {
        const instance = onPodcastServicePress(data, '');
        expect(instance).toBeUndefined();
    })
})