import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Image, ImageName } from '../image/Image'
import { Label, LabelTypeProp } from '..'
import { normalize } from '../../../shared/utils'

interface captionWithImageProps {
    title?: string,
    icon?: ImageName,
    color?: string,
    style?: object,
}

const CaptionWithImage = ({ title, icon, color, style }: captionWithImageProps) => {
    return (
        <View style={style}>
            <View style={captionImageStyle.container}>
                {icon &&
                    <Image name={icon} size={normalize(12)} style={{ marginRight: normalize(5) }} />
                }
                <View style={captionImageStyle.labelContainer}>
                <Label children={title} color={color} labelType={LabelTypeProp.p5} numberOfLines={2} />
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
        flexBasis: "auto",
    }
})