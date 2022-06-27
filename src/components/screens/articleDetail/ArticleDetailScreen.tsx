import { View, FlatList, StyleSheet, Animated, BackHandler, Dimensions, ScrollView, StatusBar } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ScreenContainer } from '..'
import { ShortArticle } from 'src/components/organisms'
import { shortArticleWithTagProperties } from 'src/constants/SampleData'
import { ArticleDetailFooter, DraggableVideoPlayer, VideoPlayerControl } from 'src/components/molecules'
import { Divider, HeaderElementProps, Label, LabelTypeProp } from 'src/components/atoms'
import { Styles } from 'src/shared/styles'
import { horizontalEdge, isIOS, isNonEmptyArray, isNotEmpty, isObjectNonEmpty, isTab, normalize, recordLogEvent, screenWidth } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { ArticleDetailWidget } from 'src/components/organisms';
import { useArticleDetail } from 'src/hooks/useArticleDetail'
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
import { BackIcon } from 'src/components/atoms'
import { RequestVideoUrlSuccessResponse } from 'src/redux/videoList/types'
import { fetchVideoDetailInfo } from 'src/services/VideoServices'
import { 
  articleHtml,
  RenderContentElement, RenderDescriptionElement, RenderNumberElement, 
  RenderOpinionElement, RenderQuoteElement, RenderReadAlsoElement 
} from './components/ArticleDetailRichContent'
import AutoHeightWebView from 'react-native-autoheight-webview'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { ANDROID_WEBVIEW_URL, IOS_WEBVIEW_URL } from 'src/constants/SharedConstants'

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
  const [showVideoMiniPlayer, setShowVideoMiniPlayer] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const videoRefs = useRef<any[]>([]);
  const [bookmarkIndex, setBookmarkIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })

  var webviewRef: any[] =[React.createRef()];

  const currentNId = route.params.nid;

  const script = () => {
    const newFontSize = isTab ? 1.3 * articleFontSize : isIOS ? 1.15 * articleFontSize : articleFontSize
    return `
      var pTagElement = document.getElementsByTagName("p");

      if(pTagElement && pTagElement.length > 0) {
        for(i=0; i < pTagElement.length; i++) {
          pTagElement[i].style.fontSize = "${newFontSize}px"
          pTagElement[i].style.lineHeight = "${1.8 * newFontSize}px"
          pTagElement[i].style.color = "${themeData.primaryBlack}"
          pTagElement[i].style.textAlign = "justify"
          pTagElement[i].style.direction = "rtl"
          pTagElement[i].style.writingDirection = "rtl"
          pTagElement[i].style.margin = 0
        }
      }

      var divTagElement = document.getElementsByTagName("div");
      if(divTagElement && divTagElement.length > 0) {
        for(i=0; i < divTagElement.length; i++) {
          divTagElement[i].style.fontSize = "${newFontSize}px"
          divTagElement[i].style.lineHeight = "${1.8 * newFontSize}px"
          divTagElement[i].style.color = "${themeData.primaryBlack}"
          divTagElement[i].style.textAlign = "justify"
          divTagElement[i].style.direction = "rtl"
          divTagElement[i].style.writingDirection = "rtl"
          divTagElement[i].style.margin = 0
        }
      }

      var imageElement = document.getElementsByTagName("img");
      if(imageElement && imageElement.length > 0) {
        for(i=0; i < imageElement.length; i++) {
          imageElement[i].style["max-width"] = "100%"; 
          imageElement[i].style["height"] = "auto"; 
        } 
      }
       
      true;  // note: this is required, or you'll sometimes get silent failures
      `;
  };

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
      if(webviewRef) {
        webviewRef.map((_, index) => {
          webviewRef[index].injectJavaScript(script());
        })
      }
    }
  }, [articleFontSize])


  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
  }

  useEffect(() => {
    if (isNonEmptyArray(articleDetailData) && route.params && route.params.nid && isFocused) {
      const isBookmarked = validateBookmark(articleDetailData[bookmarkIndex].nid)
      setIsBookmarked(isBookmarked)

      if(articleDetailData.length > webviewRef.length) {
        const newReferenceCount = articleDetailData.length - webviewRef.length
        let reference = React.createRef()
        const newReference = Array(newReferenceCount).fill(reference)
        webviewRef.concat(newReference)
      }

      setArticleDetail(articleDetailData)
    }
  }, [articleDetailData, bookmarkIndex])

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

  useEffect(() => {
    emptyAllData();
    if (isFocused) {
      recordLogEvent('Article_Details_Screen', { articleId: currentNId });
      getArticleDetail(currentNId)
    }

    const makeEmptyArticleData = () => {
      const { hasHTMLContent } = route.params
      if(!hasHTMLContent) {
        emptyAllData()
      }
    }

    return () => {
      makeEmptyArticleData()
    }
  }, [isFocused])

  const updateScreenEdge = (deviceOrientation: OrientationType) => {
    setOrientation(deviceOrientation);
    const edge = getScreenEdge(deviceOrientation)
    setEdge(edge)
  }


  const getScreenEdge = (deviceOrientation: OrientationType): Edge[] => {
    switch (deviceOrientation) {
      case 'LANDSCAPE-LEFT': return isFullScreen ? horizontalEdge : ['right']
      case 'LANDSCAPE-RIGHT': return isFullScreen ? horizontalEdge : ['left']
      case 'PORTRAIT': return horizontalEdge
      default: return horizontalEdge
    }
  }

  const getArticleDetail = (id: string) => {
    fetchArticleDetail({ nid: parseInt(id) })
  }

  const stopVideoPlayer = () => {
    videoRefs?.current[0]?.setNativeProps({
      paused: true
    })
    videoRefs?.current[1]?.setNativeProps({
      paused: true
    })
    videoRefs?.current[2]?.setNativeProps({
      paused: true
    })
    setPlayerVisible(false);
  }

  const onPressArticle = (nid: string) => {
    if (nid && nid!=currentNId) {
      stopVideoPlayer();
      const hasHTMLContent = isNonEmptyArray(articleDetailData) && isNonEmptyArray(articleDetailData[0].richHTML)
      recordLogEvent('Pressed_On_Related_Article', {relatedArticleId: nid});
      emptyAllData();
      navigation.push(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid, isRelatedArticle: true, hasHTMLContent })
    }
  }

  const onPressSave = (nid: string) => {
    const newBookmarked = !isBookmarked
    const data = [...articleDetailState]
    data[bookmarkIndex].isBookmarked = !data[bookmarkIndex].isBookmarked
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

  const onChangeFullScreen = (isFullscreen: boolean) => {
    if(isFullscreen){
      StatusBar.setHidden(true);
      SystemNavigationBar.navigationHide();
      Orientation.lockToLandscape();
    }else{
      StatusBar.setHidden(false)
      SystemNavigationBar.navigationShow();
      Orientation.lockToPortrait();
      Orientation.unlockAllOrientations();
    }
    setIsFullScreen(isFullscreen)
  }

  const onScroll = (event: any) => {
    setScrollY(event.nativeEvent.contentOffset.y)
    Number.parseInt(event.nativeEvent.contentOffset.y) > 100 && showVideoMiniPlayer ? setPlayerVisible(true) : setPlayerVisible(false);
  }

  useEffect(() => {
    const backAction = () => {
      let value  = false;
      if(isFullScreen){
        value  = true
        onChangeFullScreen(false);
      }else{
        stopVideoPlayer()
      }
      return value
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isFullScreen]);

  const onPressBack = () => {
    stopVideoPlayer()
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

  const browserOptions = async (url: string) => {
    try {
      const result = await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: 'close',
        readerMode: false,
        modalEnabled: true,
        animated: true,
        enableBarCollapsing: true,
        // // Android Properties
        showTitle: true,
      })
      console.log('InAppBrowser result', JSON.stringify(result))
    } catch (error: any) {
      console.log('InAppBrowser ERROR', error.message)
    }
  }

  const onShouldStartLoadWithRequest = (event: any) => {
    const HTML_URL = isIOS ? IOS_WEBVIEW_URL : ANDROID_WEBVIEW_URL; // "file:///" : "about:blank"
    const URL = event.url

    if (isIOS) {
      if (event.navigationType == 'click') {
        browserOptions(URL);
        return false
      }
    }
    else {
      if (!URL.includes(HTML_URL)) {
        browserOptions(URL);
        return false
      }
    }
    return true
  }

  const articleHtmlContent = (index: number) => {
    return (
      <ScrollView scrollEnabled={true} style={style.labelStyle}>
        <AutoHeightWebView
          style={style.webView}
          source={{ html: articleHtml({ body: articleDetailState[index].body }), baseUrl: '' }}
          ref={(r) => (webviewRef[index] = r)}
          domStorageEnabled={true}
          bounces={false}
          originWhitelist={["*"]}
          nestedScrollEnabled={false}
          scalesPageToFit={false}
          onMessage={(event) => {
            console.log(event.nativeEvent.data);
          }}
          onLoadEnd={() => {
            webviewRef[index].injectJavaScript(script())
          }}
          injectedJavaScript={script()}
          injectedJavaScriptBeforeContentLoaded={script()}
          onShouldStartLoadWithRequest={(event) => onShouldStartLoadWithRequest(event)}
        />
      </ScrollView>
    )
  }

  const renderRichHTMLContent = (articleItem: ArticleDetailDataType) => {
    const htmlContent = articleItem.richHTML ?? []
    if (!isNonEmptyArray(htmlContent)) {
      return null
    }

    const updatedFontSize = isTab ? 1.3 * articleFontSize : isIOS ? 1.15 * articleFontSize : articleFontSize
    return (
      <View style={{padding: 0.04 * screenWidth}}>
        {
          htmlContent?.map((item) => {
            if(!item || !item.type) return null

            switch (item.type) {
              case RichHTMLType.QUOTE:
                return <RenderQuoteElement paragraphInfo={item.data} />
              case RichHTMLType.CONTENT:
                return <RenderContentElement paragraphInfo={item.data} />
              case RichHTMLType.DESCRIPTION:
                return <RenderDescriptionElement paragraphInfo={item.data} fontSize={updatedFontSize} />
              case RichHTMLType.OPINION:
                return <RenderOpinionElement paragraphInfo={item.data}/>
              case RichHTMLType.READ_ALSO:
                return <RenderReadAlsoElement paragraphInfo={item.data}/>
              case RichHTMLType.NUMBERS:
                return <RenderNumberElement paragraphInfo={item.data}  fontSize={updatedFontSize}/>
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
            paused={playerVisible || isFullScreen ? true : paused}
            playerVisible={playerVisible}
            setPlayerDetails={setPlayerDetails}
            setMiniPlayerVisible={(visible: boolean) => setShowVideoMiniPlayer(visible)}
            videoRefs={videoRefs}
            onChangeFullScreen={onChangeFullScreen}
            isFullScreen={isFullScreen}
          />
          {articleHtmlContent(index)}
          {index === 0 && renderRichHTMLContent(item)}
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

  const closeMiniPlayer = (visible: boolean) => {
    setPlayerVisible(visible);
    setShowVideoMiniPlayer(visible)
  }

  const onViewableItemRef = useRef((viewableItems: any) => {
    setBookmarkIndex(viewableItems.changed[0].index)
  })

  return (
    <ScreenContainer edge={edge} isLoading={isLoading} 
    isSignUpAlertVisible={showupUp} onCloseSignUpAlert={onCloseSignUpAlert} playerPosition={{bottom: isIOS ? normalize(70) : normalize(60)}} showPlayer={isLoading == false}>
      {!isLoading && isNonEmptyArray(articleDetailState) && <View style={{flex: !isFullScreen ? 1 : 0}}>
        { !isFullScreen &&  renderBackIcon()}
        <FlatList
          onViewableItemsChanged={onViewableItemRef.current}
          viewabilityConfig={viewConfigRef.current}
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
        {isNotEmpty(articleDetailState[0].jwplayerId) && playerUrl && !isFullScreen && 
          <DraggableVideoPlayer videoRefs={videoRefs} setMiniPlayerVisible={closeMiniPlayer} url={playerUrl}
            setScroll={(scrollEnabled: boolean) => setScrollEnabled(scrollEnabled)}
            currentTime={currentTime} setPlayerDetails={setPlayerDetails}
            paused={playerVisible ? paused : true} playerVisible={playerVisible}
          />
        }
        { !isFullScreen && <View style={style.bottom} />}
        {!isFullScreen && <View style={[style.footer, style.shadowEffect]}>
          <ArticleDetailFooter articleDetailData={articleDetailState[bookmarkIndex]}
            isBookmarked={isBookmarked}
            onPressSave={() => checkAndUpdateBookmark(articleDetailState[bookmarkIndex].nid)}
            onPressFontChange={onPressFontChange}
          />
        </View>}
      </View>
      }
      {playerUrl && <View style={[{display: isFullScreen ? 'flex' : 'none', flex: isFullScreen ? 1 : 0}, style.fullScreenContainer]}>
        <VideoPlayerControl
          url={playerUrl}
          currentTime={currentTime} 
          paused={isFullScreen ? paused : true}
          setPlayerDetails={setPlayerDetails}
          videoRefs={videoRefs}
          onChangeFullScreen={onChangeFullScreen}
          isFullScreenPlayer
          isFullScreen={isFullScreen}
        />
      </View>}
    </ScreenContainer>
  )
}
const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  labelStyle: {
    marginHorizontal: 0.04 * screenWidth,
    overflow: 'hidden',
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
  },
  webView: {
    width: '100%',
    marginTop: 20,
    backgroundColor: 'transparent',
    opacity: 0.99,
    flex: 1,
  },
  fullScreenContainer: {
    backgroundColor: Styles.color.black
  }
})