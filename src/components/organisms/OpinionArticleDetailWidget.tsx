import React, { useState, useEffect } from 'react';
import {StyleSheet, View} from 'react-native';
import {CustomThemeType} from 'src/shared/styles/colors';
import { isIOS, isTab, normalize, screenWidth} from 'src/shared/utils';
import {Divider, HtmlRenderer, Label} from '../atoms';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {
  ArticleFooter,
  ArticleFooterProps,
  ListenToArticleCard,
  WriterBannerImage,
} from '../molecules';
import {MixedStyleRecord} from 'react-native-render-html';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { isNotEmpty, isObjectNonEmpty, decodeHTMLTags, dateTimeAgo, TimeIcon} from 'src/shared/utils/utilities';
import {useNavigation} from '@react-navigation/native';
import {OpinionArticleDetailItemType} from 'src/redux/opinionArticleDetail/types';
import { ArticleFontSize } from 'src/redux/appCommon/types';
import { WriterDetailDataType } from 'src/redux/writersDetail/types';
import { fonts } from 'src/shared/styles/fonts';
import { fetchNarratedOpinionArticleApi } from 'src/services/narratedOpinionArticleService';
import { AxiosError } from 'axios';


export interface OpinionArticleDetailWidgetProp {
  data: OpinionArticleDetailItemType;
  fontSize: ArticleFontSize;
  isFollowed: boolean;
  onPressFollow:()=>void;
  onPressWriter:()=>void;
  isRelatedArticle: boolean;
  writerData : WriterDetailDataType;
  togglePlayback?: (nid: string, mediaData: any)=> void,
  selectedTrack?: string,
  hideBackArrow?: boolean,
  visibleHome?: boolean,
  onPressHome:()=>void;
}

export const OpinionArticleDetailWidget = ({
  data, fontSize, isFollowed, onPressFollow, onPressWriter, 
  isRelatedArticle = false,writerData, togglePlayback, 
  selectedTrack,
  hideBackArrow = false,
  visibleHome = false,
  onPressHome,
}: OpinionArticleDetailWidgetProp) => {
  const {themeData} = useTheme();
  const style = useThemeAwareObject(customStyle);
  const navigation = useNavigation();
  const nid = data.nid_export

  const[mediaData, setMediaData] = useState<any>({});

  useEffect(() => {
    if(isNotEmpty(data.jwplayer)){
      getNarratedOpinion()
    }
  }, [])

  const getNarratedOpinion = async() => {
    try {
      const opinionData = await fetchNarratedOpinionArticleApi({jwPlayerID: data.jwplayer})
      if(isObjectNonEmpty(opinionData)){
        setMediaData(opinionData);
      }
    } catch (error) {
      const errorResponse: AxiosError = error as AxiosError;
      if (errorResponse.response) {
        const errorMessage: { message: string } = errorResponse.response.data;
        console.log(errorMessage,'errorMessage');
      }
    }
  }

  const htmlTagStyle: MixedStyleRecord = {
    p: {
      color: themeData.primaryBlack,
      textAlign: 'justify',
      direction: 'rtl',
      fontSize: fontSize,
      lineHeight: 1.8 * fontSize,
      fontFamily: fonts.AwsatDigital_Regular,
      writingDirection: 'rtl',
    },
  };

  const articleHtmlContent = () => (
    <View>
      <HtmlRenderer source={data.body_export} tagsStyles={htmlTagStyle} />
    </View>
  );

  const onPressReturn = async() => {
    //Disabled for iPad orientation
    // if (!isRelatedArticle && isTab) {
    //   Orientation.unlockAllOrientations();
    //   Orientation.lockToPortrait();
    // }
    (isTab || isIOS) ? setTimeout(() => {
      navigation.goBack()
    },50) : navigation.goBack()
  };

  const timeFormat = dateTimeAgo(data.created_export)

  const articleDetailFooterData: ArticleFooterProps = {
    leftTitleColor: style.footerTitleColor.color,
    leftIcon: () => TimeIcon(timeFormat.icon),
    leftTitleStyle: { fontFamily: fonts.IBMPlexSansArabic_Regular, fontSize: 12, lineHeight: isIOS ? 20 : 25 },
    rightTitleColor: style.footerTitleColor.color,
    hideBookmark: true,
    style: {marginVertical: normalize(0.01 * screenWidth)},
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
        hideBackArrow={hideBackArrow}
        visibleHome={visibleHome}
        onPressHome={onPressHome}
      />
      <View style={style.contentContainer}>
        {/* <AuthorCard title={data.writer[0].name} /> */}
        {isNotEmpty(data.jwplayer) && isObjectNonEmpty(mediaData) && 
        <View style={style.listenToArticleCard}>
          <ListenToArticleCard 
            data={mediaData} 
            togglePlayback={togglePlayback} 
            selectedTrack={selectedTrack} 
            nid={nid} 
            authorImage={data.writer[0]?.opinion_writer_photo} 
            title={ isNotEmpty(data.title) ? data.title : '' } 
          />
        </View>}
        <Label style={style.title} children={decodeHTMLTags(data.title)} />
        <ArticleFooter
          {...articleDetailFooterData}
          leftTitle={timeFormat.time}
        />
         {articleHtmlContent()}
      </View>
      <Divider style={style.divider}/>
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    contentContainer: {
      paddingHorizontal: (isTab ? 0.02 : 0.04) * screenWidth,
      paddingTop: normalize(0.02 * screenWidth),
    },
    image: {
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: isTab ? 33 : 30,
      lineHeight: isTab ? 46 : 45,
      color: theme.primaryBlack,
      textAlign: 'left',
      marginVertical: normalize(0.01 * screenWidth),
      fontFamily: fonts.AwsatDigital_Bold,
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
    divider: {
      height: 1,
      backgroundColor: theme.dividerColor
    },
    footerTitleColor: {
      color: theme.footerTextColor
    },
  });
  };
