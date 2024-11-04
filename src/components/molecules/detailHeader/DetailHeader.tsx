import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { BackIcon, HomeButton } from 'src/components/atoms'
import { isIOS, isNotchDevice, isTab, normalize } from 'src/shared/utils'
import { CustomThemeType } from 'src/shared/styles/colors'

interface DetailHeaderProps {
    visibleHome?: boolean;
    onBackPress: () => void;
    onHomePress: () => void;
}

export const DetailHeader = ({
    visibleHome = false,
    onBackPress,
    onHomePress
}: DetailHeaderProps) => {
    const style = useThemeAwareObject(customStyle)
    return (
        <View style={style.headerContainer}>
            {visibleHome && <HomeButton containerStyle={style.homeIconContainer} onPress={onHomePress} />}            
            <BackIcon onPressBack={onBackPress} />
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => (
    StyleSheet.create({
        headerContainer: {
            position: 'absolute',
            top: 0,
            width: '100%',
            height: isTab ? normalize(100) : isIOS ? isNotchDevice ? normalize(98) : normalize(90) : normalize(72),
            backgroundColor: theme.secondaryWhite,
            justifyContent: 'center',
        },
        homeIconContainer: {
            position: 'absolute',
            right: isIOS ? 15 : 20,
            top: isTab ? normalize(48) : isIOS ? normalize(50) : normalize(18)
        }
    })
)
