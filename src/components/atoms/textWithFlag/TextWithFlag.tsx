import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native'
import { Label, LabelTypeProp } from '..'
import { isIOS, isNotEmpty, normalize, decodeHTMLTags } from 'src/shared/utils'
import { decode } from 'html-entities';

export interface TextWithFlagProps {
    title: string,
    titleColor?: string,
    barColor?: string,
    flag?: string,
    flagColor?: string,
    labelType?: LabelTypeProp,
    numberOfLines?: number,
    style?: StyleProp<TextStyle>;
}

export const TextWithFlag = ({
    flag,
    flagColor,
    title,
    titleColor,
    barColor,
    labelType = LabelTypeProp.p5,
    numberOfLines = 2,
    style,
}: TextWithFlagProps) => {
    return (
        <Text style={textWithFlagStyle.container} numberOfLines={numberOfLines} >
            {flag && <Label style={[{ color: flagColor }, style]} children={`${flag}`} labelType={labelType} />}
            {flag && <Label style={[{ color: barColor }, textWithFlagStyle.dividerStyle, style]} children={`  |  `} labelType={labelType} />}
            <Label children={isNotEmpty(title) ? decodeHTMLTags(decode(title)) : ''}
                labelType={labelType} color={titleColor}
                style={style}
            />
        </Text>
    )
}

const textWithFlagStyle = StyleSheet.create({
    container: {
        textAlign: 'left',
        flexWrap: 'wrap',
        paddingBottom: normalize(8),
    },
    dividerStyle: {
        fontSize: isIOS ? normalize(15) : normalize(17),
        fontWeight: 'bold',
        lineHeight: 17,
        fontFamily: 'arial'
    }
})
