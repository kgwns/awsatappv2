import React from 'react'
import { Text } from 'react-native'
import { TextWithFlagProps } from '../../../constants/types'
import { Label, LabelTypeProp } from '..'

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
        <Text style={{textAlign: 'left', flexWrap: 'wrap'}} numberOfLines={numberOfLines} >
            {flag && <Label style={[{color: flagColor}]} children={`${flag}`} labelType={labelType} />}
            {flag && <Label style={[{color: barColor}]} children={`   |    `} labelType={labelType} />}
            <Label children={title} labelType={labelType} color={titleColor} />
        </Text>
    )
}
