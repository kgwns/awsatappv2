import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Label, LabelTypeProp } from '..'
import { normalize } from '../../../shared/utils'

interface captionWithImageProps {
    title?: string,
    icon?: () => void,
    color?: string,
    style?: object,
}

const CaptionWithImage = ({ title, icon, color, style }: captionWithImageProps) => {
    return (
        <View style={style}>
            <View style={captionImageStyle.container}>
                {icon &&
                    icon()
                }
                <View style={captionImageStyle.labelContainer}>
                <Label children={title} color={color} labelType={LabelTypeProp.p5} numberOfLines={1} 
                style={captionImageStyle.textLabel}
                />
                </View>
            </View>
        </View>
    )
}

export default CaptionWithImage

const captionImageStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: normalize(7),
    },
    labelContainer: {
        flexShrink: 1,
        flexBasis: 'auto',
        paddingRight: normalize(5),
        paddingLeft: normalize(3)
    },
    textLabel: {
        paddingVertical: normalize(1)
    }
})