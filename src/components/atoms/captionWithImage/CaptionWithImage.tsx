import React from 'react'
import { View, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { Label } from 'src/components/atoms/label/Label'
import { decodeHTMLTags, normalize, screenWidth } from 'src/shared/utils'
import { decode } from 'html-entities'

interface CaptionWithImageProps {
    title?: string,
    icon?: () => void,
    color?: string,
    style?: object,
    labelStyle?: StyleProp<TextStyle>,
    numberOfLine?: number,
    labelContainerStyle?: StyleProp<ViewStyle>;
}

const CaptionWithImage = ({ title, icon, 
    color, style, labelStyle,
    numberOfLine,
    labelContainerStyle,
 }: CaptionWithImageProps) => {
    return (
        <View style={style}>
            <View style={captionImageStyle.container}>
                {icon &&
                    icon()
                }
                <View style={StyleSheet.flatten([captionImageStyle.labelContainer, labelContainerStyle])}>
                    <Label children={decodeHTMLTags(decode(title))} color={color} numberOfLines={numberOfLine ? numberOfLine :1}
                        style={StyleSheet.flatten([captionImageStyle.textLabel, labelStyle])} 
                        testID={'titleID'}
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
    },
    labelContainer: {
        flexShrink: 1,
        flexBasis: 'auto',
        maxWidth: screenWidth * 0.6
    },
    textLabel: {
        paddingVertical: normalize(1),
    }
})
