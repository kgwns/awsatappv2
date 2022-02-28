import React from 'react';
import {StyleSheet} from 'react-native';
import {ButtonImage, Label} from 'src/components/atoms';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export const ListenToArticleCard = () => {
  const style = useThemeAwareObject(customStyle);
  return (
    <TouchableWithoutFeedback style={style.container}>
      <ButtonImage
        icon={() =>
          getSvgImages({name: ImagesName.playIconSVG, size: normalize(12)})
        }
        onPress={() => {}}
        style={style.icon}
      />
      <Label style={style.title}>استمع الي المقالة</Label>
      <Label style={style.duration}>3:22</Label>
    </TouchableWithoutFeedback>
  );
};
export default ListenToArticleCard;
const customStyle = (theme: CustomThemeType) => {
  const ListenToArticleCardStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.whiteSurface,
      flexWrap: 'wrap',
      alignSelf: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: normalize(15),
      borderRadius: normalize(20),
    },
    title: {
      fontSize: normalize(12),
      lineHeight: normalize(36),
      color: theme.primary,
      fontWeight: 'bold',
    },
    duration: {
      justifyContent: 'center',
      alignSelf: 'center',
      fontSize: normalize(12),
      lineHeight: normalize(14),
      marginStart: normalize(15),
      color: colors.spanishGray,
    },
    icon: {
      alignSelf: 'center',
      marginEnd: normalize(6),
    },
  });
  return ListenToArticleCardStyle;
};
