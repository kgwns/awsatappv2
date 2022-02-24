import { View } from 'react-native'
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
}

export const WidgetHeader = ({
    headerLeft,
    headerRight,
    onPress
}: WidgetHeaderProps) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {headerLeft && <WidgetHeaderElement {...headerLeft} />}
            {headerRight && <WidgetHeaderElement {...headerRight} onPress={onPress} />}
        </View>
    )
}
