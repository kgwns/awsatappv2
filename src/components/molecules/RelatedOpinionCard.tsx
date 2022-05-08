import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {isNonEmptyArray, isTab, normalize, isNotEmpty} from 'src/shared/utils';
import {ImagesName, Styles} from 'src/shared/styles';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ButtonImage, Image, Label} from '../atoms';
import {useTranslation} from 'react-i18next';
import {
  DURATION,
} from 'src/constants/SharedConstants';
import {ImageResize} from 'src/shared/styles/text-styles';
import { decodeHTMLTags, getImageUrl } from 'src/shared/utils/utilities';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import AuthorDefault from 'src/assets/images/icons/authorDefault.svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants } from 'src/constants';


export const RelatedOpinionCard = ({item, onPress, mediaVisibility}:any) => {
  const style = useThemeAwareObject(customStyle);
  const [t] = useTranslation();
  const { themeData } = useTheme();
  const navigation = useNavigation<StackNavigationProp<any>>()

  const renderHtmlContent = (item: any) => {
    const description = decodeHTMLTags(item.body).length > 200 ? decodeHTMLTags(item.body).slice(0,200) : decodeHTMLTags(item.body)
    return(
      <View >
        <Text children={description} numberOfLines={1} style={style.body}/>
      </View>
    )
  }

  const renderTitle = (item: any) => {
    return (
      <View >
        <Text children={item.title} numberOfLines={2} style={style.contentTitle} />
      </View>
    )
  }

  const onPressWriter = (tid: string) => {
    if (isNotEmpty(tid)) {
      navigation.push(ScreensConstants.WRITERS_DETAIL_SCREEN, { tid })
    }
  }

  return (
    <TouchableOpacity
      onPress={()=>onPress()}
      style={[style.container, isTab && {paddingRight: 20}]}>
      <View style={style.contentView}>
        <Label
          children={isNonEmptyArray(item.field_opinion_writer_node_export) && item.field_opinion_writer_node_export[0].name}
          style={style.topLabel}
          numberOfLines={1}
          onPress={() => onPressWriter(item.field_opinion_writer_node_export[0].id)}
        />
        {renderTitle(item)}
        {mediaVisibility && <View style={style.footer}>
          <ButtonImage
            icon={() => {
              return getSvgImages({
                name: ImagesName.playIconSVG,
                size: normalize(14),
              });
            }}
            onPress={() => {}}
          />
          <Label
            children={t('opinionArticleDetail.listenToArticle')}
            style={style.audioLabel}
          />
          <Label children={DURATION} style={style.durationLabel} />
        </View>}
      </View>
      <View>
        <Image
          url={
            isNonEmptyArray(item.field_opinion_writer_node_export)
              ? getImageUrl(
                item.field_opinion_writer_node_export[0].opinion_writer_photo,
              )
              : getImageUrl(
                item.field_opinion_writer_node_export.opinion_writer_photo,
              )}
          size={normalize(80)}
          resizeMode={ImageResize.COVER}
          type={'round'}
          fallback={true}
          fallbackContent={ <AuthorDefault
          style={{backgroundColor:Styles.color.cyanGreen}}
          width={normalize(80)} 
          height={normalize(80)}/>}
          onPress={() => onPressWriter(item.field_opinion_writer_node_export[0].id)}
        />
      </View>
    </TouchableOpacity>
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
    contentView: {
      flex: 1,
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
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
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
    contentTitle: {
      textAlign: 'left',
      fontSize: normalize(14),
      lineHeight: normalize(24),
      color: theme.primaryBlack,
      fontWeight: 'bold',
      paddingVertical: normalize(10),
      paddingRight: normalize(5),
    }
  });
  return RelatedOpinionCardStyle;
};
