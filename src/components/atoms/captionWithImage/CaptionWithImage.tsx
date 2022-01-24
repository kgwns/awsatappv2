import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Image, ImageName } from '../image/Image'
import { Label, LabelTypeProp } from '..'
import { normalize } from '../../../shared/utils'

interface captionWithImageProps {
    title?: string,
    icon?: ImageName,
    color?: string
}

const CaptionWithImage = ({ title, icon, color }: captionWithImageProps) => {
    return (
        <View style={captionImageStyle.container}>
            {icon &&
                <Image name={icon} size={normalize(12)} style={{ marginRight: normalize(5) }} />
            }
            <Label children={title} color={color} labelType={LabelTypeProp.p5} />
        </View>
    )
}

export default CaptionWithImage

const captionImageStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: normalize(7),
        alignItems: 'center'
    }
})