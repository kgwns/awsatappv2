import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { ButtonImage, Image, Label, LabelTypeProp } from 'src/components/atoms'
import { ImagesName } from 'src/shared/styles'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { normalize } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { MINI_PLAYER_PODCAST_TITLE } from 'src/constants/SharedConstants'
import { DUMMY_IMAGE_URL } from 'src/services/apiUrls'
import { ImageResize } from 'src/shared/styles/text-styles'

export const PodCastMiniPlayer = () => {
    const { themeData } = useTheme()
    const style = useThemeAwareObject(customStyle)
    return (
        <View style={style.container}>
            <View style={style.leftContainer}>
                <View style={style.leftStyle}>
                    <Image url={DUMMY_IMAGE_URL} style={style.image} resizeMode={ImageResize.COVER} />
                    <Label children={MINI_PLAYER_PODCAST_TITLE}
                        labelType={LabelTypeProp.h4}
                        style={style.title} numberOfLines={2}
                    />
                </View>
                <View style={style.rightStyle}>
                    <ButtonImage
                        icon={() => {
                            return getSvgImages({
                                name: ImagesName.playIconSVG,
                                size: normalize(18),
                                fill: themeData.primary
                            });
                        }}
                        onPress={() => { }}
                    />
                </View>
            </View>
            <View style={style.divider} />
            <View style={style.rightContainer}>
                <ButtonImage
                    icon={() => {
                        return getSvgImages({
                            name: ImagesName.closeSVG,
                            size: normalize(12),
                            fill: themeData.primaryBlack
                        });
                    }}
                    onPress={() => { }}
                />
            </View>
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.secondaryWhite,
            flexDirection: 'row'
        },
        leftContainer: {
            flex: 1,
            flexDirection: 'row',
            paddingBottom: normalize(30),
            paddingHorizontal: normalize(10),
            paddingTop: normalize(10)
        },
        image: {
            width: normalize(46),
            height: normalize(41)
        },
        title: {
            marginHorizontal: normalize(15),
            alignSelf: 'center',
        },
        leftStyle: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        rightStyle: {
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'flex-end',
        },
        rightContainer: {
            justifyContent: 'center',
            paddingBottom: normalize(30),
            paddingHorizontal: normalize(20),
            paddingTop: normalize(10)
        },
        divider: {
            width: 0.5,
            height: '100%',
            backgroundColor: '#E0E0E0'
        }
    })
}