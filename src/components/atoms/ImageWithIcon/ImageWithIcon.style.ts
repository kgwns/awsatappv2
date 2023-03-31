import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import {isTab, normalize} from 'src/shared/utils';
import { fonts } from 'src/shared/styles/fonts';

export const ImageWithIconStyle = StyleSheet.create({
    articleImage: {
        width: normalize(263),
        height: normalize(155),
        resizeMode: 'cover',
    },
    tabArticleImage: {
        width: 170,
        height: 100,
        resizeMode: 'cover',
    },
    articleImageLandscape: {
        width: normalize(300),
        height: normalize(200),
        resizeMode: 'cover',
    },
    tagText: {
        paddingVertical: normalize(3),
        paddingHorizontal: normalize(7),
        fontSize: isTab ? 14 : normalize(12),
        color: Styles.color.white,
        fontFamily: fonts.AwsatDigital_Bold,
    },
    bottomTagContainer: {
        position: 'absolute',
        right: 0,
        flexWrap: 'wrap',
        bottom: isTab ? 0 : 5,
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
