import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image, ImageName, Label, LabelTypeProp } from 'src/components/atoms'
import { ImagesName, Styles } from 'src/shared/styles'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { normalize } from 'src/shared/utils'
import { CustomThemeType } from 'src/shared/styles/colors'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { GameType } from 'src/components/screens/games/GameScreen'

export interface GameIntroCardProps {
    type: GameType;
    imageBackgroundColor: string;
    image: ImageName;
    title: string;
    description: string;
    buttonTitle: string;
    hideButtonTitle?: boolean,
    url: string;
    onPress?: () => void
}


export const GameIntroCard = ({
    imageBackgroundColor,
    image,
    title,
    description,
    buttonTitle,
    hideButtonTitle = false,
    onPress
}: GameIntroCardProps) => {
    const style = useThemeAwareObject(customStyle)

    const buttonWithArrow = () => {
        return (
            <TouchableOpacity style={style.arrowButtonContainer} onPress={onPress}>
                <Label style={style.buttonTitle} children={buttonTitle} labelType={LabelTypeProp.p3} color={Styles.color.greenishBlue} />
                {
                    getSvgImages({
                        name: ImagesName.greenArrowLeft,
                        width: 5,
                        height: 8
                    })
                }
            </TouchableOpacity>
        )
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={style.container}>
                <View style={StyleSheet.flatten([style.imageContainer, { backgroundColor: imageBackgroundColor }])}>
                    <Image name={image} style={style.image} />
                </View>
                <Label children={title} labelType={LabelTypeProp.h1} style={style.title} />
                <Label children={description} labelType={LabelTypeProp.p3} style={style.description} />
                {!hideButtonTitle && buttonWithArrow()}
            </View>
        </TouchableWithoutFeedback>
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        paddingBottom: normalize(18),
        paddingTop: normalize(12),
        backgroundColor: theme.backgroundColor
    },
    imageContainer: {
        width: '100%',
        height: normalize(202),
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: normalize(171),
        height: normalize(141),
    },
    arrowButtonContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    buttonTitle: {
        fontSize: normalize(15),
        lineHeight: normalize(36),
        paddingRight: normalize(10)
    },
    title: {
        fontWeight: '400',
        marginTop: normalize(17)
    },
    description: {
        lineHeight: normalize(24),
        paddingBottom: normalize(20),
        paddingTop: normalize(8),
    }
})