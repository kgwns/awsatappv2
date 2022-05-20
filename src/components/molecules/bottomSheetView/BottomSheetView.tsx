import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { isTab, screenWidth } from 'src/shared/utils';
import { Image, Label } from 'src/components/atoms';
import { normalize } from 'src/shared/utils';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { fonts } from 'src/shared/styles/fonts';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles/images';

interface BottomSheetViewProp {
    onPressSignUp: () => void;
    title: string,
    subTitle: string,
    description: string,
    signUpLabel: string,
    logInLabel: string
}
export const BottomSheetView = ({ onPressSignUp, title, subTitle, description, signUpLabel, logInLabel }: BottomSheetViewProp) => {
    const style = useThemeAwareObject(customStyle);
    const HeaderLogo = () => getSvgImages({ name: ImagesName.logoBlack, width: style.logo.width, height: style.logo.height });
    const AlertImage = () => getSvgImages({ name: ImagesName.popupImage, width: style.popupImage.width, height: style.popupImage.height})

    return (
        <View>
            <View style={style.logoContainer}>
                <HeaderLogo />
            </View>
            <Label style={style.title}>
                {title}
            </Label>
            <View style={style.divider} />
            <Label style={style.subTitle}>
                {subTitle}
            </Label>
            <Label style={style.description}>
                {description}
            </Label>
            <View style={style.buttonContainer}>
                <TouchableOpacity style={StyleSheet.flatten([style.buttonView, { backgroundColor: colors.black }])} onPress={onPressSignUp} >
                    <Label style={StyleSheet.flatten([style.buttonLabel, { color: colors.white }])}>{signUpLabel}</Label>
                </TouchableOpacity>
                <TouchableOpacity style={StyleSheet.flatten([style.buttonView, { backgroundColor: colors.carouselPink }])} onPress={onPressSignUp} >
                    <Label style={StyleSheet.flatten([style.buttonLabel, { color: colors.black }])}>{logInLabel}</Label>
                </TouchableOpacity>
            </View>
            <View style={style.popupImageContainer}>
                <Image fallback name={ImagesName.popupImage} style={style.popupImage} fallbackContent={<AlertImage />} />
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
            fontFamily: fonts.AwsatDigitalBetav10_Black,
            fontSize: normalize(30),
            lineHeight: normalize(53),
            color: colors.black,
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: normalize(25)
        },
        divider: {
            backgroundColor: colors.white,
            height: 2,
            width: normalize(52),
            alignSelf: 'center',
            marginTop: normalize(10)
        },
        subTitle: {
            fontFamily: fonts.AwsatDigitalBetav10_Bold,
            fontSize: normalize(20),
            lineHeight: normalize(32),
            color: colors.black,
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: normalize(20)
        },
        description: {
            fontFamily: fonts.Effra_Arbc_Regular,
            fontSize: normalize(19),
            lineHeight: normalize(32),
            color: colors.black,
            alignSelf: 'center',
            textAlign: 'center',
            paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
            marginTop: normalize(10)
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent:'center'
        },
        buttonView: {
            width: normalize(141),
            height: normalize(46),
            borderRadius: normalize(50),
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: normalize(35),
            marginHorizontal: normalize(10)
        },
        buttonLabel: {
            fontFamily: fonts.AwsatDigitalBetav10_Bold,
            fontSize: normalize(16),
            lineHeight: normalize(25),
            textAlign: 'center'
        },
        logoContainer: {
            alignSelf: 'center',
            marginTop:normalize(50)
        },
        logo: {
            width: normalize(200),
            height: normalize(35),
        },
        popupImageContainer: {
            alignSelf:'center',
            width: normalize(250),
            height: normalize(243),
            marginTop: normalize(20)
        },
        popupImage: {
            width: '100%',
            height: '100%'
        }
    })
    return bottomSheetViewStyle
}


export default BottomSheetView;