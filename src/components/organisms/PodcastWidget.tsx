import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import { Image, Label } from '../atoms';
import { colors } from '../../shared/styles/colors';
import { ImagesName } from '../../shared/styles';

const PodcastWidget = () => {
    return (
        <View style={PodcastWidgetStyle.container}>
            <View style={PodcastWidgetStyle.podcastImageContainer}>
                <Image resizeMode='stretch' url={'https://picsum.photos/200'} style={PodcastWidgetStyle.podcastImage} />
            </View>
            <View style={PodcastWidgetStyle.descriptionContainer}>
                <Label color={colors.black} style={PodcastWidgetStyle.podcastTitle} children={'استمع لبودكاست آخر أخبار اليوم'} />
                <View style={PodcastWidgetStyle.durationContainer}>
                    <Label color={colors.greenishBlue} children={'استمع الي البودكاست '} style={PodcastWidgetStyle.authorTitle} />
                    <Image name={ImagesName.widgetPlayIcon} style={PodcastWidgetStyle.playIcon} />
                    <Label color={colors.spanishGray} children={'3:22'} style={PodcastWidgetStyle.duration} />
                </View>
            </View>
        </View>
    )
}

const PodcastWidgetStyle = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        backgroundColor: colors.cyanGreen,
        flexDirection: 'row',
        height: 72,
        alignContent: 'center'
    },
    podcastImageContainer: {
        width: '22%'
    },
    podcastImage: {
        width: '100%',
        height: '100%'
    },
    descriptionContainer: {
        overflow: 'hidden',
        width: '78%'
    },
    podcastTitle: {
        marginTop: 20,
        marginBottom: 10,
        alignSelf: 'flex-start',
        marginLeft: 10,
        fontSize: 15
    },
    durationContainer: {
        width: '75%',
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    authorTitle: {
        marginLeft: 10
    },
    playIcon: {
        width: 14,
        height: 14,
        marginLeft: 20
    },
    duration: {
        marginLeft: 20
    }
})


export default PodcastWidget;