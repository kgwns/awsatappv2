import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { isTab, screenWidth, normalize, isIOS } from 'src/shared/utils';
import { Image, Label } from 'src/components/atoms';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { fonts } from 'src/shared/styles/fonts';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles/images';

interface BottomSheetViewProp {
    onPressSignUp: () => void;
    title: string,
    subTitle?: string,
    description: string,
    signUpLabel: string,
    logInLabel: string
}
export const BottomSheetView = ({ onPressSignUp, title, subTitle, description, signUpLabel, logInLabel }: BottomSheetViewProp) => {
    const style = useThemeAwareObject(customStyle);
    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return isTab ? true : dim.height >= dim.width;
    };

    const HeaderLogo = () => getSvgImages({ name: ImagesName.logoBlack, width: style.logo.width, height: style.logo.height });
    const HeaderLogoLandscape = () => getSvgImages({ name: ImagesName.logoBlack, width: style.logoLandscape.width, height: style.logoLandscape.height });
    const AlertImage = () => getSvgImages({ name: ImagesName.popupImage, width: style.popupImage.width, height: style.popupImage.height })

    return (
        <View>
            <View style={isPortrait() ? style.logoContainer : style.logoContainerLandscape}>
                {isPortrait() ? <HeaderLogo /> : <HeaderLogoLandscape />}
            </View>
            <Label style={isPortrait() ? style.title : style.titleLandscape}>
                {title}
            </Label>
            <View style={isPortrait() ? style.divider : style.dividerLandscape} />
            <Label style={isPortrait() ? style.description : style.descriptionLandscape}>
                {description}
            </Label>
            <View style={style.buttonContainer}>
                <TouchableOpacity style={StyleSheet.flatten([isPortrait() ? style.buttonView : style.buttonViewLandscape, { backgroundColor: colors.black }])} onPress={onPressSignUp} >
                    <Label style={StyleSheet.flatten([isPortrait() ? style.buttonLabel : style.buttonLabelLandscape, { color: colors.white }])}>{signUpLabel}</Label>
                </TouchableOpacity>
                <TouchableOpacity style={StyleSheet.flatten([isPortrait() ? style.buttonView : style.buttonViewLandscape, { backgroundColor: colors.carouselPink }])} onPress={onPressSignUp} >
                    <Label style={StyleSheet.flatten([isPortrait() ? style.buttonLabel : style.buttonLabelLandscape, { color: colors.black }])}>{logInLabel}</Label>
                </TouchableOpacity>
            </View>
            <View style={isPortrait() ? style.popupImageContainer : style.popupImageContainerLandscape}>
                <Image fallback name={ImagesName.popupImage} style={style.popupImage} fallbackContent={<AlertImage />} fallbackName={ImagesName.popupImage} />
            </View>
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => {
    const bottomSheetViewStyle = StyleSheet.create({
        imageBackground: {
            flex: 1,
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        },
        title: {
            fontFamily: fonts.AwsatDigital_Black,
            fontSize: normalize(30),
            lineHeight: normalize(53),
            color: colors.black,
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: normalize(25)
        },
        titleLandscape: {
            fontFamily: fonts.AwsatDigital_Black,
            fontSize: normalize(20),
            lineHeight: normalize(33),
            color: colors.black,
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: normalize(10)
        },
        divider: {
            backgroundColor: colors.white,
            height: 2,
            width: normalize(52),
            alignSelf: 'center',
            marginTop: normalize(10)
        },
        dividerLandscape: {
            backgroundColor: colors.white,
            height: 2,
            width: normalize(52),
            alignSelf: 'center',
            marginTop: normalize(5)
        },
        subTitle: {
            fontFamily: fonts.AwsatDigital_Bold,
            fontSize: normalize(20),
            lineHeight: normalize(32),
            color: colors.black,
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: normalize(20)
        },
        description: {
            fontFamily: fonts.Effra_Arbc_Regular,
            fontSize: 19,
            lineHeight: 32,
            color: colors.black,
            alignSelf: 'center',
            textAlign: 'center',
            paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
            marginTop: isTab ? normalize(45) : normalize(35)
        },
        descriptionLandscape: {
            fontFamily: fonts.Effra_Arbc_Regular,
            fontSize: 15,
            lineHeight: 22,
            color: colors.black,
            alignSelf: 'center',
            textAlign: 'center',
            paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
            marginTop: isIOS ? 5 : 20
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'center'
        },
        buttonView: {
            width: normalize(141),
            height: normalize(46),
            borderRadius: normalize(50),
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: isTab ? normalize(5) : normalize(10),
            marginHorizontal: normalize(10)
        },
        buttonViewLandscape: {
            width: normalize(72),
            height: normalize(23),
            borderRadius: normalize(50),
            alignSelf: 'center',
            justifyContent: 'center',
            marginHorizontal: normalize(10)
        },
        buttonLabel: {
            fontFamily: fonts.AwsatDigital_Bold,
            fontSize: normalize(16),
            lineHeight: normalize(25),
            textAlign: 'center'
        },
        buttonLabelLandscape: {
            fontFamily: fonts.AwsatDigital_Bold,
            fontSize: normalize(10),
            lineHeight: normalize(16),
            textAlign: 'center'
        },
        logoContainer: {
            alignSelf: 'center',
            marginTop: normalize(50)
        },
        logoContainerLandscape: {
            alignSelf: 'center',
            marginTop: normalize(20)
        },
        logo: {
            width: normalize(200),
            height: normalize(35),
        },
        logoLandscape: {
            width: normalize(150),
            height: normalize(25),
        },
        popupImageContainer: {
            alignSelf: 'center',
            width: normalize(250),
            height: normalize(243),
            marginTop: normalize(35)
        },
        popupImageContainerLandscape: {
            alignSelf: 'center',
            width: normalize(100),
            height: normalize(143),
        },
        popupImage: {
            width: '100%',
            height: '100%'
        }
    })
    return bottomSheetViewStyle
}


export default BottomSheetView;
