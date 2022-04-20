import { View, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '..'
import { ShortArticle } from 'src/components/organisms'
import { shortArticleWithTagProperties } from 'src/constants/SampleData'
import { ArticleDetailFooter } from 'src/components/molecules'
import { Divider, HeaderElementProps, LabelTypeProp } from 'src/components/atoms'
import { Styles } from 'src/shared/styles'
import { horizontalEdge, isNonEmptyArray, isTab, normalize, recordLogEvent, screenWidth } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { ArticleDetailWidget } from 'src/components/organisms';
import { useArticleDetail } from 'src/hooks/useArticleDetail'
import { HtmlRenderer } from 'src/components/atoms'
import type { MixedStyleRecord } from '@native-html/transient-render-engine';
import { ArticleDetailDataType, RelatedArticleDataType } from 'src/redux/articleDetail/types'
import Orientation, { OrientationType } from 'react-native-orientation-locker'
import { Edge } from 'react-native-safe-area-context'
import { useBookmark, useLogin } from 'src/hooks'
import { ScreensConstants } from 'src/constants'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { sendUserEventTracking } from 'src/services'
import { TrackingEventType } from 'src/services/eventTrackService'
import { CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'

export interface ArticleDetailScreenProps {
  route: any
}

const relatedShortArticleHeaderLeft: HeaderElementProps = {
  title: 'مقالات ذات صلة',
  labelType: LabelTypeProp.h2,
  color: Styles.color.greenishBlue,
  elementContainerStyle: { paddingVertical: normalize(15) }
}

enum ArticleFontSize {
  normal = normalize(16),
  medium = normalize(18),
  high = normalize(20)
}

export const ArticleDetailScreen = ({
  route
}: ArticleDetailScreenProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const style = useThemeAwareObject(customStyle);
  const isFocused = useIsFocused();

  const { themeData } = useTheme()
  const { isLoggedIn } = useLogin()
  const { sendBookmarkInfo, removeBookmarkedInfo, bookmarkIdInfo } = useBookmark()

  const [edge, setEdge] = useState<Edge[]>(horizontalEdge)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [fontSize,setFontSize] = useState<ArticleFontSize>(ArticleFontSize.normal)
  const [showupUp,setShowPopUp] = useState(false)
  const [articleDetailState, setArticleDetail] = useState<ArticleDetailDataType[]>([])
  const [relatedArticleState, setRelatedArticle] = useState<RelatedArticleDataType[]>([])
  const [currentOrientation, setOrientation] = useState('')

  const currentNId = route.params.nid;

  const {
    isLoading,
    articleDetailData,
    relatedArticleData,
    fetchArticleDetail,
    emptyAllData,
  } = useArticleDetail();
  

  const sendEventToServer = () => {
    sendUserEventTracking(
      {
        events: [{
          contentId: currentNId,
          eventType: TrackingEventType.VIEW
        }]
      }
    )
  }
  
  useEffect(() => {
    sendEventToServer()

    if (isFocused) {
      Orientation.unlockAllOrientations();
      Orientation.getDeviceOrientation(updateScreenEdge);
      Orientation.addDeviceOrientationListener(updateScreenEdge);
    }
    return () => {
      if (!route.params.isRelatedArticle) {
        Orientation.lockToPortrait();
        Orientation.removeOrientationListener(updateScreenEdge);
      }
    };
  }, [])

  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
  }

  useEffect(() => {
    if (isNonEmptyArray(articleDetailData) && route.params && route.params.nid && isFocused) {
      const isBookmarked = validateBookmark(articleDetailData[0].nid)
      setIsBookmarked(isBookmarked)
      setArticleDetail(articleDetailData)
    }
  }, [articleDetailData])

  useEffect(() => {
    if (isNonEmptyArray(relatedArticleData) && route.params && route.params.nid && isFocused) {
      const relatedArticleListData = relatedArticleData.filter((data) => { return data.nid != currentNId})
      const relatedArticleInfo = relatedArticleListData.map((item: RelatedArticleDataType) => {
        return {
          ...item,
          ...shortArticleWithTagProperties,
          titleColor: themeData.primaryBlack,
          flag: item.news_categories && item.news_categories.title,
          isBookmarked: validateBookmark(item.nid)
        }
      })
      setRelatedArticle(relatedArticleInfo)
    }
  }, [relatedArticleData,isFocused])

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
    emptyAllData();
    if (isFocused) {
      recordLogEvent('Article_Details_Screen', { articleId: currentNId });
      getArticleDetail(currentNId)
    }
    return () => {
      emptyAllData()
    }
  }, [isFocused])

  const updateScreenEdge = (deviceOrientation: OrientationType) => {
    setOrientation(deviceOrientation);
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
    if (nid && nid!=currentNId) {
      recordLogEvent('Pressed_On_Related_Article', {relatedArticleId: nid});
      emptyAllData();
      navigation.push(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid, isRelatedArticle: true })
    }
  }

  const onPressSave = (nid: string) => {
    const newBookmarked = !isBookmarked
    const data = [...articleDetailState]
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
    <View style={style.labelStyle}>
      <HtmlRenderer source={articleDetailState[0].body}
        tagsStyles={htmlTagStyle} />
    </View>
  )

  const renderItem = () => (
    <View>
      {isNonEmptyArray(articleDetailState) && <>
        <ArticleDetailWidget articleData={articleDetailState[0]}
          isRelatedArticle={route.params.isRelatedArticle} />
        {articleHtmlContent()}
        <Divider style={style.divider}/>
      </>
      }
      {isNonEmptyArray(relatedArticleData) &&
        <ShortArticle data={relatedArticleState}
          headerLeft={relatedShortArticleHeaderLeft}
          onPress={onPressArticle}
          onUpdateBookmark={onUpdateBookMark}
          showSignUpPopUp={makeSignUpAlert}
          numColumns={isTab ? 2 : 1}
          addStyle={style.relatedArticle}
          orientation={currentOrientation}
        />}
      <Divider style={{ height: normalize(50) }} />
    </View>
  )

  return (
    <ScreenContainer edge={edge} isLoading={isLoading} 
    isSignUpAlertVisible={showupUp} onCloseSignUpAlert={onCloseSignUpAlert}>
      {!isLoading && isNonEmptyArray(articleDetailState) && <>
        <FlatList
          style={{ flex: 1, height: '100%' }}
          data={[{}]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
        <View style={style.footer}>
          <ArticleDetailFooter articleDetailData={articleDetailState[0]}
            isBookmarked={isBookmarked}
            onPressSave={() => checkAndUpdateBookmark(articleDetailState[0].nid)}
            onPressFontChange={onPressFontChange}
          />
        </View>
      </>
      }
    </ScreenContainer>
  )
}
const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  labelStyle: {
    paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
    paddingTop: normalize(15),
  },
  footer: {
    width: '100%'
  },
  relatedArticle: {
    paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth
  },
  divider: {
    height: 1,
    backgroundColor: theme.dividerColor,
  },
})