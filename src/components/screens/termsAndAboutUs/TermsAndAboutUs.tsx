import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ButtonIconWithLabel, HtmlRenderer, Label } from 'src/components/atoms'
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
import { TERMS_AND_CONDITION } from 'src/services/apiEndPoints'
import { getSvgImages } from 'src/shared/styles/svgImages'

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
    },
    h2: {
      color: themeData.primaryBlack,
      textAlign: 'left',
      direction: 'rtl',
    }
  }

  const { isLoading, data, fetchStaticDetail } = useTermsAndAboutUs()

  useEffect(() => {
    fetchStaticDetail({ id })
  }, [])

  const onPressBack = () => {
    navigation.goBack()
  }

  const renderHeaderElement = () => {
    if (id == TERMS_AND_CONDITION) {
      return <Label children={title} style={style.termsAndConditionTitle} />
    }

    return (
      <View style={style.headerItems}>
        <Label children={title} style={style.title} />
        {getSvgImages({ name: ImagesName.headerLogo, width: style.logo.width, height: style.logo.height })}
      </View>
    )
  }

  const getIgnoredTags = () => {
    if (id == TERMS_AND_CONDITION) {
      return ['h2']
    }
    return []
  }

  return (
    <ScreenContainer edge={horizontalAndBottomEdge} isLoading={isLoading}
      statusbarColor={themeData.secondaryGreen}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={style.headerContainer}>
          <View style={style.return}>
            <ButtonIconWithLabel
              icon={ImagesName.returnIcon}
              iconColor={themeData.primaryBlack}
              title={t('return')}
              onPress={onPressBack}
            />
          </View>
          {renderHeaderElement()}
        </View>
        {
          isNonEmptyArray(data) &&
          <View style={style.htmlContainer}>
            <HtmlRenderer source={data[0].body} tagsStyles={htmlTagStyle} ignoredDomTags={getIgnoredTags()} />
          </View>
        }
      </ScrollView>
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
    },
    htmlContainer: {
      paddingHorizontal: 0.04 * screenWidth,
      paddingVertical: normalize(10)
    },
    termsAndConditionTitle: {
      position: 'absolute',
      left: 0.04 * screenWidth,
      bottom: normalize(30),
      alignContent: 'center',
      alignItems: 'center',
      color: theme.primaryBlack,
      fontSize: normalize(22),
      lineHeight: normalize(33),
      fontWeight: 'bold'
    }
  })
)