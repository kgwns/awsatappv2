import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ButtonIconWithLabel} from 'src/components/atoms/buttonIconWithLabel/ButtonIconWithLabel'
import { Label } from 'src/components/atoms/label/Label'
import { isIOS, normalize, screenWidth } from 'src/shared/utils'
import { ImagesName } from 'src/shared/styles'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { useNavigation } from '@react-navigation/native'
import { TranslateConstants, TranslateKey } from 'src/constants/Constants'
import { fonts } from 'src/shared/styles/fonts'

export type StaticPageHeaderType = {
    title: string;
}

export const StaticPageHeader = ({
    title,
}: StaticPageHeaderType) => {
    const navigation = useNavigation()

    const CONST_RETURN = TranslateConstants({ key: TranslateKey.RETURN })

    //Custom Hooks
    const { themeData } = useTheme()
    const style = useThemeAwareObject(customStyle)

    const onPressBack = () => {
        navigation.goBack()
    }

    const renderHeaderElement = () => (
        <Label children={title} style={style.headerTitle} />
    )

    return (
        <View style={style.headerContainer}>
            <View style={style.return}>
                <ButtonIconWithLabel
                    icon={ImagesName.returnIconName}
                    iconColor={themeData.primaryBlack}
                    title={CONST_RETURN}
                    titleStyle={{ color: themeData.primaryBlack }}
                    onPress={onPressBack}
                />
            </View>
            {renderHeaderElement()}
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => (
    StyleSheet.create({
        headerContainer: {
            width: '100%',
            height: isIOS ? normalize(220) : normalize(200),
            backgroundColor: theme.secondaryGreen,
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        return: {
            flexDirection: 'row',
            position: 'absolute',
            left: 0.04 * screenWidth,
            alignContent: 'center',
            top: isIOS ? normalize(60) : normalize(25),
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
        },
        headerTitle: {
            position: 'absolute',
            left: 0.04 * screenWidth,
            bottom: normalize(20),
            alignContent: 'center',
            alignItems: 'center',
            color: theme.primaryBlack,
            fontSize: normalize(24),
            lineHeight: normalize(40),
            fontFamily: fonts.AwsatDigital_Bold,
        }
    })
)
