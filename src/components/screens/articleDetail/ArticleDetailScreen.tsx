import { View, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '..'
import { ShortArticle } from 'src/components/organisms'
import { shortArticleWithTagProperties } from 'src/constants/SampleData'
import { ArticleDetailFooter } from 'src/components/molecules'
import { Divider, HeaderElementProps, LabelTypeProp } from 'src/components/atoms'
import { Styles } from 'src/shared/styles'
import { horizontalEdge, isNonEmptyArray, normalize } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { ArticleDetailWidget } from 'src/components/organisms';
import { useArticleDetail } from 'src/hooks/useArticleDetail'
import { HtmlRenderer } from 'src/components/atoms'
import type { MixedStyleRecord } from '@native-html/transient-render-engine';
import { RelatedArticleDataType } from 'src/redux/articleDetail/types'
import Orientation, { OrientationType } from 'react-native-orientation-locker'
import { Edge } from 'react-native-safe-area-context'

export interface ArticleDetailScreenProps {
  route: any
}

const relatedShortArticleHeaderLeft: HeaderElementProps = {
  title: 'مقالات ذات صلة',
  labelType: LabelTypeProp.h2,
  color: Styles.color.greenishBlue
}

export const ArticleDetailScreen = ({
  route
}: ArticleDetailScreenProps) => {
  const { themeData } = useTheme()
  const [edge, setEdge] = useState<Edge[]>(horizontalEdge)

  const {
    isLoading,
    articleDetailData,
    relatedArticleData,
    fetchArticleDetail,
  } = useArticleDetail();

  const relatedArticleInfo = relatedArticleData.map((item: RelatedArticleDataType) => {
    return {
      ...item,
      ...shortArticleWithTagProperties,
      titleColor: themeData.primaryBlack,
      flag: item.news_categories.title
    }
  })

  const htmlTagStyle: MixedStyleRecord = {
    p: {
      color: themeData.primaryBlack,
      textAlign: 'left',
      direction: 'rtl',
      fontSize: normalize(16)
    }
  }

  useEffect(() => {
    Orientation.unlockAllOrientations()
    Orientation.getDeviceOrientation(updateScreenEdge)
    Orientation.addDeviceOrientationListener(updateScreenEdge)
    getArticleDetail(route.params.nid)
    return () => {
      Orientation.lockToPortrait()
      Orientation.removeOrientationListener(updateScreenEdge)
    }
  }, [])
  

  const updateScreenEdge = (deviceOrientation: OrientationType) => {
    const edge = getScreenEdge(deviceOrientation)
    setEdge(edge)
  }


  const getScreenEdge = (deviceOrientation: OrientationType): Edge[] => {
    switch (deviceOrientation) {
      case 'LANDSCAPE-LEFT': return ['right']
      case 'LANDSCAPE-RIGHT': return ['left']
      case 'PORTRAIT': return horizontalEdge
      default: return horizontalEdge
    }
  }

  const getArticleDetail = (id: string) => {
    fetchArticleDetail({ nid: parseInt(id) })
  }

  const onPressArticle = (nid: string) => {
    nid && getArticleDetail(nid)
  }


  const articleHtmlContent = () => (
    <View style={articleDetailScreenStyle.labelStyle}>
      <HtmlRenderer source={articleDetailData[0].body}
        tagsStyles={htmlTagStyle} />
    </View>
  )

  const renderItem = () => (
    <View>
      {isNonEmptyArray(articleDetailData) && <>
        <ArticleDetailWidget articleData={articleDetailData[0]} />
        {articleHtmlContent()}
      </>
      }
      {/* <RelatedArticles /> */}
      {isNonEmptyArray(relatedArticleData) &&
        <ShortArticle data={relatedArticleInfo}
          headerLeft={relatedShortArticleHeaderLeft}
          onPress={onPressArticle}
        />}
      <Divider style={{ height: normalize(50) }} />
    </View>
  )

  return (
    <ScreenContainer edge={edge} isLoading={isLoading}>
      {!isLoading && isNonEmptyArray(articleDetailData) && <>
        <FlatList
          style={{ flex: 1, height: '100%' }}
          data={[{}]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
        <View style={articleDetailScreenStyle.footer}>
          <ArticleDetailFooter articleDetailData={articleDetailData[0]} />
        </View>
      </>
      }
    </ScreenContainer>
  )
}
const articleDetailScreenStyle = StyleSheet.create({
  labelStyle: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(15),
  },
  footer: {
    width: '100%'
  }
})