import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Label, LabelTypeProp } from '..'
import { normalize } from '../../../shared/utils'
import { HeaderElementProps } from './WidgetHeader'
import { atomTestID } from '../../../constants'


export const WidgetHeaderElement = ({
    title,
    icon,
    color,
    labelType = LabelTypeProp.p5,
    clickable = false,
    onPress,
    elementContainerStyle
}: HeaderElementProps) => {
    return (
        <TouchableOpacity disabled={!clickable} activeOpacity={0.8}
            onPress={onPress}
            testID={atomTestID.widgetHeaderButton}
            style={StyleSheet.flatten([widgetHeaderStyle.headerElementContainer, elementContainerStyle])}>
            <Label children={title} color={color} labelType={labelType} />
            {icon &&
                icon()
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