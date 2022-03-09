import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { Label, NextButton } from 'src/components/atoms';
import { CustomAlert, horizontalAndBottomEdge, horizontalEdge, isNonEmptyArray, isObjectNonEmpty, isTab, joinArray, normalize } from 'src/shared/utils';
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

  const [newsLetterData] = useState([
    {
      title: 'النشره الصباحيه',
      subTitle: 'الاثنين الى السبت',
      image: 'earlyEditionImg',
      tid: '123',
      isSelected: false,
    },
    {
      title: 'المال و الأعمال',
      subTitle: 'يومياً',
      image: 'moneyAndBusinessImg',
      tid: '456',
      isSelected: false,
    },
    {
      title: 'التكنولوجيا',
      subTitle: 'كل سبت',
      image: 'technologyImg',
      tid: '789',
      isSelected: false,
    },
  ])

  const [t] = useTranslation();
  const style = useThemeAwareObject(customStyle);
  const [disableNext, setDisableNext] = useState<boolean>(true)
  const [canGoBack, setCanGoBack] = useState((route.params && route.params.canGoBack)?true:false)
  const [newsLettersDataInfo, setNewsLettersDataInfo] = useState<NewsLetterItemType[]>([])
  const isFocused = useIsFocused();

  const { getSelectedNewsLettersData, selectedNewsLettersData, sentNewsLettersInfoData, sendSelectedNewsLettersInfo, emptySelectedNewsLettersInfoData, isLoading } = useNewsLetters()

  useEffect(() => {
    getSelectedNewsLettersData();
    emptySelectedNewsLettersInfoData();
    if (route.params && route.params.canGoBack) {
      setCanGoBack(route.params.canBoBack)
      setNewsLettersData();
    }
    else{
      setNewsLettersDataInfo(newsLetterData)
    }
    return () => {
      emptySelectedNewsLettersInfoData();
    }
  }, [isFocused]);

  useEffect(()=>{
    if (route.params && route.params.canGoBack) {
      setCanGoBack(route.params.canGoBack)
      setNewsLettersData();
    }
  },[selectedNewsLettersData.data])

  useEffect(() => {
    if (isObjectNonEmpty(sentNewsLettersInfoData)) {
      if (sentNewsLettersInfoData.code === 200) {
        gotoNext()
      } else {
        CustomAlert({
          title: '',
          message: sentNewsLettersInfoData.message || ''
        })
      }
    }
  }, [sentNewsLettersInfoData]);

  const getSelectedOrNot = (tid: any) => {
    for (let i = 0; i < selectedNewsLettersData.data.length; i++) {
      if (tid == selectedNewsLettersData.data[i].tid) {
        return true
      }
    }
    return false
  }


  const setNewsLettersData = () => {
    if (isNonEmptyArray(newsLetterData) && isNonEmptyArray(selectedNewsLettersData.data)) {
      const data = []
      for (let i = 0; i < newsLetterData.length; i++) {
        data.push({
          title: newsLetterData[i].title,
          subTitle: newsLetterData[i].subTitle,
          image: newsLetterData[i].image,
          tid: newsLetterData[i].tid,
          isSelected: getSelectedOrNot(newsLetterData[i].tid),
        })
      }
      setNewsLettersDataInfo(data)
    }else{
      if(selectedNewsLettersData.code && selectedNewsLettersData.code===200 && !isNonEmptyArray(selectedNewsLettersData.data)){
      setNewsLettersDataInfo(newsLetterData)
     }
    }
    updateNextButton()
  }

  const changeSelectedStatus = (item: any, selected: boolean) => {
    for (let i = 0; i < newsLettersDataInfo.length; i++) {
      if (item.tid == newsLettersDataInfo[i].tid) {
        newsLettersDataInfo[i].isSelected = !newsLettersDataInfo[i].isSelected;
      }
    }
    updateNextButton()
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
    <ScreenContainer edge={horizontalAndBottomEdge} isOverlayLoading={isLoading}>
      <View style={style.container}>
        <View style={[style.textContainer, { justifyContent: isTab ? 'center' : 'flex-end' }]}>
          <Label style={style.titleStyle}>
            {t('onBoard.newsLetter.title')}
          </Label>
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
          <NextButton
            disabled={disableNext}
            testID="nextButtonTestId"
            title={t('onBoard.common.nextBtn')}
            onPress={onPressNext}
            style={style}
          />
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
      width: '90%',
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
