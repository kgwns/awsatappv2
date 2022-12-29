import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { LabelTypeProp } from 'src/components/atoms/label/Label'
import { WidgetHeaderElement } from 'src/components/atoms/widgetHeader/WidgetHeaderElement'
import { fonts } from 'src/shared/styles/fonts'

export interface HeaderElementProps {
    title?: string,
    icon?: ()=> void,
    color?: string,
    labelType?: LabelTypeProp,
    clickable?: boolean,
    onPress?: () => void,
    elementContainerStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
}

export interface WidgetHeaderProps {
    headerLeft?: HeaderElementProps,
    headerRight?: HeaderElementProps,
    onPress? : () => void,
    widgetHeaderStyle?: StyleProp<ViewStyle>
}

export const WidgetHeader = ({
    headerLeft,
    headerRight,
    onPress,
    widgetHeaderStyle
}: WidgetHeaderProps) => {
    return (
        <View style={StyleSheet.flatten([styles.container,widgetHeaderStyle])}>
            {headerLeft && <WidgetHeaderElement {...headerLeft}
                textStyle={[styles.headerLeftTextStyle , headerLeft.textStyle]}
            />}
            {headerRight && <WidgetHeaderElement {...headerRight} onPress={onPress}
                textStyle={[styles.headerRightTextStyle, headerRight.textStyle]}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerLeftTextStyle: { 
        fontFamily: fonts.AwsatDigital_Bold
    },
    headerRightTextStyle: {
        fontFamily: fonts.Effra_Regular
    }
})
