import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image, Label, LabelTypeProp } from '..'
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
}: HeaderElementProps) => {
    return (
        <TouchableOpacity disabled={!clickable} activeOpacity={0.8}
            onPress={onPress}
            testID={atomTestID.widgetHeaderButton}
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