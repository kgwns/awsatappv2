import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import { Image, Label } from '../atoms';
import { colors } from '../../shared/styles/colors';
import { ImagesName } from '../../shared/styles';
import { normalize, screenWidth } from '../../shared/utils';

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
                    <Image name={ImagesName.greenPlayIcon} style={PodcastWidgetStyle.playIcon} />
                    <Label color={colors.spanishGray} children={'3:22'} style={PodcastWidgetStyle.duration} />
                </View>
            </View>
        </View>
    )
}

const PodcastWidgetStyle = StyleSheet.create({
    container: {
        marginHorizontal: 0.04 * screenWidth,
        marginVertical: normalize(15),
        backgroundColor: colors.cyanGreen,
        flexDirection: 'row',
        height: normalize(71),
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
        marginTop: normalize(19),
        marginBottom: normalize(10),
        alignSelf: 'flex-start',
        marginLeft: normalize(10),
        fontSize: 15
    },
    durationContainer: {
        width: '75%',
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    authorTitle: {
        marginLeft: normalize(10)
    },
    playIcon: {
        width: normalize(13),
        height: normalize(13),
        marginLeft: normalize(19)
    },
    duration: {
        marginLeft: normalize(19)
    }
})


export default PodcastWidget;