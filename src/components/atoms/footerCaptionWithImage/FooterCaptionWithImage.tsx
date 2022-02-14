import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Label, LabelTypeProp } from '..'
import { normalize } from '../../../shared/utils'

interface footerCaptionWithImageProps {
    title?: string,
    icon?: () => void,
    color?: string,
    subTitle?: string,
    subTitleColor?: string
}
const FooterCaptionWithImage = ({ title, icon, color, subTitle, subTitleColor }: footerCaptionWithImageProps) => {
    return (
        <View style={captionImageStyle.container}>
            {icon && icon()
            }
            {subTitle &&
                <Label children={subTitle} color={subTitleColor} labelType={LabelTypeProp.p5} style={{ fontWeight: 'bold', paddingHorizontal: normalize(5) }} />
            }
            <Label children={title} color={color} labelType={LabelTypeProp.p5} />

        </View>
    )
}
export default FooterCaptionWithImage
const captionImageStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: normalize(7),
        alignItems: 'center',
        alignContent: 'space-between'
    }
})