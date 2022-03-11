import { View, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '..'
import { ShortArticle } from 'src/components/organisms'
import { shortArticleWithTagProperties } from 'src/constants/SampleData'
import { ArticleDetailFooter } from 'src/components/molecules'
import { Divider, HeaderElementProps, LabelTypeProp } from 'src/components/atoms'
import { Styles } from 'src/shared/styles'
import { horizontalEdge, isNonEmptyArray, normalize, recordLogEvent } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { ArticleDetailWidget } from 'src/components/organisms';
import { useArticleDetail } from 'src/hooks/useArticleDetail'
import { HtmlRenderer } from 'src/components/atoms'
import type { MixedStyleRecord } from '@native-html/transient-render-engine';
import { RelatedArticleDataType } from 'src/redux/articleDetail/types'
import Orientation, { OrientationType } from 'react-native-orientation-locker'
import { Edge } from 'react-native-safe-area-context'
import { useBookmark, useLogin } from 'src/hooks'

export interface ArticleDetailScreenProps {
  route: any
}

const relatedShortArticleHeaderLeft: HeaderElementProps = {
  title: 'مقالات ذات صلة',
  labelType: LabelTypeProp.h2,
  color: Styles.color.greenishBlue
}

enum ArticleFontSize {
  normal = normalize(16),
  medium = normalize(18),
  high = normalize(20)
}

export const ArticleDetailScreen = ({
  route
}: ArticleDetailScreenProps) => {
  const { themeData } = useTheme()
  const { isLoggedIn } = useLogin()

  const [edge, setEdge] = useState<Edge[]>(horizontalEdge)

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [fontSize,setFontSize] = useState<ArticleFontSize>(ArticleFontSize.normal)

  const { sendBookmarkInfo, removeBookmarkedInfo, bookmarkIdInfo } = useBookmark()
  const [showupUp,setShowPopUp] = useState(false)

  const {
    isLoading,
    articleDetailData,
    relatedArticleData,
    fetchArticleDetail,
  } = useArticleDetail();

  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
  }

  const relatedArticleInfo = relatedArticleData.map((item: RelatedArticleDataType) => {
    return {
      ...item,
      ...shortArticleWithTagProperties,
      titleColor: themeData.primaryBlack,
      flag: item.news_categories.title,
      isBookmarked: validateBookmark(item.nid)
    }
  })

  useEffect(() => {
    if (isNonEmptyArray(articleDetailData)) {
      const isBookmarked = validateBookmark(articleDetailData[0].nid)
      setIsBookmarked(isBookmarked)
    }
  }, [articleDetailData])

  const htmlTagStyle: MixedStyleRecord = {
    p: {
      color: themeData.primaryBlack,
      textAlign: 'left',
      direction: 'rtl',
      fontSize: fontSize,
      lineHeight: 1.5 * fontSize
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
    recordLogEvent('Related_Article', {id: nid});
    nid && getArticleDetail(nid)
  }

  const onPressSave = (nid: string) => {
    const newBookmarked = !isBookmarked
    const data = [...articleDetailData]
    data[0].isBookmarked = !data[0].isBookmarked
    setIsBookmarked(newBookmarked)
    onUpdateBookMark(nid, newBookmarked)
  }

  const onPressFontChange = () => {
    let newFontSize = normalize(16)
    if(fontSize === ArticleFontSize.normal) {
      newFontSize = normalize(18)
    } else if(fontSize === ArticleFontSize.medium) {
      newFontSize = normalize(20)
    }
    setFontSize(newFontSize)
  }

  const checkAndUpdateBookmark = (nid: string) => {
    isLoggedIn ? onPressSave(nid) : setShowPopUp(true)
  }

  const onUpdateBookMark = (nid: string, hasBookmarked: boolean) => {
    if (isLoggedIn) {
      hasBookmarked ? sendBookmarkInfo({ nid }) : removeBookmarkedInfo({ nid })
    } else {
      setShowPopUp(true)
    }
  }

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }

  const makeSignUpAlert = () => {
    setShowPopUp(true)
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
      {isNonEmptyArray(relatedArticleData) &&
        <ShortArticle data={relatedArticleInfo}
          headerLeft={relatedShortArticleHeaderLeft}
          onPress={onPressArticle}
          onUpdateBookmark={onUpdateBookMark}
          showSignUpPopUp={makeSignUpAlert}
        />}
      <Divider style={{ height: normalize(50) }} />
    </View>
  )

  return (
    <ScreenContainer edge={edge} isLoading={isLoading} 
    isSignUpAlertVisible={showupUp} onCloseSignUpAlert={onCloseSignUpAlert}>
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
          <ArticleDetailFooter articleDetailData={articleDetailData[0]}
            isBookmarked={isBookmarked}
            onPressSave={() => checkAndUpdateBookmark(articleDetailData[0].nid)}
            onPressFontChange={onPressFontChange}
          />
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