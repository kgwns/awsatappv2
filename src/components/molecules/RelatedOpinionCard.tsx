import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {isTab, normalize} from 'src/shared/utils';
import {ImagesName} from 'src/shared/styles';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ButtonImage, Image, Label} from '../atoms';
import { useTranslation } from 'react-i18next';

export const RelatedOpinionCard = () => {
  const style = useThemeAwareObject(customStyle);
  const [t] = useTranslation();

  return (
    <TouchableWithoutFeedback
      key={1}
      style={[style.container, isTab && {paddingRight: 20}]}>
      <View style={{flex: 1}}>
        <Label
          children={'عادل درويش'}
          style={style.topLabel}
          numberOfLines={1}
        />
        <Label
          children={'الصحافة بين الخصوصية والصالح العام'}
          numberOfLines={1}
          style={style.body}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ButtonImage
            icon={() => {
              return getSvgImages({
                name: ImagesName.playIconSVG,
                size: normalize(14),
              });
            }}
            onPress={() => {}}
          />
          <Label children= {t('opinionArticleDetail.listenToArticle')} style={style.audioLabel} />
          <Label children={'3:22'} style={style.durationLabel} />
        </View>
      </View>
      <View>
        <Image
          url={'https://picsum.photos/200/300'}
          size={normalize(80)}
          resizeMode={'cover'}
          type={'round'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const RelatedOpinionCardStyle = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.backgroundColor,
    },
    topLabel: {
      textAlign: 'left',
      fontSize: normalize(14),
      lineHeight: normalize(14),
      color: theme.primary,
    },
    body: {
      textAlign: 'left',
      fontSize: normalize(14),
      lineHeight: normalize(24),
      color: theme.primaryBlack,
      fontWeight: 'bold',
      paddingVertical: normalize(10),
      paddingRight: normalize(5),
    },
    audioLabel: {
      paddingHorizontal: normalize(10),
      fontSize: normalize(12),
      lineHeight: normalize(36),
      color: theme.primary,
      fontWeight: 'bold',
    },
    durationLabel: {
      paddingHorizontal: normalize(10),
      color: colors.spanishGray,
    },
  });
  return RelatedOpinionCardStyle;
};
