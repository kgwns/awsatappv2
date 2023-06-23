import { View, StyleSheet } from 'react-native'
import React, { FunctionComponent } from 'react'
import { Label } from 'src/components/atoms/label/Label'
import { fonts } from 'src/shared/styles/fonts'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { colors, CustomThemeType } from 'src/shared/styles/colors'
import { useAppCommon } from 'src/hooks'
import { isDarkTheme } from 'src/shared/utils'

export interface StepLineCircleProps {
    currentStep: number;
    totalStep?: number,
}

export const StepLineCircle: FunctionComponent<StepLineCircleProps> = ({
    currentStep,
    totalStep = 4,
}) => {
    const style = useThemeAwareObject(stepLineCircleStyle);
    const { theme } = useAppCommon()
    const isDarkMode = isDarkTheme(theme)
    const renderCircle = (step: number, totalStep: number) => {
        const left = step === 1 ? -15 : step === totalStep ? '99%' : `${(step - 1) * (100 / (totalStep - 1))}%`;
        const backgroundColor = step == currentStep ? colors.greenishBlue : (isDarkMode ? colors.black : colors.cyanGray);
        const borderColor = step == currentStep ? colors.greenishBlue : (isDarkMode ? colors.white : colors.cyanGray);
        return (
            <View key={step} style={[style.circleContainer, { backgroundColor: backgroundColor, left: left, borderWidth: 1, borderColor: borderColor }]}>
                <Label children={step.toString()} style={style.labelStyle} />
            </View>
        )
    }
    return (
        <View style={style.containerStyle}>
            <View style={style.lineContainer} />
            {Array.from({ length: totalStep }, (_, index) => index + 1).map((item) => renderCircle(item, totalStep))}
        </View>
    )
}

const stepLineCircleStyle = (theme: CustomThemeType) =>
    StyleSheet.create({
        containerStyle: {
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        lineContainer: {
            width: '100%',
            height: 1,
            backgroundColor: colors.cyanGray
        },
        circleContainer: {
            position: 'absolute',
            height: 24,
            width: 24,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
        },
        labelStyle: {
            color: colors.white,
            fontSize: 16,
            lineHeight: 20,
            fontFamily: fonts.AwsatDigitalV2_Bold,
            paddingTop: 3
        }
    });
