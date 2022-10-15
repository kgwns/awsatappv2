import React from 'react'
import { View, StyleSheet, ViewStyle, StyleProp, TextStyle } from 'react-native'
import { ImagesName, Styles } from 'src/shared/styles'
import { ArchiveImage, Divider, Label, LabelTypeProp, BannerImageWithOverlayProps } from '../atoms'
import ArticleFooter, { articleFooterProps, BookMarkColorType } from './articleFooter/ArticleFooter'
import { isNotEmpty, isTab, normalize, screenWidth } from 'src/shared/utils'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ScreensConstants } from 'src/constants'
import { getSvgImages } from 'src/shared/styles/svgImages'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { dateTimeAgo, decodeHTMLTags, TimeIcon } from 'src/shared/utils/utilities'
import { fonts } from 'src/shared/styles/fonts'
import FixedTouchable from 'src/shared/utils/FixedTouchable'

const archiveFooterSample: articleFooterProps = {
  leftTitleColor: Styles.color.white,
  rightIcon: () => {
    return getSvgImages({
      name: ImagesName.clock,
      size: normalize(12),
      style: { marginRight: normalize(7) }
    })
  },
  rightTitleColor: Styles.color.silverChalice,
  bookMarkColorType: BookMarkColorType.WHITE,
  leftTitleStyle: { fontWeight: 'bold' },
  rightTitleStyle: { fontFamily: fonts.IBMPlexSansArabic_Regular, fontSize: 12, lineHeight: 20, }
}

export interface ArchiveArticleProps extends BannerImageWithOverlayProps {
  title: string,
  containerStyle?: ViewStyle,
  nid?: string,
  author: string,
  created: string,
  isTabFooterInside?: boolean;
  hasTabletLayout?: boolean
  rightContainerStyle?: StyleProp<ViewStyle>
  textStyles?: StyleProp<TextStyle>
  titleStyle?: StyleProp<TextStyle>,
  leftTitleColor?: string;
  showDivider?: boolean,
  contentStyle?: StyleProp<TextStyle>
}

const ArchiveArticle = ({
  image,
  title,
  containerStyle,
  nid,
  author,
  created,
  rightContainerStyle,
  titleStyle,
  leftTitleColor,
  showDivider = false,
  contentStyle
}: ArchiveArticleProps) => {

  const navigation = useNavigation<StackNavigationProp<any>>()
  const { themeData } = useTheme();
  const timeFormat = dateTimeAgo(created)

  const onPress = () => {
    if (nid) {
      navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid })
    }
  }

  return (
    <FixedTouchable onPress={onPress}>
      <View>
        <View style={StyleSheet.flatten([ArchiveArticleStyle.sliderItemContainer, containerStyle])}>
          <ArchiveImage image={image} />
        </View>
        <View style={isTab ? [ArchiveArticleStyle.tabArticleContent, contentStyle] : ArchiveArticleStyle.articleContent}>
          {isNotEmpty(title) &&
            <View style={ArchiveArticleStyle.titleContainer}>
              <Label labelType={LabelTypeProp.title1}
                children={decodeHTMLTags(title)}
                style={titleStyle}
              />
            </View>
          }
          <View style={ArchiveArticleStyle.tabFooterContainer}>
            <ArticleFooter {...archiveFooterSample}
              rightTitle={timeFormat.time}
              leftTitleColor={leftTitleColor || Styles.color.greenishBlue}
              rightTitleColor={Styles.color.silverChalice}
              rightContainerStyle={rightContainerStyle}
              rightIcon={() => TimeIcon(timeFormat.icon)}
              hideBookmark={true}
            />
          </View>
          {showDivider && <Divider style={{ height: 1, backgroundColor: themeData.dividerColor }} />}
        </View>
      </View>
    </FixedTouchable>
  )
}

export default ArchiveArticle;

const ArchiveArticleStyle = StyleSheet.create({
  sliderItemContainer: {
    width: screenWidth,
    height: 'auto',
    aspectRatio: 1.34,
  },
  footerContainer: {
    paddingTop: normalize(20)
  },
  tabArticleContent: {
    marginHorizontal: 0.04 * screenWidth,
    marginTop: normalize(10),
    marginBottom: isTab ? 10 : normalize(25),
  },
  articleContent: {
    marginHorizontal: 0.04 * screenWidth,
    marginTop: normalize(10),
  },
  titleContainer: {
    paddingBottom: normalize(10),
  },
  tabFooterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: normalize(5),
  }
});
