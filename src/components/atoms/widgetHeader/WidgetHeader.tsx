import { View } from 'react-native'
import React from 'react'
import { ImageName, LabelTypeProp } from '..'
import { WidgetHeaderElement } from '../index'

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
            {headerLeft && <WidgetHeaderElement {...headerLeft} />}
            {headerRight && <WidgetHeaderElement {...headerRight} />}
        </View>
    )
}
