import React, { useState } from 'react';
import {ActivityIndicator, FlatList, Platform, StyleSheet, View} from 'react-native';
import {flatListUniqueKey, TranslateConstants, TranslateKey} from 'src/constants/Constants';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import OpinionWritersCardView from 'src/components/molecules/opinionWriters/OpinionWriterCardView';
import {isTab, normalize, screenWidth} from 'src/shared/utils';
import {OpinionsListItemType} from 'src/redux/opinions/types';
import {
  decodeHTMLTags,
  getImageUrl,
  isNonEmptyArray,
  isNotEmpty,
} from 'src/shared/utils/utilities';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import { fonts } from 'src/shared/styles/fonts';
import { Label } from '../atoms';
import { isArticleCategoryIndex, OPINION_UNIT_ID } from 'src/hooks/useAds';
import { AdContainer, AdContainerSize } from '../atoms/adContainer/AdContainer';

interface OpinionWritersArticlesSectionProps {
  data: OpinionsListItemType[];
  onScroll: () => void;
  isLoading: boolean;
  onUpdateOpinionArticlesBookmark: (index: number) => void
  hideImageView?: boolean
}

const OpinionWritersArticlesSection = ({
  data,
  onScroll,
  isLoading,
  onUpdateOpinionArticlesBookmark,
  hideImageView
}: OpinionWritersArticlesSectionProps) => {
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();

  const audioLabel = TranslateConstants({ key: TranslateKey.LISTEN_TO_ARTICLE });

  const slice = screenWidth * 0.80;
  const [selectedTrack, setSelectedTrack] = useState<any>(null);

  const CONST_OPINION_ARTICLE_TITLE = TranslateConstants({key: TranslateKey.OPINION_ARTICLE_TITLE})

  const renderItem = (item: any, index: number) => {
    return (
      <View key={flatListUniqueKey.OPINION_WRITER_ARTICLES_SECTION + index}>
        <OpinionWritersCardView
          authorId={
            isNonEmptyArray(item.field_opinion_writer_node_export) && item.field_opinion_writer_node_export[0].id
          } 
          imageUrl={
            isNonEmptyArray(item.field_opinion_writer_node_export)
              ? getImageUrl(
                  item.field_opinion_writer_node_export[0].opinion_writer_photo,
                )
              : getImageUrl(
                  item.field_opinion_writer_node_export.opinion_writer_photo,
                )
          }
          writerTitle={ isNonEmptyArray(item.field_opinion_writer_node_export)
            ?item.field_opinion_writer_node_export[0].name
            :item.field_opinion_writer_node_export.name}
          headLine={decodeHTMLTags(item.title)}
          subHeadLine={ (Platform.OS==='android')
          ?decodeHTMLTags(item.body.slice(0,slice))
          :decodeHTMLTags(item.body)}
          duration={''} //TODO: duration key should be passed from backend
          nid={item.nid}
          isBookmarked={item.isBookmarked}
          mediaVisibility={item.field_jwplayer_id_opinion_export ? isNotEmpty(item.field_jwplayer_id_opinion_export) : isNotEmpty(item.jwplayer)}
          jwPlayerID={isNotEmpty(item.field_jwplayer_id_opinion_export) ? item.field_jwplayer_id_opinion_export : (isNotEmpty(item.jwplayer) ? item.jwplayer : null)}
          selectedTrack={selectedTrack}
          onPressBookmark={() => {onUpdateOpinionArticlesBookmark(index)}}
          audioLabel={audioLabel}
          hideImageView={hideImageView}
        />
        { isArticleCategoryIndex(index) && 
          <AdContainer style={{marginTop: -20, marginBottom: 20}} unitId={OPINION_UNIT_ID} size={AdContainerSize.MEDIUM}/>
        }
        {isLoading && data.length - 1 === index && (
          <View style={style.loaderStyle}>
            <ActivityIndicator size={'small'} color={theme.themeData.primary} />
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={[style.container, isTab && style.containerMargin]}>
      <Label style={[style.headerStyle, isTab && style.headerTablet]}
        children={CONST_OPINION_ARTICLE_TITLE} />
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => renderItem(item, index)}
        onEndReached={()=> onScroll()} 
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      paddingTop: normalize(15),
    },
    scrollMore: {
      fontSize: normalize(16),
      lineHeight: normalize(73),
      color: theme.primary,
      textAlign: 'center',
    },
    headerStyle: {
      fontSize: 20,
      lineHeight: 42,
      color: theme.primary,
      textAlign: 'left',
      marginLeft: normalize(0.04 * screenWidth),
      marginBottom: normalize(8),
      fontFamily: fonts.AwsatDigital_Bold,
    },
    headerTablet: {
      marginLeft: normalize(0.02 * screenWidth),
      color: theme.primaryBlack,
    },
    loaderStyle: {
      margin: normalize(28)
    },
    containerMargin: {
      marginHorizontal: 0.02 * screenWidth
    }
  });
};

export default OpinionWritersArticlesSection;
