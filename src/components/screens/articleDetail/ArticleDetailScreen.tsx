import { View, FlatList, StyleSheet, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreenContainer } from '..'
import { ShortArticle } from 'src/components/organisms'
import { shortArticleWithTagProperties } from 'src/constants/SampleData'
import { ArticleDetailFooter, DraggableVideoPlayer } from 'src/components/molecules'
import { Divider, HeaderElementProps, LabelTypeProp } from 'src/components/atoms'
import { Styles } from 'src/shared/styles'
import { horizontalEdge, isIOS, isNonEmptyArray, isNotEmpty, isObjectNonEmpty, isTab, normalize, recordLogEvent, screenWidth } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { ArticleDetailWidget } from 'src/components/organisms';
import { useArticleDetail } from 'src/hooks/useArticleDetail'
import { HtmlRenderer } from 'src/components/atoms'
import type { MixedStyleRecord, MixedStyleDeclaration } from '@native-html/transient-render-engine';
import { ArticleDetailDataType, RelatedArticleDataType, RichHTMLType } from 'src/redux/articleDetail/types'
import Orientation, { OrientationType } from 'react-native-orientation-locker'
import { Edge } from 'react-native-safe-area-context'
import { useAppCommon, useBookmark, useLogin } from 'src/hooks'
import { ScreensConstants } from 'src/constants'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { sendUserEventTracking } from 'src/services'
import { TrackingEventType } from 'src/services/eventTrackService'
import { colors, CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { ArticleFontSize } from 'src/redux/appCommon/types'
import { fonts } from 'src/shared/styles/fonts'
import { BackIcon } from 'src/components/atoms'
import { RequestVideoUrlSuccessResponse } from 'src/redux/videoList/types'
import { fetchVideoDetailInfo } from 'src/services/VideoServices'
import { RenderContentElement, RenderDescriptionElement, RenderNumberElement, RenderOpinionElement, RenderQuoteElement, RenderReadAlsoElement } from './components/ArticleDetailRichContent'

export interface ArticleDetailScreenProps {
  route: any
}

const relatedShortArticleHeaderLeft: HeaderElementProps = {
  title: 'مقالات ذات صلة',
  labelType: LabelTypeProp.h2,
  color: Styles.color.greenishBlue,
  elementContainerStyle: { paddingVertical: normalize(15) },
  textStyle: {fontSize:20, lineHeight:30}
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
  const { articleFontSize, storeArticleFontSizeInfo } = useAppCommon()

  const [edge, setEdge] = useState<Edge[]>(horizontalEdge)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [fontSize,setFontSize] = useState<ArticleFontSize>(articleFontSize)
  const [showupUp,setShowPopUp] = useState(false)
  const [articleDetailState, setArticleDetail] = useState<ArticleDetailDataType[]>([])
  const [relatedArticleState, setRelatedArticle] = useState<RelatedArticleDataType[]>([])
  const [currentOrientation, setOrientation] = useState('')
  const [scrollY, setScrollY] = useState(new Animated.Value(0))
  const [playerUrl, setPlayerUrl] = useState<string>();
  const [playerVisible, setPlayerVisible] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const currentNId = route.params.nid;

  const {
    isLoading,
    articleDetailData,
    relatedArticleData,
    isArticleSectionLoaded,
    fetchArticleDetail,
    emptyAllData,
  } = useArticleDetail();
  

  const sendEventToServer = () => {
    const listOfNID = getArticleID()
    const allEvents = listOfNID.map((item) => {
      return {
        contentId: item,
        eventType: TrackingEventType.VIEW
      }
    })

    sendUserEventTracking(
      {
        events: allEvents
      }
    )
  }

  const getArticleID = () => {
    return articleDetailData.reduce((prevValue: string[], item: ArticleDetailDataType) => {
      return prevValue.concat(item.nid)
    }, [])
  }
  
  useEffect(() => {
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

  useEffect(() => {
    if (isFocused && isArticleSectionLoaded) {
      sendEventToServer()
    }
  }, [isArticleSectionLoaded])

  useEffect(() => {
    if (fontSize != articleFontSize) {
      setFontSize(articleFontSize)
    }
  }, [articleFontSize])


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

  const commonHtmlTagStyle: MixedStyleDeclaration = {
    color: themeData.primaryBlack,
    textAlign: 'justify',
    direction: 'rtl',
    fontSize: fontSize,
    lineHeight: 1.8 * fontSize,
    fontFamily: fonts.Effra_Arbc_Regular,
    writingDirection: 'rtl',
  }

  const h1TagStyle: MixedStyleDeclaration = {
    color: themeData.primaryBlack,
    textAlign: 'justify',
    direction: 'rtl',
    fontFamily: fonts.Effra_Arbc_Regular,
    writingDirection: 'rtl',
  }
  
  const htmlTagStyle: MixedStyleRecord = {
    p: commonHtmlTagStyle,
    div: commonHtmlTagStyle,
    h1: h1TagStyle,
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
    storeArticleFontSizeInfo()
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

  const onScroll = (event: any) => {
    let direction = event.nativeEvent.contentOffset.y > scrollY ? 'down' : 'up';
    setScrollY(event.nativeEvent.contentOffset.y)
    Number.parseInt(event.nativeEvent.contentOffset.y) > 100 && direction == 'down' ? setPlayerVisible(true) : setPlayerVisible(false);
  }

  const onPressBack = () => {
    if (!route.params.isRelatedArticle) {
      Orientation.unlockAllOrientations()
      Orientation.lockToPortrait()
    }
    navigation.goBack()
  }

  useEffect(() => {
    getVideoUrlInfo();
  }, [articleDetailState]);

  const getVideoUrlInfo = async () => {
    let jwplayerId = articleDetailState[0].jwplayerId
    if (isNotEmpty(jwplayerId)) {
      try {
        const response: RequestVideoUrlSuccessResponse =
          await fetchVideoDetailInfo({mediaID: jwplayerId});
        if (
          isNonEmptyArray(response.playlist) &&
          isNonEmptyArray(response.playlist[0].sources)
        ) {
          const sources = response.playlist[0].sources;
          const videoItem = sources.find(
            item => item.type && item.type.includes('mp4'),
          );
          videoItem &&
            isObjectNonEmpty(videoItem) &&
            setPlayerUrl(videoItem.file);
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  const renderBackIcon = () => (
    <View style={style.backContainer}>
      <BackIcon onPressBack={onPressBack} containerStyle={style.backIconContainerStyle}/>
    </View>
  )

  const articleHtmlContent = (index: number) => (
    <View style={style.labelStyle}>
      <HtmlRenderer source={articleDetailState[index].body}
        tagsStyles={htmlTagStyle} />
    </View>
  )

  const renderRichHTMLContent = (articleItem: ArticleDetailDataType) => {
    const htmlContent = articleItem.richHTML
    if (!isNonEmptyArray(htmlContent)) {
      return null
    }

    return (
      <View style={{padding: 0.04 * screenWidth}}>
        {
          htmlContent?.map((item) => {
            if(!item || !item.type) return null

            switch (item.type) {
              case RichHTMLType.QUOTE:
                return <RenderQuoteElement paragraphInfo={item.data} />
              // case RichHTMLType.CONTENT:
              //   return RenderContentElement(item.data)
              // case RichHTMLType.DESCRIPTION:
              //   return <RenderDescriptionElement paragraphInfo={item.data}  />
              // case RichHTMLType.OPINION:
              //   return RenderOpinionElement(item.data)
              // case RichHTMLType.READ_ALSO:
              //   return RenderReadAlsoElement(item.data)
              case RichHTMLType.NUMBERS:
                return <RenderNumberElement paragraphInfo={item.data}  />
              default: return null
            }
          })
     }
    </View>
    )
  }

  const renderItem = ({ item, index }: { item: ArticleDetailDataType, index: number }) => {
    const relatedArticles = relatedArticleState.slice(index * 2, (index * 2) + 2)

    return (
      <View>
        {isNonEmptyArray(articleDetailState) && <>
          <ArticleDetailWidget articleData={item}
            isRelatedArticle={route.params.isRelatedArticle} 
            isFirstItem={index === 0 }
            currentTime={currentTime} 
            paused={playerVisible ? true : paused}
            playerVisible={playerVisible}
            setPlayerDetails={setPlayerDetails}
          />
          {articleHtmlContent(index)}
          {index == 0 && renderRichHTMLContent(item)}
          <Divider style={style.divider} />
        </>
        }
        {isNonEmptyArray(relatedArticles) &&
          <ShortArticle data={relatedArticles}
            headerLeft={relatedShortArticleHeaderLeft}
            onPress={onPressArticle}
            onUpdateBookmark={onUpdateBookMark}
            showSignUpPopUp={makeSignUpAlert}
            numColumns={isTab ? 2 : 1}
            addStyle={style.relatedArticle}
            orientation={currentOrientation}
            isFooterOutside={true}
          />}
      </View>
  )}

  const setPlayerDetails = (time: any , paused: boolean) => {
    setCurrentTime(time)
    setPaused(paused)
  }

  return (
    <ScreenContainer edge={edge} isLoading={isLoading} 
    isSignUpAlertVisible={showupUp} onCloseSignUpAlert={onCloseSignUpAlert} playerPosition={{bottom: isIOS ? normalize(70) : normalize(60)}} showPlayer={isLoading == false}>
      {!isLoading && isNonEmptyArray(articleDetailState) && <>
        {renderBackIcon()}
        <FlatList
          style={{ flex: 1, height: '100%' }}
          data={articleDetailState}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          bounces={false}
          removeClippedSubviews={false}
          onScroll={onScroll}
          scrollEnabled={scrollEnabled}
        />
        { isNotEmpty(articleDetailState[0].jwplayerId) && playerUrl &&
            <DraggableVideoPlayer setMiniPlayerVisible={(visible: boolean) => setPlayerVisible(visible)} url={playerUrl} setScroll={(scrollEnabled: boolean) => setScrollEnabled(scrollEnabled)}  currentTime={currentTime} setPlayerDetails={setPlayerDetails} paused={playerVisible ? paused : true} playerVisible={playerVisible} /> 
        }
        <View style={style.bottom} />
        <View style={[style.footer, style.shadowEffect]}>
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
    paddingHorizontal: 0.04 * screenWidth,
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
  bottom: {
    height: normalize(50)
  },
  backContainer: {
    width: '100%',
    height: isIOS ? normalize(80) : normalize(45),
    backgroundColor: theme.secondaryWhite,
    justifyContent: 'center',
  },
  shadowEffect: {
    shadowColor: Styles.color.onyx,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: .5,
    shadowRadius: 4,
    elevation: 15,
  },
  videoContainer: {
    position: 'absolute',
    bottom: isIOS ? normalize(80) : normalize(70),
    right: (isTab ? 0.02 : 0.04) * screenWidth,
    left: (isTab ? 0.02 : 0.04) * screenWidth,
    height: 'auto',
    aspectRatio: 1.62,
    backgroundColor: colors.black,
  },
  backIconContainerStyle: {
    marginLeft: isTab ? 15 : 0
  }
})