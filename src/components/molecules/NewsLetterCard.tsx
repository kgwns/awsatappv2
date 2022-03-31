import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {Image, Label} from 'src/components/atoms';
import {normalize, screenWidth} from 'src/shared/utils';
import {ImagesName} from 'src/shared/styles/images';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {useTranslation} from 'react-i18next';
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
  const theme = useTheme();
  const [selected, setSelected] = useState(isSelected);
  const [t] = useTranslation();

  const changeStatus = () => {
    onPress(!selected);
    setSelected(!selected)
  };

  useEffect(()=>{
    setSelected(isSelected)
  },[isSelected])

  return (
    <TouchableOpacity
      testID={'CardTestId'}
      style={[
        style.container,
        {
          backgroundColor: selected
            ? theme.themeData.secondaryGreen
            : theme.themeData.lightRed,
        },
      ]}
      onPress={changeStatus}>
      <View style={style.imageContainer}>
        <Image
        url={image}
        style={style.image}
        />
      </View>
      <View style={style.contentContainer}>
        <Label style={style.title}>{title}</Label>
        <Label style={style.subTitle}>{subTitle}</Label>
        <View style={style.footerContent}>
          <View
            style={[
              style.circleShape,
              {
                backgroundColor: selected
                  ? theme.themeData.secondaryWhite
                  : theme.themeData.secondaryWhite,
              },
            ]}>
            <View>
              {selected
                ? getSvgImages({
                    name: ImagesName.mailSelected,
                    size: normalize(12),
                    fill: theme.themeData.primary,
                  })
                : getSvgImages({
                    name: ImagesName.mail,
                    size: normalize(12),
                  })}
            </View>
          </View>
          <View style={style.labelContainer} >
            <Label
              style={selected ? style.statusSelectedLabel : style.statusLabel} numberOfLines={1}>
              {description}
            </Label>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
    },
    imageContainer: {
      height: '100%',
      justifyContent: 'center',
      marginEnd: normalize(0.04 * screenWidth),
    },
    image: {
      width: normalize(107),
      height: normalize(85),
    },
    contentContainer: {
      flex: 1,
      height: normalize(85),
      alignItems: 'flex-start',
      marginTop: 2,
    },
    title: {
      fontSize: normalize(16),
      fontWeight: 'bold',
      lineHeight: normalize(19),
      color: theme.primaryDarkSlateGray,
    },
    subTitle: {
      fontSize: normalize(10),
      lineHeight: normalize(15),
      color: colors.doveGray,
      marginTop: normalize(5),
    },
    footerContent: {
      flex: 1,
      flexDirection: 'row',
      marginTop: normalize(15),
    },
    circleShape: {
      width: normalize(30),
      height: normalize(30),
      borderRadius: normalize(30 / 2),
      justifyContent: 'center',
      alignItems: 'center',
    },
    statusLabel: {
      fontSize: normalize(12),
      lineHeight: normalize(14),
      marginStart: normalize(8),
      color: colors.doveGray,
    },
    statusSelectedLabel: {
      fontSize: normalize(12),
      color: theme.primary,
      lineHeight: normalize(14),
      marginStart: normalize(5),
      fontWeight: 'bold',
    },
    labelContainer: {
      flex: 1,
      justifyContent: 'center',
      marginRight: normalize(3),
    }
  });
  return NewsLetterCardStyle;
};
