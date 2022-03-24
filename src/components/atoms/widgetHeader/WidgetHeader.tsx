import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { LabelTypeProp } from '..'
import { WidgetHeaderElement } from '../index'

export interface HeaderElementProps {
    title?: string,
    icon?: ()=> void,
    color?: string,
    labelType?: LabelTypeProp,
    clickable?: boolean,
    onPress?: () => void,
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
            {headerLeft && <WidgetHeaderElement {...headerLeft} />}
            {headerRight && <WidgetHeaderElement {...headerRight} onPress={onPress} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
