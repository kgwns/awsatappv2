import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Label } from '..'
import { ImagesName, Styles } from 'src/shared/styles'
import { fonts } from 'src/shared/styles/fonts'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants'

interface LiveBlogTagProps {
    isImageTag?: boolean;
    enableTopMargin?: boolean;
}

export const LiveBlogTag = ({ isImageTag = false, enableTopMargin = false }: LiveBlogTagProps) => {

    const renderLiveIcon = () => {
        return getSvgImages({
            name: ImagesName.liveIcon,
            width: 17,
            height: 13,
        });
    }

    return (
        <View style={[isImageTag ? liveBlogTagStyle.imageLiveTagContainer : liveBlogTagStyle.liveTagContainer, enableTopMargin && liveBlogTagStyle.topMargin]}>
            <View style={liveBlogTagStyle.liveTagRowContainer}>
                {renderLiveIcon()}
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
        // width: 'auto',
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
    }
})
