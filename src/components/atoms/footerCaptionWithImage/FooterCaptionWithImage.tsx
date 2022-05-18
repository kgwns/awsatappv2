import React from 'react'
import { View, StyleSheet, StyleProp, TextStyle } from 'react-native'
import { fonts } from 'src/shared/styles/fonts'
import { Label, LabelTypeProp } from '..'
import { normalize } from '../../../shared/utils'

interface footerCaptionWithImageProps {
    title?: string,
    icon?: () => void,
    color?: string,
    subTitle?: string,
    subTitleColor?: string
    labelStyle?: StyleProp<TextStyle>
}
const FooterCaptionWithImage = ({ title, icon, color, subTitle, subTitleColor,labelStyle }: footerCaptionWithImageProps) => {
    return (
        <View style={captionImageStyle.container}>
            {icon && icon()
            }
            {subTitle &&
                <Label children={subTitle} color={subTitleColor} labelType={LabelTypeProp.p5} style={icon && captionImageStyle.subtitle} />
            }
            <View>
                <Label children={title}
                    color={color} 
                    labelType={LabelTypeProp.p5} 
                    numberOfLines={1} 
                    style={StyleSheet.flatten([captionImageStyle.textLabel,labelStyle])}
                />
            </View>
        </View>
    )
}
export default FooterCaptionWithImage
const captionImageStyle = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'space-between'
    },
    subtitle: {
        paddingHorizontal: normalize(5)
    },
    textLabel: {
        paddingVertical: normalize(1),
        fontFamily: fonts.AwsatDigitalBetav10_Regular,
    }
})