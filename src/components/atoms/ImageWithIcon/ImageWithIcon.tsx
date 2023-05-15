import { View, Text } from 'react-native'
import React from 'react'
import { Image } from '../image/Image'
import { ImageName } from '..'
import { ImageResize } from '../../../shared/styles/text-styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {ImageWithIconStyle } from 'src/components/atoms/ImageWithIcon/ImageWithIcon.style'
import  WhitePlayIcon from 'src/assets/images/icons/whitePlayIcon.svg'
import { isTab } from 'src/shared/utils'


const { articleImage, tagText, bottomTagContainer, tabTimeContainer ,playIconPosition, iconStyle, tabArticleImage} = ImageWithIconStyle;
export interface ImageIconProps {
    name?: ImageName,
    url?: string,
    bottomTag?: string,
    onPress?:()=>void,
    fallback?: boolean,
    isVideoList?: boolean
}

export const ImageWithIcon = ({ name, url, bottomTag,onPress, fallback= false, isVideoList = false}: ImageIconProps) => {
    const videoPlayIconSize = isVideoList ? 25 : 30;
    return (
        <View>
            <Image fallback={fallback} name={name} url={url} style={ isVideoList ? tabArticleImage : articleImage} resizeMode={ImageResize.COVER}/>
            {bottomTag &&
            <View style={ isTab ? tabTimeContainer : bottomTagContainer}>
                <Text children={bottomTag}
                    style={ tagText }
                />
            </View>
            }
            <View style={playIconPosition}>
                <TouchableOpacity onPress={onPress}>
                    <WhitePlayIcon width={videoPlayIconSize} height={videoPlayIconSize}/>
                </TouchableOpacity>
            </View>    
        </View>
    )
}
