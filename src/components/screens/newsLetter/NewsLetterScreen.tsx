import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { Label, NextButton } from 'src/components/atoms';
import { CustomAlert, horizontalEdge, isNonEmptyArray, isObjectNonEmpty, isTab, joinArray, normalize, screenHeight, screenWidth } from 'src/shared/utils';
import { useIsFocused } from '@react-navigation/native';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { ScreenContainer } from '..';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { NewsLettersWidget } from 'src/components/organisms';
import { useNewsLetters } from 'src/hooks';
import { NewsLetterItemType } from 'src/redux/newsLetter/types';
import { fonts } from 'src/shared/styles/fonts';

export const NewsLetterScreen = ({ navigation, route }: any) => {

  const ONBOARD_COMMON_NEXT_BUTTON = TranslateConstants({key:TranslateKey.ONBOARD_COMMON_NEXT_BUTTON})
  const ONBOARD_NEWSLETTER_TITLE = TranslateConstants({key:TranslateKey.ONBOARD_NEWSLETTER_TITLE})
  const ONBOARD_NEWSLETTER_DESCRIPTION = TranslateConstants({key:TranslateKey.ONBOARD_NEWSLETTER_DESCRIPTION})

  const style = useThemeAwareObject(customStyle);
  const [disableNext, setDisableNext] = useState<boolean>(true)
  const [canGoBack, setCanGoBack] = useState((route.params && route.params.canGoBack)?true:false)
  const [newsLettersDataInfo, setNewsLettersDataInfo] = useState<NewsLetterItemType[]>([])
  const isFocused = useIsFocused();

  const { getSelectedNewsLettersData, 
    selectedNewsLettersData, 
    sentNewsLettersInfoData, 
    sendSelectedNewsLettersInfo,
    emptySelectedNewsLettersInfoData, 
    isLoading , 
    myNewsLetters, 
    getMyNewsLettersData, 
    sendSelectedFromNewsletterOnboard, 
    selectedNewsLetterDataOnboard } = useNewsLetters()

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
        const item = selectedNewsLettersData.data[i]
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
        const item = selectedNewsLettersData.data[i]
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
    const data = formatNewsLettersData()
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
        const item = selectedNewsLettersData.data[i]
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
      const newsLettersData = formatNewsLettersData()
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
      const selectedList = getSelectedData();
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
      navigation.navigate(ScreensConstants.SUCCESS_SCREEN) // will replace keep notified screen once notification part was done. 
    }
  }

  return (
    <ScreenContainer edge={horizontalEdge} isOverlayLoading={isLoading}
      backgroundColor={style.screenBackgroundColor?.backgroundColor}>
      <View style={style.container}>
        <View style={style.textContainer}>
          {!canGoBack && <Label style={style.titleStyle}>
            {ONBOARD_NEWSLETTER_TITLE}
          </Label>}
          <Label style={style.descStyle}>
            {ONBOARD_NEWSLETTER_DESCRIPTION}
          </Label>
        </View>
        <View style={!canGoBack ? style.contentStyle : style.profileSettingContentStyle }>
          {isNonEmptyArray(newsLettersDataInfo) &&
            <View>
              <NewsLettersWidget data={newsLettersDataInfo} changeSelectedStatus={changeSelectedStatus} canGoBack={canGoBack} />
            </View>
          }
        </View>
      </View>
      {!canGoBack && <>
        <View style={style.transparentView} />
        <View style={style.nextButtonView}>
          <NextButton
            disabled={disableNext}
            testID="nextButtonTestId"
            title={ONBOARD_COMMON_NEXT_BUTTON}
            onPress={onPressNext}
            style={style}
            icon={!canGoBack}
          />
        </View>
      </>
      }
    </ScreenContainer>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const NewsLetterScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.profileBackground,
      shadowColor: colors.transparent,
      alignContent: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      flex: 0.15,
      paddingHorizontal: normalize(5),
      justifyContent:  'center'
    },
    titleStyle: {
      fontFamily: fonts.AwsatDigital_Bold,
      textAlign: 'center',
      fontSize: normalize(20),
      color: theme.primary,
      lineHeight: normalize(30),
    },
    descStyle: {
      fontFamily: fonts.Effra_Arbc_Regular,
      textAlign: 'center',
      fontSize: normalize(15),
      color: theme.secondaryDavyGrey,
      lineHeight: normalize(22),
    },
    contentStyle: {
      flex: 1,
      justifyContent: 'flex-start',
      paddingTop: normalize(15),
    },
    profileSettingContentStyle: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    transparentView: {
      position: 'absolute',
      bottom: 0,
      opacity: 0.65,
      backgroundColor: colors.aquaHaze,
      width: screenWidth,
      height: isTab ? 120 :80,
      justifyContent: 'flex-end',
      paddingBottom: normalize(0.03 * screenHeight),
    },
    nextButtonView: {
      position: 'absolute',
      bottom: 0,
      width: screenWidth,
      backgroundColor: colors.transparent,
      zIndex: 4,
      justifyContent: 'flex-end',
      paddingBottom: normalize(0.03 * screenHeight),
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
      fontFamily: fonts.AwsatDigital_Bold,
      color: theme.primary,
      textAlign: 'center',
      width: isTab ? screenWidth - (2 * 0.02 * screenWidth) : screenWidth - (2 * 0.04 * screenWidth),
      fontSize: normalize(16),
      lineHeight: normalize(30),
    },
    screenBackgroundColor: {
      backgroundColor: theme.profileBackground
    }
  });
  return NewsLetterScreenStyle;
};
