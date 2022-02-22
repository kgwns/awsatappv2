import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { ButtonIconWithLabel, HtmlRenderer, Image, Label } from 'src/components/atoms'
import { horizontalAndBottomEdge, isIOS, isNonEmptyArray, normalize, screenWidth } from 'src/shared/utils'
import { ImagesName, Styles } from 'src/shared/styles'
import { ScreenContainer } from '..'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { t } from 'i18next'
import { useTermsAndAboutUs } from 'src/hooks'
import { MixedStyleRecord } from 'react-native-render-html'
import { useNavigation } from '@react-navigation/native'

type TermsAndAboutUsProps = {
  route: any
}

export const TermsAndAboutUs = ({
  route
}: TermsAndAboutUsProps) => {
  const { title, id } = route.params
  const { themeData } = useTheme()
  const style = useThemeAwareObject(customStyle)

  const navigation = useNavigation()

  const htmlTagStyle: MixedStyleRecord = {
    p: {
      color: themeData.primaryBlack,
      textAlign: 'left',
      direction: 'rtl',
      fontSize: normalize(16),
      lineHeight: normalize(33)
    }
  }

  const { isLoading, data, fetchStaticDetail } = useTermsAndAboutUs()

  useEffect(() => {
    fetchStaticDetail({ id })
  }, [])

  const onPressBack = () => {
    navigation.goBack()
  }

  return (
    <ScreenContainer edge={horizontalAndBottomEdge} isLoading={isLoading}
      statusbarColor={themeData.secondaryGreen}>
      <View style={style.headerContainer}>
        <View style={style.return}>
          <ButtonIconWithLabel
            icon={ImagesName.returnIcon}
            iconColor={themeData.primaryBlack}
            title={t('return')}
            onPress={onPressBack}
          />
        </View>
        <View style={style.headerItems}>
          <Label children={title} style={style.title} />
          <Image style={style.logo} name={ImagesName.headerLogo} />
        </View>

      </View>
      {
        isNonEmptyArray(data) &&
        <View style={{ paddingHorizontal: 0.04 * screenWidth }}>
          <HtmlRenderer source={data[0].body} tagsStyles={htmlTagStyle} />
        </View>
      }
    </ScreenContainer>
  )
}

const customStyle = (theme: CustomThemeType) => (
  StyleSheet.create({
    headerContainer: {
      width: screenWidth,
      height: normalize(250),
      backgroundColor: theme.secondaryGreen,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    headerItems: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: normalize(60)
    },
    return: {
      flexDirection: 'row',
      position: 'absolute',
      left: 0.04 * screenWidth,
      alignContent: 'center',
      top: isIOS ? normalize(50) : normalize(25),
      flexWrap: 'wrap',
      alignItems: 'center'
    },
    title: {
      fontSize: normalize(20),
      color: Styles.color.greenishBlue,
      textAlign: 'left',
      paddingVertical: normalize(15)
    },
    logo: {
      height: normalize(40),
      width: 0.6 * screenWidth,
    }
  })
)