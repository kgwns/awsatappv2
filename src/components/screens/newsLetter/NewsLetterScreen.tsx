import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { Label, NextButton } from 'src/components/atoms';
import { CustomAlert, horizontalEdge, isNonEmptyArray, isObjectNonEmpty, isTab, joinArray, normalize, screenWidth } from 'src/shared/utils';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { ScreenContainer } from '..';
import { ScreensConstants } from 'src/constants';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
import { NewsLettersWidget } from 'src/components/organisms';
import { useNewsLetters } from 'src/hooks';
import { NewsLetterItemType } from 'src/redux/newsLetter/types';

export const NewsLetterScreen = ({ navigation, route }: any) => {

  const [t] = useTranslation();
  const style = useThemeAwareObject(customStyle);
  const [disableNext, setDisableNext] = useState<boolean>(true)
  const [canGoBack, setCanGoBack] = useState((route.params && route.params.canGoBack)?true:false)
  const [newsLettersDataInfo, setNewsLettersDataInfo] = useState<NewsLetterItemType[]>([])
  const isFocused = useIsFocused();

  const { getSelectedNewsLettersData, selectedNewsLettersData, sentNewsLettersInfoData, sendSelectedNewsLettersInfo, emptySelectedNewsLettersInfoData, isLoading , myNewsLetters, isMyNewsLoading, getMyNewsLettersData, sendSelectedFromNewsletterOnboard, selectedNewsLetterDataOnboard } = useNewsLetters()

  useEffect(() => {
    getSelectedNewsLettersData();
    if (route.params && route.params.canGoBack) {
      setCanGoBack(true)
      setDisableNext(true)
    }else{
      setCanGoBack(false)
    }
    return () => {
      emptySelectedNewsLettersInfoData();
    }
  }, [isFocused]);

  useEffect(()=>{
    if (canGoBack) {
      getMyNewsLettersData();
    }else{
      setInitialData()
    }
  },[selectedNewsLettersData])

  useEffect(()=>{
    if (canGoBack) {
      setMyNewsLettersData();
    }
  },[myNewsLetters])

  useEffect(() => {
    if (isObjectNonEmpty(sentNewsLettersInfoData)) {
      if (sentNewsLettersInfoData.code === 200) {
        if(!canGoBack){
          const selectedTIDData = getSelectedData()
          sendSelectedFromNewsletterOnboard(selectedTIDData)
          gotoNext()
        }
      } else {
        CustomAlert({
          title: '',
          message: sentNewsLettersInfoData.message || ''
        })
      }
    }
  }, [sentNewsLettersInfoData]);

  useEffect(() => {
    if (!canGoBack) {
      const data = updateNewsLettersData()
      setNewsLettersDataInfo(data)
      isNonEmptyArray(newsLettersDataInfo) && updateNextButton();
    }
  }, [isFocused, selectedNewsLettersData, selectedNewsLetterDataOnboard])

  const updateNewsLettersData = () => {
    const data = []
    if (selectedNewsLettersData.code && selectedNewsLettersData.code === 200 && isNonEmptyArray(selectedNewsLettersData.data)) {
      for (let i = 0; i < selectedNewsLettersData.data.length; i++) {
        let item = selectedNewsLettersData.data[i]
        data.push({
          title: item.name,
          subTitle: item.date,
          description: item.description,
          image: item.image,
          tid: item.id,
          isSelected: getSelectedStatus(item.id),
        })
      }
    }
    return data
  }

  const getSelectedStatus = (id: number) => {
    if (isNonEmptyArray(selectedNewsLetterDataOnboard)) {
      for (let j = 0; j < selectedNewsLetterDataOnboard.length; j++) {
        if (selectedNewsLetterDataOnboard[j] === id) {
          return true
        }
      }
      return false
    }
    else {
      return false
    }
  }

  const formatNewsLettersData = () => {
    const data = []
    if(selectedNewsLettersData.code && selectedNewsLettersData.code===200 && isNonEmptyArray(selectedNewsLettersData.data)){
      for (let i = 0; i < selectedNewsLettersData.data.length; i++) {
        let item = selectedNewsLettersData.data[i]
        data.push({
          title: item.name,
          subTitle: item.date,
          description: item.description,
          image: item.image,
          tid: item.id,
          isSelected: false,
        })
      }
    }
    return data
  }

  const setInitialData = () => {
    let data = formatNewsLettersData()
    setNewsLettersDataInfo(data)
    updateNextButton()
  }

  const getSelectedOrNot = (tid: any) => {
    for (let i = 0; i < myNewsLetters.data.length; i++) {
      if (tid == myNewsLetters.data[i].tid) {
        return true
      }
    }
    return false
  }

  const setMyNewsLettersData = () => {
    if (isNonEmptyArray(myNewsLetters.data) && isNonEmptyArray(selectedNewsLettersData.data)) {
      const data = []
      for (let i = 0; i < selectedNewsLettersData.data.length; i++) {
        let item = selectedNewsLettersData.data[i]
        data.push({
          title: item.name,
          subTitle: item.date,
          description: item.description,
          image: item.image,
          tid: item.id,
          isSelected: getSelectedOrNot(item.id),
        })
      }
      setNewsLettersDataInfo(data)
    }else{
      let newsLettersData = formatNewsLettersData()
      setNewsLettersDataInfo(newsLettersData)
    }
  }

  const changeSelectedStatus = (item: any, selected: boolean) => {
    for (let i = 0; i < newsLettersDataInfo.length; i++) {
      if (item.tid == newsLettersDataInfo[i].tid) {
        newsLettersDataInfo[i].isSelected = !newsLettersDataInfo[i].isSelected;
      }
    }
    if(canGoBack){
      let selectedList = getSelectedData();
      sendSelectedNewsLettersInfo({ tid: joinArray(selectedList) })
    }else{
      updateNextButton()
    }
  };

  const updateNextButton = () => {
    const selectedTIDData = getSelectedData()
    const disableNext = isNonEmptyArray(selectedTIDData) ? false : true
    setDisableNext(disableNext)
  }

  const getSelectedData = () => {
    return newsLettersDataInfo.reduce((prevValue: string[], item: NewsLetterItemType) => {
      if (item.isSelected) {
        return prevValue.concat(item.tid)
      }
      return prevValue
    }, [])
  }

  const onPressNext = () => {
    if (isNonEmptyArray(getSelectedData())) {
      sendSelectedNewsLettersInfo({ tid: joinArray(getSelectedData()) })
    }
  }

  const gotoNext = () => {
    if (route.params && canGoBack) {
      navigation.goBack()
    } else {
      navigation.navigate(ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN)
    }
  }

  return (
    <ScreenContainer edge={horizontalEdge} isOverlayLoading={isLoading}>
      <View style={style.container}>
        <View style={[style.textContainer, { justifyContent:  'center' }]}>
          {!canGoBack && <Label style={style.titleStyle}>
            {t('onBoard.newsLetter.title')}
          </Label>}
          <Label style={style.descStyle}>
            {t('onBoard.newsLetter.description')}
          </Label>
        </View>
        <View style={style.contentStyle}>
          {isNonEmptyArray(newsLettersDataInfo) &&
            <View>
              <NewsLettersWidget data={newsLettersDataInfo} changeSelectedStatus={changeSelectedStatus} />
            </View>
          }
        </View>
        <View style={style.nextButtonView}>
          {!disableNext && <NextButton
            disabled={disableNext}
            testID="nextButtonTestId"
            title={t('onBoard.common.nextBtn')}
            onPress={onPressNext}
            style={style}
            icon={!canGoBack}
          />}
        </View>
      </View>
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const NewsLetterScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.backgroundColor,
      shadowColor: colors.transparent,
      alignContent: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      paddingBottom: normalize(10)
    },
    textContainer: {
      flex: 0.15,
      paddingHorizontal: normalize(5),
    },
    titleStyle: {
      textAlign: 'center',
      fontSize: normalize(20),
      fontWeight: 'bold',
      color: theme.primary,
      lineHeight: normalize(30),
    },
    descStyle: {
      textAlign: 'center',
      fontSize: normalize(15),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(22),
    },
    contentStyle: {
      flex: 0.75,
      justifyContent: 'flex-start',
      paddingVertical: normalize(15),
    },
    nextButtonView: {
      flex: 0.1,
      justifyContent: 'flex-end',
      width: isTab ? screenWidth - (2 * 0.02 * screenWidth) : screenWidth - (2 * 0.04 * screenWidth),
      alignSelf: 'center',
      marginBottom: normalize(0.02 * ScreenHeight),
    },
    nextButtonContainer: {
      height: normalize(51),
      flexDirection: 'row-reverse',
      backgroundColor: theme.secondaryGreen,
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: normalize(25),
    },
    nextButtonIconContainer: { position: 'absolute', left: normalize(20) },
    nextButtonText: {
      color: theme.primary,
      textAlign: 'center',
      width: '100%',
      fontSize: normalize(16),
      fontWeight: 'bold',
      lineHeight: normalize(20),
    },
  });
  return NewsLetterScreenStyle;
};
