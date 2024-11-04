import { View, FlatList, StyleSheet, BackHandler, Dimensions, StatusBar, useWindowDimensions } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react'
import { ScreenContainer } from '..'
import { shortArticleWithTagProperties, TranslateConstants, TranslateKey, ScreensConstants } from 'src/constants/Constants'
import { ArticleDetailFooter, VideoPlayerControl, DetailHeader, DetailHeaderTablet } from 'src/components/molecules'
import { Divider, HeaderElementProps, LabelTypeProp, LoadingState } from 'src/components/atoms'
import { Styles } from 'src/shared/styles'
import { articleEventParameter, articleEvents, decodeHTMLTags, horizontalEdge, isIOS, isNonEmptyArray, isNotchDevice, isNotEmpty, isObjectNonEmpty, isTab, joinArray, normalize, recordLogEvent, screenWidth } from 'src/shared/utils'
import { useTheme } from 'src/shared/styles/ThemeProvider'
import { ArticleDetailWidget, ShortArticle } from 'src/components/organisms';
import { ArticleDetailDataType, ArticleReadAlsoType, HTMLElementParseStore, RelatedArticleBodyGet, RelatedArticleDataType, RichHTMLType } from 'src/redux/articleDetail/types'
import Orientation from 'react-native-orientation-locker'
import { Edge } from 'react-native-safe-area-context'
import { useAppCommon, useAppPlayer, useBookmark, useLogin } from 'src/hooks'
import { useIsFocused, useNavigation, useNavigationState } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { colors, CustomThemeType } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { ArticleFontSize } from 'src/redux/appCommon/types'
import { RequestVideoUrlSuccessResponse } from 'src/redux/videoList/types'
import { fetchVideoDetailInfo } from 'src/services/VideoServices'
import { RenderRichHTMLContent } from './components/ArticleDetailRichContent'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget'
import { ArticleDetailBody } from './components/ArticleDetailBody'
import { requestArticleDetail, requestArticleSection, requestRelatedArticle } from 'src/services/articleDetailService'
import { parseArticleDetailSuccess, 
  parseArticleSectionSuccess, 
  parseOpinionBundleSuccess, 
  parseRelatedArticleSuccess, 
  parseRichArticleContentBundleSuccess, 
  parseRichArticleReadAlso, 
  updatedContentBundleContent, 
  updatedOpinionBundle, 
  updatedReadAlsoContent } from 'src/redux/articleDetail/sagas'
import { getBookMarkDetailInfoService } from 'src/services/bookmarkService'
import { requestOpinionArticleDetailAPI } from 'src/services/opinionArticleDetailService'
import { AxiosError } from 'axios'
import { useArticleDetail } from 'src/hooks/useArticleDetail'
import ArticleLiveBlog from './components/ArticleLiveBlog'
import { AnalyticsEvents, EventParameterProps } from 'src/shared/utils/analytics'
import { HOME_UNIT_ID } from 'src/hooks/useAds'
import { AdContainer, AdContainerSize } from 'src/components/atoms/adContainer/AdContainer'
export interface ArticleDetailScreenProps {
  route: any
}


export const ArticleDetailScreen = ({
  route
}: ArticleDetailScreenProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const routes = useNavigationState(state => state.routes)
  const style = useThemeAwareObject(customStyle);
  const isFocused = useIsFocused();
  const dimensions = useWindowDimensions()
  const SHORT_ARTICLE_TITLE = TranslateConstants({key:TranslateKey.SHORT_ARTICLE_TITLE})

  const relatedShortArticleHeaderLeft: HeaderElementProps = {
    title: SHORT_ARTICLE_TITLE,
    labelType: LabelTypeProp.h2,
    color: Styles.color.greenishBlue,
    elementContainerStyle: { paddingVertical: normalize(15) },
    textStyle: {fontSize:20, lineHeight:30}
  }

  const { themeData } = useTheme()
  const { isLoggedIn } = useLogin()
  const { sendBookmarkInfo, removeBookmarkedInfo, bookmarkIdInfo, validateBookmark } = useBookmark()
  const { articleFontSize, storeArticleFontSizeInfo } = useAppCommon()
  const { sendEventToServer } = useArticleDetail()

  const [edge, setEdge] = useState<Edge[]>(horizontalEdge)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [fontSize,setFontSize] = useState<ArticleFontSize>(articleFontSize)
  const [showupUp,setShowPopUp] = useState(false)
  const [articleDetailState, setArticleDetail] = useState<ArticleDetailDataType[]>([])
  const [relatedArticleState, setRelatedArticle] = useState<RelatedArticleDataType[]>([])
  const [currentOrientation, setOrientation] = useState('')
  const [playerUrl, setPlayerUrl] = useState<string>();
  const [playerVisible, setPlayerVisible] = useState<boolean>(false);
  const [showVideoMiniPlayer, setShowVideoMiniPlayer] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showReplay, setShowReplay] = useState(false);
  const [paused, setPaused] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [bookmarkIndex, setBookmarkIndex] = useState<number>(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isEdgeUpdated, setIsEdgeUpdated] = useState(false)
  const [isEdgePortrait, setIsEdgePortrait] = useState(false)
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })
  const [isDefaultDimension, setDefaultDimension] = useState(Dimensions.get('window').width)
  const [isDimensionChanged, setIsDimensionChanged] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isArticleSectionLoaded, setIsArticleSectionLoaded] = useState(false)
  const [richHTML, setRichHTML] = useState<HTMLElementParseStore[]>([])
  const { showMiniPlayer } = useAppPlayer()
  const fullScreenBackgroundColor = isFullScreen ? style.fullScreenBackground.backgroundColor : ''
  
  const detailRoutes = useMemo(() => routes.filter((detailRoute) => 
    detailRoute.name === ScreensConstants.ARTICLE_DETAIL_SCREEN || 
    detailRoute.name === ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN || 
    detailRoute.name === ScreensConstants.WRITERS_DETAIL_SCREEN), [routes]);
  const noOfDetailRoutes = detailRoutes.length

  const videoRefs = useRef<any[]>([]);

  const currentNId = route.params.nid;

  useEffect(() => {
    getArticleDetail()
  }, [])

  const getArticleDetail = async () => {
    recordLogEvent(AnalyticsEvents.ARTICLE_DETAIL_SCREEN, { articleId: currentNId });
    try {
      const response = await requestArticleDetail({ nid: parseInt(currentNId) })
      const result = parseArticleDetailSuccess(response)
      setArticleDetail(result.articleDetailData)
    } catch (error) {
      handleAxiosError(error)
    }
  }

  useEffect(() => {
    if (isNonEmptyArray(articleDetailState) && articleDetailState.length === 1 && isLoading) {
      const firstArticleData = articleDetailState[0];
      setIsLoading(false)
      getVideoUrlInfo(firstArticleData);
      getRelatedArticle(firstArticleData);
      getArticleSection(firstArticleData);
      getRichContentDetail(firstArticleData);
    }
  }, [articleDetailState])

  const getRelatedArticle = async (articleData: ArticleDetailDataType) => {
    if (isObjectNonEmpty(articleData)) {
      const tid = isObjectNonEmpty(articleData.tag_topics) ? articleData.tag_topics.id : ''
      const nid = isObjectNonEmpty(articleData.news_categories) ? articleData.news_categories.id : ''

      const payload: RelatedArticleBodyGet = {}
      if (isNotEmpty(tid)) {
        payload.tid = parseInt(tid)
      }

      if (isNotEmpty(nid)) {
        payload.nid = parseInt(nid)
      }

      if (!isObjectNonEmpty(payload)) {
        return
      }

      try {
        const result = await requestRelatedArticle(payload)
        const response = parseRelatedArticleSuccess(result)
        updatedRelatedArticle(response.relatedArticleData)
      } catch (error) {
        handleAxiosError(error)
      }
    }
  }

  const getArticleSection = async (articleData: ArticleDetailDataType) => {
    const allArticleDetail = [...articleDetailState]
    if (isObjectNonEmpty(articleData)
      && isObjectNonEmpty(articleData.news_categories)
      && isNotEmpty(articleData.news_categories.id)) {
      const sectionParams = { id: parseInt(articleData.news_categories.id), page: 0, items_per_page: 10, current_nid: parseInt(currentNId) }
      try {
        const result = await requestArticleSection(sectionParams)
        const response = parseArticleSectionSuccess(result, parseInt(currentNId))
        setArticleDetail(allArticleDetail.concat(response.articleSectionData))
      } catch (error) {
        handleAxiosError(error)
      }
    }

    setIsArticleSectionLoaded(true)
  }

  const getRichContentDetail = async (articleData: ArticleDetailDataType) => {
    if (isNonEmptyArray(articleData.richHTML)) {
      //Read Also Bundle
      const readAlsoElement: any = articleData.richHTML?.filter((item) => item.type === RichHTMLType.READ_ALSO)
      if (isNonEmptyArray(readAlsoElement)) {
        readAlsoElement.forEach(async (element: ArticleReadAlsoType) => {
          const content = element.data.related_content;
          if (isNonEmptyArray(content)) {
            const nidList = joinArray(content, '+');
            try {
              const readAlsoResponse = await getBookMarkDetailInfoService({ nid: nidList, page: 0 })
              const readAlsoResult = parseRichArticleReadAlso(readAlsoResponse)
              const richHtmlInfo = updatedReadAlsoContent(articleData, readAlsoResult)
              setRichHTML(richHtmlInfo)
            } catch (error) {
              handleAxiosError(error)
            }
          }
        });
      }

      // Content Also Bundle
      const contentElement: any = articleData.richHTML?.filter((item) => item.type === RichHTMLType.CONTENT)
      if (isNonEmptyArray(contentElement) && contentElement[0].data.content) {
        try {
          const contentResponse = await requestArticleDetail({ nid: contentElement[0].data.content })
          const contentResult = parseRichArticleContentBundleSuccess(contentResponse)
          const richHtmlInfo = updatedContentBundleContent(articleData, contentResult)
          setRichHTML(richHtmlInfo)
        } catch (error) {
          handleAxiosError(error)
        }
      }

      //Opinion Bundle
      const opinionElement: any = articleData.richHTML?.filter((item) => item.type === RichHTMLType.OPINION)
      if (isNonEmptyArray(opinionElement)) {
        opinionElement.forEach(async (_: any, index: number) => {
          const opinionId = opinionElement[index].data.opinion;
          const id = isNonEmptyArray(opinionId) ? opinionId[0] : opinionId;
          try {
            const opinionResponse = await requestOpinionArticleDetailAPI({ nid: parseInt(id) })
            const opinionResult = parseOpinionBundleSuccess(opinionResponse)
            const richHtmlInfo = updatedOpinionBundle(articleData, opinionResult)
            setRichHTML(richHtmlInfo)
          } catch (error) {
            handleAxiosError(error)
          }
        });
      }
    }
  }

  const handleAxiosError = (error: any) => {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      console.log("🚀 handleAxiosError ~ errorMessage", errorMessage)
    }
  }
  //Disabled for iPad orientation
  // useEffect(() => {
  //   if (isFocused && isTab ) {
  //     Orientation.unlockAllOrientations();
  //     Orientation.getDeviceOrientation(updateScreenEdge);
  //     Orientation.addDeviceOrientationListener(updateScreenEdge);
  //   }
  //   return () => {
  //     if (!route.params.isRelatedArticle) {
  //       // Orientation.lockToPortrait();
  //       Orientation.removeDeviceOrientationListener(updateScreenEdge);
  //       Orientation.removeAllListeners()
  //     }
  //   };
  // }, [])

  useEffect(() => {
    if (isFocused && isArticleSectionLoaded) {
      sendEventToServer(articleDetailState)
    }
  }, [isArticleSectionLoaded])

  useEffect(() => {
    if (fontSize !== articleFontSize) {
      setFontSize(articleFontSize)
    }
  }, [articleFontSize])

  useEffect(() => {
    if (!isFocused) {
      videoRefs?.current[0]?.setNativeProps({
        paused: true,
      });
      videoRefs?.current[1]?.setNativeProps({
        paused: true,
      });
    }
  }, [isFocused]);

  useEffect(() => {
    if (isNonEmptyArray(richHTML)) {
      const articleInfo = [...articleDetailState]
      articleInfo[0].richHTML = richHTML
      setArticleDetail(articleInfo)
    }
  }, [richHTML])

  useEffect(() => {
    if (isNonEmptyArray(articleDetailState) && articleDetailState[bookmarkIndex] && articleDetailState[bookmarkIndex].nid) {
      const isBookmark = validateBookmark(articleDetailState[bookmarkIndex].nid)
      setIsBookmarked(isBookmark)
    }
  }, [articleDetailState, bookmarkIndex, bookmarkIdInfo])

  useEffect(() => {
    if (isFocused && isNonEmptyArray(relatedArticleState)) {
      const relatedData = [...relatedArticleState]
      updatedRelatedArticle(relatedData)
    }
  }, [isFocused])

  const updatedRelatedArticle = (relatedData: RelatedArticleDataType[]) => {
    if (isNonEmptyArray(relatedData)) {
      const relatedArticleListData = relatedData.filter((data) => { 
        return data.nid !== currentNId
      })
      const relatedArticleInfo = relatedArticleListData.map((item: RelatedArticleDataType) => {
        return {
          ...item,
          ...shortArticleWithTagProperties,
          titleColor: themeData.primaryBlack,
          // flag: item.news_categories && item.news_categories.title, // AMAR-801 Removed section title 
          author: '', // AMAR-801 Removed section title 
          isBookmarked: validateBookmark(item.nid)
        }
      })
      setRelatedArticle(relatedArticleInfo)
    }
  }

  useLayoutEffect(() => {
    if(isDefaultDimension !== dimensions.width && !isDimensionChanged){
      setIsDimensionChanged(true)
    } else if(!isEdgeUpdated && isEdgePortrait){
      setIsDimensionChanged(true)
    }
  },[dimensions,isEdgeUpdated,isEdgePortrait])

  /* We will uncomment the below code when landscape orientation required for mobile
  const updateScreenEdge = (deviceOrientation: OrientationType) => {
    setOrientation(deviceOrientation);
    if(!isEdgeUpdated && (deviceOrientation === 'LANDSCAPE-RIGHT' || deviceOrientation === 'LANDSCAPE-LEFT') && !isEdgePortrait){
      setIsEdgeUpdated(true)
   } else{
     setIsEdgePortrait(true)
   }
    const screenEdge = getScreenEdge(deviceOrientation)
    isNonEmptyArray(screenEdge) && setEdge(screenEdge);
  }


  const getScreenEdge = (deviceOrientation: OrientationType): Edge[] => {
    switch (deviceOrientation) {
      case 'LANDSCAPE-LEFT': return isFullScreen ? horizontalEdge : ['right']
      case 'LANDSCAPE-RIGHT': return isFullScreen ? horizontalEdge : ['left']
      case 'PORTRAIT': return horizontalEdge
      case 'FACE-UP': return []
      default: return horizontalEdge
    }
  }*/

  const stopVideoPlayer = (showReplayProps = false) => {
    try {
      if (videoRefs) {
        videoRefs?.current[0]?.setNativeProps({
          paused: true
        })
        videoRefs?.current[1]?.setNativeProps({
          paused: true
        })
        videoRefs?.current[2]?.setNativeProps({
          paused: true
        })
        setShowReplay(showReplayProps);
      }
    } catch (e) {
    }
  }

  const onPressArticle = (nidProps: string) => {
    if (nidProps && nidProps!==currentNId) {
      stopVideoPlayer(true);
      const hasHTMLContent = isNonEmptyArray(articleDetailState) && isNonEmptyArray(articleDetailState[0].richHTML)
      recordLogEvent(AnalyticsEvents.PRESSED_ON_RELATED_ARTICLE, {relatedArticleId: nidProps});
      navigation.push(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nidProps, isRelatedArticle: true, hasHTMLContent })
    }
  }

  const onPressSave = (nid: string) => {
    const newBookmarked = !isBookmarked
    const data = [...articleDetailState]
    data[bookmarkIndex].isBookmarked = !data[bookmarkIndex].isBookmarked
    setIsBookmarked(newBookmarked)
    const {title,author,publishedDate, body,tagTopicsList} = data[bookmarkIndex];
    const decodeBody = decodeHTMLTags(body);
    const eventParameter = {
      ...articleEventParameter,
      article_name: title,
      article_author: author,
      article_publish_date: publishedDate,
      tags: tagTopicsList,
      article_length: decodeBody.split(' ').length
    }
    onUpdateBookMark(nid, newBookmarked,eventParameter) 
  }

  const onPressFontChange = () => {
    const { title,author,publishedDate,body, tagTopicsList} = articleDetailState[bookmarkIndex];
    const decodeBody = decodeHTMLTags(body);
    const eventName = AnalyticsEvents.FONT_CHANGE;
    articleEvents(title, author, publishedDate, decodeBody, tagTopicsList, eventName);
    storeArticleFontSizeInfo()
  }

  const checkAndUpdateBookmark = (nid: string) => {
    isLoggedIn ? onPressSave(nid) : setShowPopUp(true)
  }

  const onUpdateBookMark = (nid: string, hasBookmarked: boolean,eventParameter: EventParameterProps) => {
    if (isLoggedIn) {
      if (hasBookmarked) {
        recordLogEvent(AnalyticsEvents.ARTICLE_SAVE, eventParameter)
        sendBookmarkInfo({ nid, bundle: PopulateWidgetType.ARTICLE })
      } else {
        recordLogEvent(AnalyticsEvents.ARTICLE_UNSAVE, eventParameter)
        removeBookmarkedInfo({ nid })
      }
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
      if (isTab) {
        Orientation.unlockAllOrientations();
      } else {
        Orientation.lockToPortrait();
      }
    }
    setIsFullScreen(isFullscreen)
  }
  
  // As per ticket AMAR-1044 we dont show the PIP
  // const onScroll = (event: any) => {
  //   Number.parseInt(event.nativeEvent.contentOffset.y) > 100 && showVideoMiniPlayer && !showReplay ? setPlayerVisible(true) : setPlayerVisible(false);
  // }
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
    requestAnimationFrame(() => {
      stopVideoPlayer();
      //Disabled for iPad orientation
      // if (!route.params.isRelatedArticle && isTab) {
      //   Orientation.unlockAllOrientations()
      //   Orientation.lockToPortrait()
      // }

      (isTab && isIOS) ? setTimeout(() => {
        navigation.goBack()
      }, 50) : navigation.goBack()
    });
  }

  const getVideoUrlInfo = async (articleData: ArticleDetailDataType) => {
    const jwplayerId = articleData.jwplayerId
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

  const onHomePress = () => {
    navigation.popToTop()
  }

  const renderHeader = () => {
    const headerProps = {
      visibleHome: noOfDetailRoutes > 1 && route.params.isRelatedArticle,
      onHomePress: () => onHomePress(),
      onBackPress: () => onPressBack(),
    }
    return (
      <View style={style.backContainer}>
        {isTab ? <DetailHeaderTablet {...headerProps} /> : <DetailHeader {...headerProps} />}
      </View>
    )
  };

  const articleHtmlContent = (index: number) => (
    <ArticleDetailBody body={articleDetailState[index].body}
      index={index} articleFontSize={articleFontSize}
      orientation={currentOrientation}
      title = {articleDetailState[index].title}
      author = {articleDetailState[index].author}
      publishedDate = {articleDetailState[index].publishedDate}
      tagTopicsList = {articleDetailState[index].tagTopicsList}
    />
  )

  const renderRichHTMLContent = (articleItem: ArticleDetailDataType) => (
    <RenderRichHTMLContent
      articleItem={articleItem}
      articleFontSize={articleFontSize}
    />
  )

  const renderItem = ({ item, index }: { item: ArticleDetailDataType, index: number }) => {
    const relatedArticleCount = isTab ? 4 : 2;
    const relatedArticles = relatedArticleState.slice(index * relatedArticleCount, (index * relatedArticleCount) + relatedArticleCount)
    const hasArticleSection = isNonEmptyArray(articleDetailState) && articleDetailState.length > 1;
    return (
      <View style={[isTab && style.tabItem, isTab && !hasArticleSection && { paddingBottom: 110 }]}>
        {isNonEmptyArray(articleDetailState) && <>
          <ArticleDetailWidget articleData={item}
            isRelatedArticle={route.params.isRelatedArticle} 
            isFirstItem={index === 0 }
            currentTime={currentTime} 
            paused={isFullScreen ? true : paused}
            playerVisible={playerVisible}
            setPlayerDetails={setPlayerDetails}
            setMiniPlayerVisible={(visible: boolean) => setShowVideoMiniPlayer(visible)}
            videoRefs={videoRefs}
            onChangeFullScreen={onChangeFullScreen}
            isFullScreen={isFullScreen}
            showReplay={showReplay}
            setReset={(show: boolean) => setShowReplay(show)}
          />
          <AdContainer unitId={HOME_UNIT_ID} size={AdContainerSize.MEDIUM}/>
          {articleHtmlContent(index)}
          {index === 0 && renderRichHTMLContent(item)}
          { isNotEmpty(item.scribbleLiveId) && <ArticleLiveBlog scribbleId={item.scribbleLiveId}/>}
          <AdContainer unitId={HOME_UNIT_ID} size={AdContainerSize.MEDIUM}/>
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
            leftContainerStyle={isTab && style.leftContainerStyle}
            imageStyleProp={isTab && style.imageContainer}
          />}
      </View>
  )
}

  const setPlayerDetails = (time: any , pausedProps: boolean) => {
    setCurrentTime(time)
    setPaused(pausedProps)
  }
  // As per ticket AMAR-1044 we dont show the PIP
  // const closeMiniPlayer = (visible: boolean) => {
  //   setPlayerVisible(visible);
  //   setShowVideoMiniPlayer(visible)
  // }

  const onViewableItemRef = useRef((viewableItems: any) => {
    const {title,author,publishedDate,tagTopicsList,body} = viewableItems.changed[0].item;
    const decodeBody = decodeHTMLTags(body);
    const eventName = AnalyticsEvents.DYNAMIC_ARTICLE_LOAD;
    articleEvents(title, author, publishedDate, decodeBody, tagTopicsList, eventName);
    if(viewableItems.changed.length === 2) {
      const {title: viewedTitle, 
        author: viewedAuthor,
        publishedDate : viewedPublishedDate,
        tagTopicsList: viewedTagTopicsList,
        body: viewedBody
      } = viewableItems.changed[1].item;
      const decodeBody = decodeHTMLTags(viewedBody);
      const eventName = AnalyticsEvents.ARTICLE_COMPLETED;
      articleEvents(viewedTitle, viewedAuthor, viewedPublishedDate, decodeBody, viewedTagTopicsList, eventName);
    } 
    setBookmarkIndex(viewableItems.changed[0].index)
  })
  

  const onEndReachedHandler = () => {
    if(articleDetailState && articleDetailState.length === 1 && isArticleSectionLoaded) {
      const { author, title, publishedDate, tagTopicsList,body} = articleDetailState[0];
      const decodeBody = decodeHTMLTags(body);
      const eventName = AnalyticsEvents.ARTICLE_COMPLETED;
      articleEvents(title, author, publishedDate, decodeBody, tagTopicsList, eventName);
    }
  }

  return (
    <ScreenContainer edge={edge} isLoading={isLoading}  isLandscape 
    backgroundColor={fullScreenBackgroundColor}
    isSignUpAlertVisible={showupUp} onCloseSignUpAlert={onCloseSignUpAlert} playerPosition={{bottom: isTab ? 104 : isIOS ? normalize(70) : normalize(60)}} showPlayer={isLoading === false}>
      {isNonEmptyArray(articleDetailState) && <View style={{flex: !isFullScreen ? 1 : 0}}>
        { !isFullScreen &&  renderHeader()}
        <AdContainer unitId={HOME_UNIT_ID}/>        
        <FlatList
          testID='ArticleDetailScreenFlatlist01'
          onViewableItemsChanged={onViewableItemRef.current}
          viewabilityConfig={viewConfigRef.current}
          style={style.containerStyle}
          data={articleDetailState}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          bounces={false}
          removeClippedSubviews={false}
          // onScroll={onScroll} As per ticket AMAR-1044 we dont show the PIP
          scrollEnabled={scrollEnabled}
          contentContainerStyle={showMiniPlayer && style.contentContainer}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          onEndReached={onEndReachedHandler}
          onEndReachedThreshold={0.5}
        />
        {/* As per ticket AMAR-1044 we dont show the PIP
        {isNotEmpty(articleDetailState[0].jwplayerId) && playerUrl && !isFullScreen && 
          <DraggableVideoPlayer videoRefs={videoRefs} setMiniPlayerVisible={closeMiniPlayer} url={playerUrl}
            setScroll={(scrollEnabled: boolean) => setScrollEnabled(scrollEnabled)}
            currentTime={currentTime} setPlayerDetails={setPlayerDetails}
            paused={playerVisible ? paused : true} playerVisible={playerVisible}
            setReset={(show: boolean) => setShowReplay(show)}
          />
        } */}
        { !isFullScreen && <View style={style.bottom} />}
        {!isArticleSectionLoaded && <View style={style.bottomSpinner}>
          <LoadingState />
        </View>}
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
          showReplay={showReplay}
          setReset={(show: boolean) => setShowReplay(show)}
        />
      </View>}
    </ScreenContainer>
  )
}
const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  footer: {
    width: '100%'
  },
  relatedArticle: {
    paddingHorizontal: (isTab ? 0 : 0.04) * screenWidth,
    paddingBottom: isTab ? normalize(50) : normalize(20),
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
    height: isTab ? 83 : isIOS ? isNotchDevice ? normalize(98) : normalize(92) : normalize(72),
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
  fullScreenContainer: {
    backgroundColor: Styles.color.black
  },
  contentContainer: {
    paddingBottom: normalize(80)
  },
  leftContainerStyle: {
    width: '70%',
  },
  containerStyle: {
    flex: 1,
    height: '100%'
  },
  bottomSpinner: {
    width: '100%',
    height: normalize(45),
    backgroundColor: colors.transparent,
    position: 'absolute', 
    bottom: isIOS ? normalize(70) : normalize(60)
  },
  fullScreenBackground: {
    backgroundColor: colors.black
  },
  tabItem: {
    paddingHorizontal: normalize(50)
  },
  imageContainer: {
    width:'30%'
  }
})

