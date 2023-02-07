import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { HtmlRenderer } from 'src/components/atoms'
import { horizontalAndBottomEdge, isNonEmptyArray, normalize, screenWidth } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { ScreenContainer } from '..'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { useTermsAndAboutUs } from 'src/hooks'
import { MixedStyleRecord } from 'react-native-render-html'
import { fonts } from 'src/shared/styles/fonts'
import { StaticPageHeader } from 'src/components/molecules'

type TermsAndAboutUsProps = {
  route: any
}

export const TermsAndAboutUs = ({
  route
}: TermsAndAboutUsProps) => {
  const { title, id } = route.params
  const { themeData } = useTheme()
  const style = useThemeAwareObject(customStyle)

  const htmlTagStyle: MixedStyleRecord = {
    p: {
      color: themeData.primaryBlack,
      textAlign: 'left',
      direction: 'rtl',
      fontSize: normalize(16),
      lineHeight: normalize(33),
      fontFamily: fonts.IBMPlexSansArabic_Regular,
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

  const getIgnoredTags = () => {
      return ['h2']
  }

  return (
    <ScreenContainer edge={horizontalAndBottomEdge} isLoading={isLoading}
      statusbarColor={themeData.secondaryGreen}
      backgroundColor={style.screenBackgroundColor?.backgroundColor}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <StaticPageHeader title={title} />
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
    title: {
      fontSize: normalize(20),
      color: Styles.color.greenishBlue,
      textAlign: 'left',
      paddingVertical: normalize(15),
      fontFamily: fonts.IBMPlexSansArabic_Regular,
    },
    htmlContainer: {
      paddingHorizontal: 0.04 * screenWidth,
      paddingVertical: normalize(10)
    },
    screenBackgroundColor: {
      backgroundColor: theme.termsBackground
    }
  })
)
