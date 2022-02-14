import {StyleSheet} from 'react-native';
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';
export const ImageWithIconStyle = StyleSheet.create({
    articleImage: {
        width: normalize(263),
        height: normalize(155),
        padding: normalize(20),
        resizeMode: 'stretch'
    },
    tagText: {
        paddingVertical: normalize(3),
        paddingHorizontal: normalize(7),
        fontSize: normalize(12),
        color: Styles.color.white,
        fontWeight: 'bold',
        backgroundColor: Styles.color.darkGreenishBlue,
        
    },
    bottomTagContainer: {
        position: 'absolute',
        right: 0,
        flexWrap: 'wrap',
        bottom: 5,
        opacity: 0.6

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