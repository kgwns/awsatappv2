import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image, ImageName, Label, LabelTypeProp } from '..'
import { CustomAlert, normalize } from '../../../shared/utils'

export interface HeaderElementProps {
    title?: string,
    icon?: ImageName,
    color?: string,
    labelType?: LabelTypeProp,
    clickable?: boolean
}

export interface WidgetHeaderProps {
    headerLeft?: HeaderElementProps,
    headerRight?: HeaderElementProps,
}

export const WidgetHeader = ({
    headerLeft,
    headerRight
}: WidgetHeaderProps) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {headerLeft && <HeaderElement {...headerLeft} />}
            {headerRight && <HeaderElement {...headerRight} />}
        </View>
    )
}

const HeaderElement = ({
    title,
    icon,
    color,
    labelType = LabelTypeProp.p5,
    clickable = false
}: HeaderElementProps) => {
    return (
        <TouchableOpacity disabled={!clickable} activeOpacity={0.8}
            onPress={() => CustomAlert({})}
            style={widgetHeaderStyle.headerElementContainer}>
            <Label children={title} color={color} labelType={labelType} />
            {icon &&
                <Image name={icon} size={normalize(12)} style={{ marginLeft: normalize(10) }} />
            }
        </TouchableOpacity>
    )
}

const widgetHeaderStyle = StyleSheet.create({
    headerElementContainer: {
        flexDirection: 'row',
        paddingHorizontal: normalize(7),
        alignItems: 'center'
    }
})
