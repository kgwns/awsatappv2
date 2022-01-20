import React from 'react'
import { View } from 'react-native'
import { Image, ImageName } from '../image/Image'
import { Label } from '..'
import { normalize } from '../../../shared/utils'

interface captionWithImageProps {
    title?: string,
    icon?: ImageName,
    color?: string
}

const CaptionWithImage = ({ title, icon, color }: captionWithImageProps) => {
    return (
        <View style={{ flexDirection: 'row-reverse', paddingHorizontal: normalize(7) }}>
            {icon &&
                <Image name={icon} size={normalize(14)} />
            }
            <Label children={title} color={color} />
        </View>
    )
}

export default CaptionWithImage
