import React, { useState, useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import { isTab, normalize, screenWidth} from 'src/shared/utils';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {Divider, HtmlRenderer, Image, Label} from '../atoms';
import {ImagesName, Styles} from 'src/shared/styles';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {
  ArticleFooter,
  articleFooterProps,
  ListenToArticleCard,
  WriterBannerImage,
} from '../molecules';
import {MixedStyleRecord} from 'react-native-render-html';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { timeAgo, isNotEmpty, isObjectNonEmpty, decodeHTMLTags} from 'src/shared/utils/utilities';
import {useNavigation} from '@react-navigation/native';
import {OpinionArticleDetailItemType} from 'src/redux/opinionArticleDetail/types';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { ArticleFontSize } from '../screens/opinionArticleDetail/OpinionArticleDetail';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import { useOpinionArticleDetail } from 'src/hooks/useOpinionArticleDetail';
import { WriterDetailDataType } from 'src/redux/writersDetail/types';

export interface OpinionArticleDetailWidgetProp {
  data: OpinionArticleDetailItemType;
  fontSize: ArticleFontSize;
  isFollowed: boolean;
  onPressFollow:()=>void;
  onPressWriter:()=>void;
  isRelatedArticle: boolean;
  writerData : WriterDetailDataType
}

export const OpinionArticleDetailWidget = ({
  data, fontSize, isFollowed, onPressFollow, onPressWriter, isRelatedArticle = false,writerData
}: OpinionArticleDetailWidgetProp) => {
  const [t] = useTranslation();
  const {themeData} = useTheme();
  const style = useThemeAwareObject(customStyle);
  const navigation = useNavigation();
  const [visibleMedia, setMediaVisibility] = useState(isNotEmpty(data.jwplayer));
  const playbackState = usePlaybackState();

  const { narratedOpinionData, fetchNarratedOpinionData} =
    useOpinionArticleDetail();

  const [mediaData] = useState(narratedOpinionData)

  const htmlTagStyle: MixedStyleRecord = {
    p: {
      color: themeData.primaryBlack,
      textAlign: 'left',
      direction: 'rtl',
      fontSize: fontSize,
      lineHeight: 1.5 * fontSize,
    },
  };

  const articleDetailFooterData: articleFooterProps = {
    leftTitleColor: Styles.color.spanishGray,
    leftIcon: () => {
      return getSvgImages({
        name: ImagesName.clock,
        size: normalize(12),
        style: {marginRight: normalize(5)},
      });
    },
    rightTitleColor: Styles.color.spanishGray,
    hideBookmark: true,
    style: {marginVertical: normalize(0.01 * screenWidth)},
  };

  const AuthorCard = ({title}: any) => (
    <View style={style.authorCard}>
      {getSvgImages({
        name: ImagesName.pen,
        size: normalize(14),
      })}
      <Label style={style.authorCardLabel}>{title}</Label>
    </View>
  );

  const articleHtmlContent = () => (
    <View>
      <HtmlRenderer source={data.body_export} tagsStyles={htmlTagStyle} />
    </View>
  );

  const onPressReturn = async() => {
    await TrackPlayer.stop();
    if (!isRelatedArticle) {
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait();
    }
    navigation.goBack();
  };

  return (
    <View>
      <WriterBannerImage data={{
        authorImage: data.writer[0]?.opinion_writer_photo,
        authorName: data.writer[0]?.name,
        authorDescription: decodeHTMLTags(data.writer[0]?.description),
        facebook_url: writerData?.field_opinion_facebook_export,
        twitter_url: writerData?.field_opinion_twitter_export,
        instagram_url: writerData?.field_instagram_url_export
      }}
        onPressReturn={onPressReturn}
        isFollowed={isFollowed}
        onPressFollow={onPressFollow}
        onPressWriter={onPressWriter}
      />
      <View style={style.contentContainer}>
        {/* <AuthorCard title={data.writer[0].name} /> */}
        {isNotEmpty(data.jwplayer) && isObjectNonEmpty(mediaData) && <View style={style.listenToArticleCard}>
          <ListenToArticleCard data={mediaData} />
        </View>}
        <Label style={style.title}>{data.title}</Label>
        <ArticleFooter
          {...articleDetailFooterData}
          leftTitle={t(timeAgo(data.created_export))}
        />
         {articleHtmlContent()}
      </View>
      <Divider style={style.divider}/>
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const OpinionArticleDetailWidgetStyle = StyleSheet.create({
    contentContainer: {
      paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
      paddingTop: normalize(0.02 * screenWidth),
    },
    image: {
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: normalize(30),
      lineHeight: normalize(42),
      fontWeight: 'bold',
      color: theme.primaryBlack,
      textAlign: 'left',
      marginVertical: normalize(0.01 * screenWidth),
    },
    listenToArticleCard: {
      marginTop: normalize(0.02 * screenWidth),
      marginBottom: normalize(0.01 * screenWidth),
    },
    authorCard: {
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginVertical: normalize(0.01 * screenWidth),
    },
    authorCardLabel: {
      alignSelf: 'center',
      fontSize: normalize(16),
      lineHeight: normalize(25),
      fontWeight: 'bold',
      marginStart: normalize(5),
      color: theme.primaryBlack,
    },
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
  },
  });
  return OpinionArticleDetailWidgetStyle;
};
