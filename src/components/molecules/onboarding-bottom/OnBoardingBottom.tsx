import { View, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { colors } from 'src/shared/styles/colors';
import { isDarkTheme } from 'src/shared/utils';
import { useAppCommon } from 'src/hooks';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import LinearGradient from 'react-native-linear-gradient';
import { NextButton } from 'src/components/atoms';
import { fonts } from 'src/shared/styles/fonts';

type OnBoardingBottomType = {
    title: string;
    disableNext?: boolean;
    onPressNext(): void;
}

export const OnBoardingBottom: FC<OnBoardingBottomType> = ({
    title,
    disableNext,
    onPressNext,
}) => {
    const style = useThemeAwareObject(customStyle);
    const nextButtonStyles = useThemeAwareObject(tabletNextButtonStyle);

    const { theme } = useAppCommon();
    const isDarkMode = isDarkTheme(theme);

    const gradient = isDarkMode ? [colors.blackOpacity0, colors.blackOpacity80, colors.blackOpacity100] : [colors.whiteOpacity0, colors.whiteOpacity80, colors.whiteOpacity100];
    return (
        <View style={style.bottomContainer}>
            <LinearGradient colors={gradient} style={style.linearGradient} />
            <NextButton
                testID="nextButtonTestId"
                title={title}
                disabled={disableNext}
                onPress={onPressNext}
                style={nextButtonStyles}
                icon={false}
            />
        </View>
    )
};

const customStyle = () => {
    return StyleSheet.create({
        bottomContainer: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            height: 211,
            alignItems: 'center',
            justifyContent: 'center',
        },
        linearGradient: {
            position: 'absolute',
            width: '100%',
            height: '100%'
        },
    });
};

const tabletNextButtonStyle = () =>
    StyleSheet.create({
        nextButtonContainer: {
            height: 54,
            backgroundColor: colors.greenishBlue,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
            width: 250,
            paddingHorizontal: 8
        },
        nextButtonText: {
            fontFamily: fonts.AwsatDigital_Bold,
            color: colors.white,
            textAlign: 'center',
            width: '100%',
            fontSize: 20,
            paddingTop: 5,
            lineHeight: 28,
        },
    });

