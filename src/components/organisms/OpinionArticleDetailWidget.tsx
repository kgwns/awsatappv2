import React, { useState, useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import { normalize, screenWidth} from 'src/shared/utils';
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
import { timeAgo, isNotEmpty, isObjectNonEmpty} from 'src/shared/utils/utilities';
import {useNavigation} from '@react-navigation/native';
import {OpinionArticleDetailItemType} from 'src/redux/opinionArticleDetail/types';
import Orientation, { OrientationType } from 'react-native-orientation-locker';
import { ArticleFontSize } from '../screens/opinionArticleDetail/OpinionArticleDetail';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import { useOpinionArticleDetail } from 'src/hooks/useOpinionArticleDetail';

export interface OpinionArticleDetailWidgetProp {
  data: OpinionArticleDetailItemType;
  fontSize: ArticleFontSize;
  isFollowed: boolean;
  onPressFollow:()=>void;
}

export const OpinionArticleDetailWidget = ({
  data,fontSize,isFollowed,onPressFollow
}: OpinionArticleDetailWidgetProp) => {
  const [t] = useTranslation();
  const {themeData} = useTheme();
  const style = useThemeAwareObject(customStyle);
  const navigation = useNavigation();
  const [visibleMedia, setMediaVisibility] = useState(isNotEmpty(data.jwplayer));
  const playbackState = usePlaybackState();
  const [getOrientation, setOrientation] = useState('')
  
  useEffect(() => {
    Orientation.getDeviceOrientation(updateScreenEdge)
    Orientation.addDeviceOrientationListener(updateScreenEdge)
    return () => {
      Orientation.removeOrientationListener(updateScreenEdge)
    }
  }, [])

  const { narratedOpinionData, fetchNarratedOpinionData} =
    useOpinionArticleDetail();

  const [mediaData] = useState(narratedOpinionData)

  const updateScreenEdge = (deviceOrientation: OrientationType) => {
    switch (deviceOrientation) {
      case 'LANDSCAPE-LEFT': 
        setOrientation('LANDSCAPE')
        break
      case 'LANDSCAPE-RIGHT': 
        setOrientation('LANDSCAPE')
        break
      default: 
        setOrientation('PORTRAIT')
        break
    }
  } 

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
    if (playbackState == State.Playing) {
      await TrackPlayer.stop();
    }
    Orientation.unlockAllOrientations();
    Orientation.lockToPortrait();
    navigation.goBack();
  };

  return (
    <View>
      <WriterBannerImage data={{ authorImage: data.writer[0]?.opinion_writer_photo, authorName: data.writer[0]?.name }}
        orientation={getOrientation}
        onPressReturn={onPressReturn}
        isFollowed={isFollowed}
        onPressFollow={onPressFollow}
      />
      <View style={style.contentContainer}>
        {/* <AuthorCard title={data.writer[0].name} /> */}
        <Label style={style.title}>{data.title}</Label>
        <ArticleFooter
          {...articleDetailFooterData}
          rightTitle={data.writer[0].name}
          leftTitle={t(timeAgo(data.created_export))}
        />
        {isNotEmpty(data.jwplayer) && isObjectNonEmpty(mediaData) && <View style={style.listenToArticleCard}>
          <ListenToArticleCard data={mediaData} />
        </View>}
         {articleHtmlContent()}
      </View>
      <Divider style={style.divider}/>
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const OpinionArticleDetailWidgetStyle = StyleSheet.create({
    contentContainer: {
      paddingHorizontal: normalize(0.03 * screenWidth),
      paddingTop: normalize(0.02 * screenWidth),
    },
    image: {
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: normalize(24),
      lineHeight: normalize(36),
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
