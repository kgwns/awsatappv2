import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { HtmlRenderer } from 'src/components/atoms'
import { horizontalAndBottomEdge, isIOS, isNonEmptyArray, normalize, screenWidth } from 'src/shared/utils'
import { Styles } from 'src/shared/styles'
import { ScreenContainer } from '..'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { useTermsAndAboutUs } from 'src/hooks'
import { MixedStyleRecord } from 'react-native-render-html'
import { fonts } from 'src/shared/styles/fonts'
import { StaticPageHeader } from 'src/components/molecules'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { ABOUT_US } from 'src/services/apiEndPoints'

type TermsAndAboutUsProps = {
  route: any
}

export const TermsAndAboutUs = ({
  route
}: TermsAndAboutUsProps) => {
  const { title, id } = route.params
  const { themeData } = useTheme()
  const style = useThemeAwareObject(customStyle)
  const [isLoadingState, setIsLoadingState] = useState(true);
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
  const ABOUT_US_URL = 'https://aawsat.srpcdigital.com/srpc/about-us.php';

  useEffect(() => {
    id !== ABOUT_US && fetchStaticDetail({ id })
  }, [])

  const getIgnoredTags = () => {
      return ['h2']
  }

  const handleLoadEndRequest = () => {
    setIsLoadingState(false)
  }

  const renderAboutUs = () => {
    if (isIOS) {
      return (
        <AutoHeightWebView
          style={style.aboutUsWebStyle}
          source={{ uri: ABOUT_US_URL }}
          bounces={false}
          originWhitelist={["*"]}
          nestedScrollEnabled={false}
          onLoadEnd={handleLoadEndRequest}
          mediaPlaybackRequiresUserAction={false}
          androidLayerType="hardware"
          allowsFullscreenVideo={true}
          scrollEnabled={false}
          scalesPageToFit={false}
          setBuiltInZoomControls={false}
          viewportContent={'width=device-width, user-scalable=no'}
        />
      )
    } else {
      return (
        <ScrollView scrollEnabled={true}>
          <AutoHeightWebView
            style={style.aboutUsWebStyle}
            source={{ uri: ABOUT_US_URL }}
            bounces={false}
            originWhitelist={["*"]}
            nestedScrollEnabled={false}
            onLoadEnd={handleLoadEndRequest}
            mediaPlaybackRequiresUserAction={false}
            androidLayerType="hardware"
            allowsFullscreenVideo={true}
            scrollEnabled={false}
            scalesPageToFit={false}
            setBuiltInZoomControls={false}
            viewportContent={'width=device-width, user-scalable=no'}
          />
        </ScrollView>
      )
    }
  }

  const renderHTML = () => {
    return (
      isNonEmptyArray(data) && <View style={style.htmlContainer}>
      <HtmlRenderer source={data[0].body} tagsStyles={htmlTagStyle} ignoredDomTags={getIgnoredTags()} />
    </View>
    )
  }

  return (
    <ScreenContainer edge={horizontalAndBottomEdge} isLoading={ id === ABOUT_US ? isLoadingState : isLoading }
      statusbarColor={themeData.secondaryGreen}
      backgroundColor={style.screenBackgroundColor?.backgroundColor}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <StaticPageHeader title={title} />
        {
            id === ABOUT_US ? renderAboutUs() : renderHTML()
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
    },
    aboutUsWebStyle: {
      width: '100%',
      opacity: 0.99,
    }
  })
)
