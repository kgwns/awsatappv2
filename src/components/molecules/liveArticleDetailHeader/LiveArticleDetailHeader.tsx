import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Styles } from 'src/shared/styles'
import { Label } from 'src/components/atoms/label/Label'
import { normalize } from 'src/shared/utils'
import { colors, CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { fonts } from 'src/shared/styles/fonts'
import { TranslateConstants, TranslateKey } from 'src/constants/Constants'
import LiveAnimation from '../../../assets/lottie-animation/live-icon.json';
import { LottieViewAnimation } from 'src/shared/utils/LottieViewAnimation';

export interface LiveArticleDetailHeaderProps {
    timeAgo?: string,
}

const LiveArticleDetailHeader = ({ timeAgo = '' }: LiveArticleDetailHeaderProps) => {

    const liveStyles = useThemeAwareObject(customStyle)

    return (
        <View style={liveStyles.container}>
            <View style={liveStyles.liveLogoRowContainer}>
                <LottieViewAnimation 
                    source={LiveAnimation} 
                    style={liveStyles.liveLogo}/>
                <Label children={TranslateConstants({ key: TranslateKey.LIVE_TAG_TITLE })}
                    style={liveStyles.liveLogoText}
                />
                <View style={liveStyles.separator} />
            </View>
            <View style={liveStyles.timeAgoContainer}>

                <Label children={timeAgo}
                    style={liveStyles.timeAgoText}
                />
            </View>
        </View>
    )
}

export default LiveArticleDetailHeader;

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        height: normalize(46),
        backgroundColor: colors.darkWineRed,
        alignSelf: 'center',
        marginHorizontal: '5%'
    },
    liveLogoRowContainer: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'flex-end',
        alignSelf: 'flex-start'
    },
    liveLogo: {
        width: normalize(26),
        height: normalize(20),
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 1,
        marginRight: 2
    },
    liveLogoText: {
        color: Styles.color.white,
        fontFamily: fonts.Effra_Arbc_Medium,
        fontSize: 22,
        lineHeight: 45,
        marginLeft: 5,
        marginRight: 25,
        fontWeight: '900'
    },
    separator: {
        position: 'absolute',
        right: 0,
        width: 1,
        height: normalize(24),
        backgroundColor: colors.white,
        alignSelf: 'center',
        alignContent: 'flex-end',
        marginRight: 10
    },
    timeAgoContainer: {
        width: '40%'
    },
    timeAgoText: {
        position: 'absolute',
        left: 0,
        color: Styles.color.white,
        fontFamily: fonts.Effra_Arbc_Medium,
        fontSize: 18,
        lineHeight: 45,
    },
})
