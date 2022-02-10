import { View, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { ScreenContainer } from '..'
import { ShortArticle, ShortArticleProps } from 'src/components/organisms'
import { shortArticleWithTagData } from 'src/constants/SampleData'
import { ArticleDetailFooter } from 'src/components/molecules'
import { Divider, HeaderElementProps, LabelTypeProp } from 'src/components/atoms'
import { Styles } from 'src/shared/styles'
import { horizontalAndBottomEdge, normalize } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { ArticleDetailWidget } from 'src/components/organisms';
import { useArticleDetail } from 'src/hooks/useArticleDetail'
import { HtmlRenderer } from 'src/components/atoms'

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

  const {
    isLoading,
    articleDetailData,
    fetchArticleDetail
  } = useArticleDetail();

  useEffect(() => {
    fetchArticleDetail({
      nid: parseInt(route.params?.nid)
    })
  }, [])

  shortArticleWithTagData.map((item: ShortArticleProps) => item.titleColor = themeData.primaryBlack)

  const articleHtmlContent = () => (
    <View style={articleDetailScreenStyle.labelStyle}>
      <HtmlRenderer source={articleDetailData[0].body} />
    </View>
  )

  const renderItem = () => (
    <View>
      <ArticleDetailWidget title={articleDetailData[0].title} image={articleDetailData[0].image}/>
      {articleHtmlContent()}
      {/* <RelatedArticles /> */}
      <ShortArticle data={shortArticleWithTagData} headerLeft={relatedShortArticleHeaderLeft} />
      <Divider style={{ height: normalize(50) }} />
    </View>
  )

  return (
    <ScreenContainer edge={horizontalAndBottomEdge} isLoading={isLoading}>
      {!isLoading && <>
        <FlatList
          style={{ flex: 1, height: '100%' }}
          data={[{}]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ }) => renderItem()}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
        <ArticleDetailFooter />
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
})