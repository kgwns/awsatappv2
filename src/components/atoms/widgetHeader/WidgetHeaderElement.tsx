import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Label, LabelTypeProp } from 'src/components/atoms/label/Label'
import { HeaderElementProps } from './WidgetHeader'
import { atomTestID } from '../../../constants/Constants'


export const WidgetHeaderElement = ({
    title,
    icon,
    color,
    labelType = LabelTypeProp.p5,
    clickable = false,
    onPress,
    elementContainerStyle,
    textStyle,
}: HeaderElementProps) => {
    return (
        <TouchableOpacity disabled={!clickable} activeOpacity={0.8}
            onPress={onPress}
            testID={atomTestID.widgetHeaderButton}
            style={StyleSheet.flatten([widgetHeaderStyle.headerElementContainer, elementContainerStyle])}>
            <Label children={title} color={color} labelType={labelType} style={textStyle}/>
            {icon &&
                icon()
            }
        </TouchableOpacity>
    )
}

const widgetHeaderStyle = StyleSheet.create({
    headerElementContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
