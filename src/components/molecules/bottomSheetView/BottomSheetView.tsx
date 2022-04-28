import { View, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { isTab, screenWidth } from 'src/shared/utils';
import { Label } from 'src/components/atoms';
import { normalize } from 'src/shared/utils';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';

interface BottomSheetViewProp {
    onPressSignUp: () => void;
    title: string,
    subTitle: string,
    description: string,
    buttonLabel: string,
}
export const BottomSheetView = ({ onPressSignUp, title, subTitle, description, buttonLabel }: BottomSheetViewProp) => {
    const style = useThemeAwareObject(customStyle);

    return (
        <ImageBackground source={require('../../../assets/images/world.png')} style={style.imageBackground}>
            <View>
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
                <TouchableOpacity style={style.buttonView}
                    onPress={onPressSignUp}
                >
                    <Label style={style.buttonLabel}>{buttonLabel}</Label>
                </TouchableOpacity>
            </View>
        </ImageBackground>
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
            fontSize: normalize(30),
            lineHeight: normalize(53),
            color: theme.primary,
            fontWeight: 'bold',
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: normalize(25)
        },
        divider: {
            backgroundColor: theme.primary,
            height: 2,
            width: normalize(52),
            alignSelf: 'center',
            marginTop: normalize(10)
        },
        subTitle: {
            fontSize: normalize(20),
            lineHeight: normalize(22),
            color: theme.primaryBlack,
            fontWeight: 'bold',
            alignSelf: 'center',
            textAlign: 'center',
            marginTop: normalize(25)
        },
        description: {
            fontSize: normalize(19),
            lineHeight: normalize(26),
            color: theme.primaryBlack,
            alignSelf: 'center',
            textAlign: 'center',
            paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
            marginTop: normalize(10)
        },
        buttonView: {
            width: normalize(172),
            height: normalize(46),
            backgroundColor: theme.primary,
            borderRadius: normalize(50),
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: normalize(15)
        },
        buttonLabel: {
            fontSize: normalize(16),
            fontWeight: 'bold',
            color: 'white',
            lineHeight: normalize(25),
            textAlign: 'center'
        }
    })
    return bottomSheetViewStyle
}


export default BottomSheetView;