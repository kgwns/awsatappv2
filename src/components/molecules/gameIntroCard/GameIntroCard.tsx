import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image, ImageName, Label, LabelTypeProp } from 'src/components/atoms'
import { ImagesName, Styles } from 'src/shared/styles'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { normalize } from 'src/shared/utils'
import { CustomThemeType } from 'src/shared/styles/colors'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { GameType } from 'src/components/screens/games/GameScreen'
import { fonts } from 'src/shared/styles/fonts'

export interface GameIntroCardProps {
    type: GameType;
    imageBackgroundColor: string;
    image: ImageName;
    title: string;
    description: string;
    buttonTitle: string;
    hideButtonTitle?: boolean,
    url: string;
    onPress?: () => void;
    isDynamic: boolean;
}


export const GameIntroCard = ({
    type,
    imageBackgroundColor,
    image,
    title,
    description,
    buttonTitle,
    hideButtonTitle = false,
    isDynamic = false,
    onPress
}: GameIntroCardProps) => {
    const style = useThemeAwareObject(customStyle)
    const imageContainerStyle = !isDynamic ? style.imageContainer : style.dynamicImageContainer;
    const imageStyle = !isDynamic ? style.image : style.dynamicImage;

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
                <View style={StyleSheet.flatten([imageContainerStyle, { backgroundColor: imageBackgroundColor }])}>
                    <Image name={image} style={imageStyle} />
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
        paddingVertical: normalize(30)
    },
    dynamicImageContainer: {
        width: '100%',
        height: normalize(202),
        paddingVertical: normalize(30)
    },
    image:{
        width: 129,
        height: 129
    },
    dynamicImage: {
        width: '100%',
        height: '100%'
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
        marginRight: normalize(10),
        fontFamily: fonts.Effra_Arbc_Medium,
    },
    title: {
        fontFamily: fonts.AwsatDigital_Bold,
        marginTop: normalize(17),
        fontSize: normalize(27),
        lineHeight: normalize(42),
        fontWeight: 'normal'
    },
    description: {
        lineHeight: normalize(24),
        paddingBottom: normalize(20),
        paddingTop: normalize(8),
        fontFamily: fonts.Effra_Regular,
        color: theme.secondaryDavyGrey
    }
})
