import { View, StyleSheet } from 'react-native'
import React from 'react'
import ToggleSwitch from 'toggle-switch-react-native'
import { Styles } from 'src/shared/styles'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { normalize } from 'src/shared/utils'
import { fonts } from 'src/shared/styles/fonts'

export interface ToggleWithLabelProps {
    title: string,
    isActive: boolean,
    onPress(isOn: boolean): void
}

export const ToggleWithLabel = ({
    title,
    isActive,
    onPress
}: ToggleWithLabelProps) => {
    const { themeData } = useTheme()
    const style = useThemeAwareObject(customStyle)
    return (
        <View>
            <ToggleSwitch
                isOn={isActive}
                onColor={Styles.color.cyanGreen}
                offColor={Styles.color.cyanGreen}
                label={title}
                labelStyle={style.toggleLabel}
                size="large"
                circleColor={themeData.secondaryWhite}
                onToggle={isOn => onPress(isOn)}
            />
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => (
    StyleSheet.create({
        toggleLabel: {
            color: theme.secondaryMediumGrey,
            fontSize: normalize(12),
            lineHeight: normalize(18),
            textAlign: 'left',
            fontFamily: fonts.AwsatDigital_Regular,
        }
    })
)
