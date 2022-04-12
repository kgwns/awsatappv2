import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Label, LabelTypeProp } from '..'
import { normalize } from 'src/shared/utils'

export interface TextWithFlagProps {
    title: string,
    titleColor?: string,
    barColor?: string,
    flag?: string,
    flagColor?: string,
    labelType?: LabelTypeProp,
    numberOfLines?: number,
}

export const TextWithFlag = ({
    flag,
    flagColor,
    title,
    titleColor,
    barColor,
    labelType = LabelTypeProp.p5,
    numberOfLines = 2
}: TextWithFlagProps) => {
    return (
        <Text style={textWithFlagStyle.container} numberOfLines={numberOfLines} >
            {flag && <Label style={[{ color: flagColor }]} children={`${flag}`} labelType={labelType} />}
            {flag && <Label style={[{ color: barColor }]} children={`   |    `} labelType={labelType} />}
            <Label children={title} labelType={labelType} color={titleColor} />
        </Text>
    )
}

const textWithFlagStyle = StyleSheet.create({
    container: {
        textAlign: 'left',
        flexWrap: 'wrap',
        paddingBottom: normalize(8)
    }
})
