import { View, Text } from 'react-native'
import React from 'react'
import { Image } from '../image/Image'
import { ImageName } from '..'
import { ImageResize } from '../../../shared/styles/text-styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {ImageWithIconStyle } from 'src/components/atoms/ImageWithIcon/ImageWithIcon.style'
import  WhitePlayIcon from 'src/assets/images/icons/whitePlayIcon.svg'

const { articleImage, tagText, bottomTagContainer, playIconPosition, iconStyle} = ImageWithIconStyle;
export interface ImageIconProps {
    name?: ImageName,
    url?: string,
    bottomTag?: string,
    onPress?:()=>void,
}

export const ImageWithIcon = ({ name, url, bottomTag,onPress}: ImageIconProps) => {
    return (
        <View>
            <Image name={name} url={url} style={articleImage} resizeMode={ImageResize.COVER}/>
            {bottomTag &&
            <View style={bottomTagContainer}>
                <Text children={bottomTag}
                    style={ tagText }
                />
            </View>
            }
                <View style={playIconPosition}>
                    <TouchableOpacity onPress={onPress}>
                    <WhitePlayIcon style={iconStyle}/>
                    </TouchableOpacity>
                </View>        
        </View>
    )
}