import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {Image, Label} from 'src/components/atoms';
import {isIOS, normalize, screenWidth} from 'src/shared/utils';
import {ImagesName} from 'src/shared/styles/images';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {useTranslation} from 'react-i18next';
import { fonts } from 'src/shared/styles/fonts';
export interface NewsLetterCardProps {
  title: string;
  subTitle: string;
  description: string;
  image: any;
  isSelected: boolean;
  onPress: (isSelected: boolean) => void;
}
export const NewsLetterCard = ({
  title,
  subTitle,
  image,
  isSelected,
  description,
  onPress,
}: NewsLetterCardProps) => {
  const style = useThemeAwareObject(customStyle);
  const [selected, setSelected] = useState(isSelected);
  const [t] = useTranslation();
  const buttonLogoName = selected ? ImagesName.tickIcon : ImagesName.subscribeIconWhite;
  const buttonText = selected ? t('onBoard.newsLetter.subscribed') : t('onBoard.newsLetter.notSubscribed');
  const buttonBackground = selected ? colors.greenishBlue : colors.black;
  const buttonLogoStyle = selected ? {width: 20, height:17, marginRight: 5, marginBottom: 5} : {width: 14, height:11, marginRight: 10}

  const changeStatus = () => {
    onPress(!selected);
    setSelected(!selected)
  };

  useEffect(()=>{
    setSelected(isSelected)
  },[isSelected])

  return (
    <View
      testID={'CardTestId'}
      style={style.container}>
      <View style={style.imageContainer}>
        <Image
          url={image}
          style={style.image}
        />
      </View>
      <View style={style.contentContainer}>
        <Label style={style.title}>{title}</Label>
        <Label style={style.subTitle}>{subTitle}</Label>
      </View>
      <TouchableOpacity style={[style.buttonView, {backgroundColor: buttonBackground}]} onPress={changeStatus}>
        <View style={style.buttonContainer}>
          <View style={style.logoContainer}>
          {getSvgImages({ name: buttonLogoName, width: buttonLogoStyle.width, height: buttonLogoStyle.height, style: buttonLogoStyle })}  
          </View>
          <Label color={colors.white} style={style.buttonLabel} children={buttonText} />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const customStyle = (theme: CustomThemeType) => {
  const NewsLetterCardStyle = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: normalize(114),
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.newsletterHighlighter
    },
    imageContainer: {
      height: '100%',
      justifyContent: 'center',
      marginLeft: normalize(10),
      marginRight: normalize(5),
    },
    image: {
      width: normalize(65),
      height: normalize(85),
    },
    contentContainer: {
      flex: 1,
      height: normalize(85),
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    title: {
      fontFamily: fonts.AwsatDigital_Bold,
      fontSize: normalize(16),
      lineHeight: isIOS ? normalize(28): normalize(32),
      color: theme.primaryDarkSlateGray,
    },
    subTitle: {
      fontFamily: fonts.Effra_Arbc_Regular,
      fontSize: normalize(10),
      lineHeight: normalize(15),
      color: colors.doveGray,
      // marginTop: normalize(5),
    },
    footerContent: {
      flex: 1,
      flexDirection: 'row',
      marginTop: normalize(12),
    },
    circleShape: {
      width: normalize(30),
      height: normalize(30),
      borderRadius: normalize(30 / 2),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.secondaryWhite,
    },
    statusLabel: {
      fontFamily: fonts.Effra_Regular,
      fontSize: normalize(12),
      lineHeight: normalize(14),
      marginStart: normalize(8),
      color: colors.doveGray,
    },
    statusSelectedLabel: {
      fontFamily: fonts.Effra_Regular,
      fontSize: normalize(12),
      color: theme.primary,
      lineHeight: normalize(14),
      marginStart: normalize(8),
    },
    labelContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginRight: normalize(3),
    },
    buttonView: {
      height: 38, width:'32%',
      marginRight: normalize(15),
      borderRadius: 28
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 15,
      paddingVertical: isIOS ? 7 : 5,
      marginVertical: 7,
    },
    buttonLogo: {
      marginRight: 10
    },
    buttonLabel: {
      fontSize:14,
      lineHeight:16,
      fontFamily: fonts.AwsatDigitalV2_Bold,
    },
    logoContainer: {
      justifyContent: 'center'
    }
  });
  return NewsLetterCardStyle;
};
