import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Label } from '..'
import { Styles } from 'src/shared/styles'
import { fonts } from 'src/shared/styles/fonts'
import { TranslateConstants, TranslateKey } from 'src/constants/Constants'
import LiveAnimation from '../../../assets/lottie-animation/live-icon.json';
import { LottieViewAnimation } from 'src/shared/utils/LottieViewAnimation';
import { isTab } from 'src/shared/utils'

interface LiveBlogTagProps {
    isImageTag?: boolean;
    enableTopMargin?: boolean;
    isTextTag?: boolean;
    enableBottomMargin?: boolean;
}

export const LiveBlogTag = ({ isImageTag = false, enableTopMargin = false, isTextTag = false, enableBottomMargin = false }: LiveBlogTagProps) => {

    return (
        <View style={[isImageTag ? liveBlogTagStyle.imageLiveTagContainer : liveBlogTagStyle.liveTagContainer,
        enableTopMargin && liveBlogTagStyle.topMargin,
        enableBottomMargin && liveBlogTagStyle.bottomMargin,]}>
            <View style={liveBlogTagStyle.liveTagRowContainer}>
                <LottieViewAnimation 
                    source={LiveAnimation} 
                    style = {liveBlogTagStyle.lottieViewStyle} />
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
        marginTop: isTab ? 0 : 10
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
