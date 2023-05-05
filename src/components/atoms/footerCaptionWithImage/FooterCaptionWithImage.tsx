import React from 'react'
import { View, StyleSheet, StyleProp, TextStyle } from 'react-native'
import { fonts } from 'src/shared/styles/fonts'
import { Label, LabelTypeProp } from 'src/components/atoms/label/Label'
import { normalize } from '../../../shared/utils'

interface FooterCaptionWithImageProps {
    title?: string,
    icon?: () => void,
    color?: string,
    subTitle?: string,
    subTitleColor?: string
    labelStyle?: StyleProp<TextStyle>
}
const FooterCaptionWithImage = ({ title, icon, color, subTitle, subTitleColor,labelStyle }: FooterCaptionWithImageProps) => {
    return (
        <View style={captionImageStyle.container}>
            {icon && icon()
            }
            {subTitle &&
                <Label children={subTitle} color={subTitleColor} labelType={LabelTypeProp.p5} />
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
    textLabel: {
        paddingVertical: normalize(1),
        fontFamily: fonts.AwsatDigital_Regular,
    }
})
