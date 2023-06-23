import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image, ImageName} from 'src/components/atoms/image/Image'
import {  Label, LabelTypeProp } from 'src/components/atoms/label/Label'
import { ImagesName, Styles } from 'src/shared/styles'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { isTab, normalize } from 'src/shared/utils'
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
    const tabletImageContainerStyle = !isDynamic ? isTab ? style.imageContainerTablet : style.imageContainer : style.dynamicImageContainer;
    const imageStyle = !isDynamic ? style.image : style.dynamicImage;
    const tabletImageStyle = !isDynamic ? style.tabletImage : style.dynamicImage;
    const buttonStyle = isTab ? style.tabletButtonTitle : style.buttonTitle

    const buttonWithArrow = () => {
        return (
            <TouchableOpacity style={style.arrowButtonContainer} onPress={onPress} testID={'arrowId'}>
                <Label style={buttonStyle} children={buttonTitle} labelType={LabelTypeProp.p3} color={Styles.color.greenishBlue} />
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

    if(isTab && !isDynamic) {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={style.tabletContainer} testID={'tabContainerId'}>
                    <View style={StyleSheet.flatten([tabletImageContainerStyle, { backgroundColor: imageBackgroundColor }])}>
                        <Image name={image} style={tabletImageStyle} />
                        <Label children={title} style={style.tabletTitle} />
                        <Label children={description} style={style.tabletDescription} />
                        {!hideButtonTitle && buttonWithArrow()}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    } else {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={style.container} testID={'mobileContainerId'}>
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
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        paddingBottom: normalize(18),
        paddingTop: normalize(12),
        backgroundColor: theme.backgroundColor
    },
    tabletContainer: {
        paddingHorizontal: 20,
        paddingTop: normalize(30),
        backgroundColor: theme.backgroundColor
    },
    imageContainer: {
        width: '100%',
        height: normalize(202),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: normalize(30)
    },
    imageContainerTablet: {
        width: '100%',
        height: 'auto',
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
    tabletImage:{
        width: 120,
        height: 120
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
    tabletButtonTitle: {
        fontSize: normalize(15),
        lineHeight: normalize(36),
        fontWeight: "500",
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
    },
    tabletTitle: {
        fontFamily: fonts.AwsatDigital_Bold,
        marginTop: normalize(17),
        fontSize: normalize(27),
        lineHeight: normalize(42),
        fontWeight: "700",
        color: theme.primaryBlack
    },
    tabletDescription: {
        fontSize: normalize(18),
        lineHeight: normalize(29),
        fontWeight: "400",
        paddingBottom: normalize(20),
        paddingTop: normalize(8),
        fontFamily: fonts.Effra_Regular,
        color: theme.secondaryDavyGrey
    },
})
