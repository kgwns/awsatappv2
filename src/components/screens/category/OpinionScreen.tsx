import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  OpinionWritersArticlesSection,
  OpinionWritersSection,
} from 'src/components/organisms';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useOpinionWriter} from 'src/hooks/useOpinionWriter';
import {useOpinions} from 'src/hooks/useOpinions';
import {WritersBodyGet} from 'src/redux/writers/types';
import { OpinionsListItemType } from 'src/redux/opinions/types';
import { useAppPlayer, useBookmark, useLogin } from 'src/hooks';
import { horizontalEdge, isNonEmptyArray, normalize } from 'src/shared/utils';
import { ScreensConstants } from 'src/constants/Constants';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenContainer } from '../ScreenContainer/ScreenContainer';
import PopUp, { PopUpType } from 'src/components/organisms/popUp/PopUp';
import { PopulateWidgetType } from 'src/components/molecules/populateWidget/PopulateWidget';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const OpinionScreen = React.memo(({tabIndex, currentIndex, scrollY}: {tabIndex?:number; currentIndex?:number; scrollY?: any;}) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const scrollYValue = scrollY ? scrollY : new Animated.Value(0);

  const [page, setPage] = useState(0);
  const [isShowPlayer, setIsShowPlayer] = useState(false)

  const writersPayload: WritersBodyGet = {
    items_per_page: 10,
  };

  const gotoNextPage = () => {
    if (!isLoading) {
      setPage(page + 1);
    }
  };

  const style = useThemeAwareObject(customStyle);

  const {opinionWriterData, fetchOpinionWriterRequest} = useOpinionWriter();
  const { opinionsData, isLoading, fetchOpinionsRequest, emptyOpinionsData } = useOpinions();

  const isFocused = useIsFocused();

  const ref = React.useRef(null);

  useEffect(() => {
    if(tabIndex === currentIndex){
      global.refFlatList = ref;
    }
  }, [currentIndex])

  useEffect(() => {
    setIsShowPlayer(true)  
  },[])

  useEffect(() => {
    isFocused && emptyOpinionsData();
    setOpinionsDataInfo([]);
    fetchOpinionWriterRequest(writersPayload);
    return()=>{
      setOpinionsDataInfo([]);
    }
  }, []);

  useEffect(() => {
    fetchOpinionsRequest({ page });
  }, [page]);

  const {
    sendBookmarkInfo,
    removeBookmarkedInfo,
    bookmarkIdInfo
  } = useBookmark()
  const { isLoggedIn } = useLogin()
  const { showMiniPlayer } = useAppPlayer()

  const [opinionsDataInfo, setOpinionsDataInfo] = useState(opinionsData)
  const [showupUp,setShowPopUp] = useState(false)
  useEffect(() => {
    updateOpinionsData()
  }, [opinionsData,bookmarkIdInfo,isFocused])

  const updateOpinionsData = () => {
    if(isNonEmptyArray(opinionsData) && isFocused) {
      const opinions = updateBookmark(opinionsData)
      setOpinionsDataInfo(opinions)
    }
  }

  const updateBookmark = (data: OpinionsListItemType[]) => {
    return data.map((item: OpinionsListItemType) => (
      {
        ...item,
        isBookmarked: validateBookmark(item.nid)
      }
    ))
  }

  const validateBookmark = (nid: string): boolean => {
    return isNonEmptyArray(bookmarkIdInfo) ? bookmarkIdInfo.some(value => value.nid == nid) : false
  }

  const updatedChangeBookmark = (data: OpinionsListItemType[], index: number) => {
    const updatedData = [...data]
    const bookmarkStatus = !updatedData[index]?.isBookmarked ?? true
    updatedData[index].isBookmarked = bookmarkStatus
    updateBookmarkInfo(updatedData[index].nid, bookmarkStatus)
    return updatedData
  }

  const onPressSignUp = () => {
    setShowPopUp(false)
    navigation.reset({
      index: 0,
      routes: [{name: ScreensConstants.AuthNavigator}],
    });
  }

  const updateBookmarkInfo = (nid: string, isBookmarked: boolean) => {
    if (isLoggedIn) {
      isBookmarked ? sendBookmarkInfo({ nid, bundle: PopulateWidgetType.OPINION }) : removeBookmarkedInfo({ nid })
    } else {
      setShowPopUp(true)
    }
  }

  const onClosePopUp = () => {
    setShowPopUp(false)
  }

  const updatedOpinionArticlesBookmark = (index: number) => {
    if(!isLoggedIn) {
      setShowPopUp(true)
      return
    }
    const updatedData = updatedChangeBookmark(opinionsDataInfo, index)
    setOpinionsDataInfo(updatedData)
  }

  const onPressWriter = (tid: string) => {
    navigation.navigate(ScreensConstants.WRITERS_DETAIL_SCREEN, {tid})
  }

  const renderItem = () => (
    <View style={style.itemContainer}>
      {isNonEmptyArray(opinionWriterData) &&
        <OpinionWritersSection data={opinionWriterData}
          onPressWriter={onPressWriter}
        />
      }
      {isNonEmptyArray(opinionsDataInfo) &&
        <OpinionWritersArticlesSection
          data={opinionsDataInfo}
          onScroll={() => gotoNextPage()}
          isLoading={isLoading}
          onUpdateOpinionArticlesBookmark={updatedOpinionArticlesBookmark}
        />
      }
  </View>
  );

  

  return (
    <ScreenContainer  edge={horizontalEdge} isLoading={!isNonEmptyArray(opinionWriterData) || !isNonEmptyArray(opinionsData)} showPlayer={isShowPlayer}
      backgroundColor={style.screenBackgroundColor?.backgroundColor}>
      <View style={style.container}>
      <AnimatedFlatList
        ref={ref}
        onScrollBeginDrag={() => global.refFlatList = ref}
        onScroll={Animated.event(
          [{nativeEvent: { contentOffset: {y: scrollYValue}}}],
          {useNativeDriver: false}
        )}
        scrollEventThrottle={16}
        data={[{}]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={showMiniPlayer && style.contentContainer}
      />
       <PopUp type={PopUpType.rbSheet}
        onPressButton={onPressSignUp}
        showPopUp={showupUp}
        onClosePopUp={onClosePopUp} />
    </View>
    </ScreenContainer>
    
  );
});

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
    },
    articleSection: {
      marginTop: normalize(10)
    },
    contentContainer: {
      paddingBottom: normalize(80)
    },
    screenBackgroundColor: {
      backgroundColor: theme.backgroundColor,
    },
    itemContainer: {
      width: '100%' 
    }
  });
};
