import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';
import { fonts } from 'src/shared/styles/fonts';

export const ImageWithIconStyle = StyleSheet.create({
    articleImage: {
        width: normalize(263),
        height: normalize(155),
        resizeMode: 'cover',
    },
    tagText: {
        paddingVertical: normalize(3),
        paddingHorizontal: normalize(7),
        fontSize: normalize(12),
        color: Styles.color.white,
        fontFamily: fonts.AwsatDigitalBetav10_Bold,
    },
    bottomTagContainer: {
        position: 'absolute',
        right: 0,
        flexWrap: 'wrap',
        bottom: 5,
        opacity: 0.9,
        backgroundColor: Styles.color.darkGreenishBlue,
    },
    playIconPosition: {
        position: 'absolute',
        right: normalize(10),
        flexWrap: 'wrap',
        top: normalize(10)
    },
    iconStyle: {
        width: normalize(29),
        height: normalize(29)
    }
});