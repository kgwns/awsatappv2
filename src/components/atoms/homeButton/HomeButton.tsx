import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { ImagesName } from 'src/shared/styles'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { isIOS, isTab } from 'src/shared/utils';

interface HomeButtonProps {
    containerStyle?: StyleProp<ViewStyle>;
    onPress: () => void;
}

export const HomeButton = ({
    containerStyle,
    onPress
}: HomeButtonProps) => {
    const size = isTab ? 45 : isIOS ? 35 : 40;
    return (
        <TouchableOpacity style={containerStyle} onPress={onPress}>
            {
                getSvgImages({
                    name: ImagesName.homeIcon,
                    width: size,
                    height: size,
                })
            }
        </TouchableOpacity>
    )
}
