import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import {isTab, normalize} from 'src/shared/utils';
import { fonts } from 'src/shared/styles/fonts';
import { colors } from 'src/shared/styles/colors';

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
        paddingVertical: isTab ? normalize(5) : normalize(3),
        paddingHorizontal: normalize(7),
        fontSize: isTab ? 13 : normalize(12),
        color: Styles.color.white,
        fontFamily: isTab ? fonts.Effra_Arbc_Regular : fonts.AwsatDigital_Bold,
        fontWeight: 'bold'
    },
    bottomTagContainer: {
        position: 'absolute',
        right: 0,
        flexWrap: 'wrap',
        bottom: isTab ? 0 : 5,
        opacity: 0.9,
        backgroundColor: Styles.color.darkGreenishBlue,
    },
    tabTimeContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: colors.black55,
        padding: normalize(2),
    },
    playIconPosition: {
        position: 'absolute',
        right: 10,
        flexWrap: 'wrap',
        top: 10
    },
});
