import { View, StyleSheet, AppState } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Label } from '..'
import { ImagesName, Styles } from 'src/shared/styles'
import { fonts } from 'src/shared/styles/fonts'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { TranslateConstants, TranslateKey } from 'src/constants/Constants'
import LottieView from 'lottie-react-native';
import LiveAnimation from '../../../assets/lottie-animation/live-icon.json';

interface LiveBlogTagProps {
    isImageTag?: boolean;
    enableTopMargin?: boolean;
    isTextTag?: boolean;
    enableBottomMargin?: boolean;
}

export const LiveBlogTag = ({ isImageTag = false, enableTopMargin = false, isTextTag = false, enableBottomMargin = false }: LiveBlogTagProps) => {

    const [animationRef, setAnimationRef] = useState<LottieView>()
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            if (appState?.current?.match(/inactive|background/) && nextAppState === "active") {
                if (animationRef) {
                    animationRef?.resume();
                }
            }
            appState.current = nextAppState;
        });
        return () => { 
            subscription.remove(); 
        };
    }, [animationRef]);

    // const renderLiveIcon = () => {
    //     return getSvgImages({
    //         name: ImagesName.liveIcon,
    //         width: 17,
    //         height: 13,
    //     });
    // }

    return (
        <View style={[isImageTag ? liveBlogTagStyle.imageLiveTagContainer : liveBlogTagStyle.liveTagContainer,
        enableTopMargin && liveBlogTagStyle.topMargin,
        enableBottomMargin && liveBlogTagStyle.bottomMargin,]}>
            <View style={liveBlogTagStyle.liveTagRowContainer}>
                < LottieView
                    source={LiveAnimation}
                    autoPlay
                    style={liveBlogTagStyle.lottieViewStyle}
                    ref={ref => setAnimationRef(ref)}
                />
                <Label children={TranslateConstants({ key: TranslateKey.LIVE_TAG_TITLE })}
                    style={liveBlogTagStyle.liveTagText}
                />
            </View>
        </View>
    )
}


const liveBlogTagStyle = StyleSheet.create({
    imageLiveTagContainer: {
        position: 'absolute',
        left: 0,
        backgroundColor: Styles.color.darkWineRed,
        flexWrap: 'wrap',
        width: 'auto'
    },
    liveTagContainer: {
        alignSelf: 'flex-start',
        backgroundColor: Styles.color.darkWineRed,
        flexWrap: 'wrap',
    },
    liveTagText: {
        color: Styles.color.white,
        fontFamily: fonts.Effra_Arbc_Medium,
        fontSize: 15,
        lineHeight: 36,
        marginLeft: 5
    },
    liveTagRowContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    topMargin: {
        marginTop: 10
    },
    bottomMargin: {
        marginBottom: 10
    },
    lottieViewStyle: {
        width: 17,
        height: 13, 
        marginRight: 3
    }
})
