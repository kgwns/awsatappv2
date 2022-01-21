import React from 'react'
import { View } from 'react-native'
import { Image, ImageName } from '../image/Image'
import { Label,LabelTypeProp } from '..'
import { normalize } from '../../../shared/utils'

interface captionWithImageProps {
    title?: string,
    icon?: ImageName,
    color?: string
}

const CaptionWithImage = ({ title, icon, color }: captionWithImageProps) => {
    return (
        <View style={{ flexDirection: 'row', paddingHorizontal: normalize(7) }}>
            {icon &&
                <Image name={icon} size={normalize(14)} style={{marginRight: normalize(5)}}/>
            }
            <Label children={title} color={color} labelType={LabelTypeProp.p5}/>
        </View>
    )
}

export default CaptionWithImage
