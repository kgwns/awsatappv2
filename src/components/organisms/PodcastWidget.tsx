import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import { Image, Label } from '../atoms';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { ImagesName } from 'src/shared/styles';
import { normalize, screenWidth } from 'src/shared/utils';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTheme } from 'src/shared/styles/ThemeProvider';

const PodcastWidget = () => {
    const {themeData} = useTheme()
    const style = useThemeAwareObject(createStyles)

    return (
        <View style={style.container}>
            <View style={style.podcastImageContainer}>
                <Image resizeMode='stretch' url={'https://picsum.photos/200'} style={style.podcastImage} />
            </View>
            <View style={style.bodyContainer}>
                <Label color={themeData.primaryBlack} style={style.podcastTitle} children={'استمع لبودكاست آخر أخبار اليوم'} />
                <View style={style.durationContainer}>
                    <Label color={colors.greenishBlue} children={'استمع الي البودكاست '} style={style.authorTitle} />
                    <Image name={ImagesName.greenPlayIcon} style={style.playIcon} />
                    <Label color={colors.spanishGray} children={'3:22'} style={style.duration} />
                </View>
            </View>
        </View>
    )
}


const createStyles = (theme: CustomThemeType) => {
    const podcastWidgetStyle = StyleSheet.create({
        container: {
            marginHorizontal: 0.04 * screenWidth,
            marginVertical: normalize(15),
            backgroundColor: theme.secondaryGreen,
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
        bodyContainer: {
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
    return podcastWidgetStyle
}

export default PodcastWidget;