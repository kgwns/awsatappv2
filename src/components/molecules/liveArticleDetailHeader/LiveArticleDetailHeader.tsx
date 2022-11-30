import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, AppState } from 'react-native'
import { Styles } from 'src/shared/styles'
import { Label } from 'src/components/atoms'
import { normalize } from 'src/shared/utils'
import { colors, CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { fonts } from 'src/shared/styles/fonts'
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants'
import LottieView from 'lottie-react-native';
import LiveAnimation from '../../../assets/lottie-animation/live-icon.json';

export interface LiveArticleDetailHeaderProps {
    timeAgo?: string,
}

const LiveArticleDetailHeader = ({ timeAgo = '' }: LiveArticleDetailHeaderProps) => {

    const liveStyles = useThemeAwareObject(customStyle)
    const [animationRef, setAnimationRef] = useState<LottieView>()
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === "active") {
                if (animationRef) {
                    animationRef?.resume();
                }
            }
            appState.current = nextAppState;
        });
        return () => { subscription.remove(); };
    }, [animationRef]);

    return (
        <View style={liveStyles.container}>
            <View style={liveStyles.liveLogoRowContainer}>
                <LottieView
                    source={LiveAnimation}
                    autoPlay
                    style={liveStyles.liveLogo}
                    ref={ref => setAnimationRef(ref)}
                />
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
