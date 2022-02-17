import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Image, ImageName } from '../image/Image'
import { Label, LabelTypeProp } from '..'
import { normalize } from '../../../shared/utils'

interface captionWithImageProps {
    title?: string,
    icon?: ImageName,
    color?: string,
}

const CaptionWithImage = ({ title, icon, color }: captionWithImageProps) => {
    return (
        <View style={{}}>
            <View style={captionImageStyle.container}>
                {icon &&
                    <Image name={icon} size={normalize(12)} style={{ marginRight: normalize(5) }} />
                }
                <Label children={title} color={color} labelType={LabelTypeProp.p5} numberOfLines={2} />
            </View>
        </View>
    )
}

export default CaptionWithImage

const captionImageStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: normalize(7),
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
})