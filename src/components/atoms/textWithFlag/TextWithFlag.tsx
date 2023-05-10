import React from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native'
import { Label, LabelTypeProp } from 'src/components/atoms/label/Label'
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
    titleContainerStyle?: StyleProp<ViewStyle>;
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
    titleContainerStyle,
}: TextWithFlagProps) => {
    return (
        <Text style={[textWithFlagStyle.container, titleContainerStyle]} numberOfLines={numberOfLines} >
            {flag && <Label style={[style, { color: flagColor }]} children={`${flag}`} labelType={labelType} />}
            {flag && <Label style={[textWithFlagStyle.dividerStyle, {color: barColor }]} children={`  |  `} labelType={labelType} />}
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
        marginLeft: 2
    },
    dividerStyle: {
        fontSize: isIOS ? normalize(15) : normalize(17),
        fontWeight: 'bold',
        fontFamily: 'arial'
    }
})
