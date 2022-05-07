import React from 'react';
import {ActivityIndicator, FlatList, Platform, StyleSheet, View} from 'react-native';
import {flatListUniqueKey} from 'src/constants';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import OpinionWritersCardView from 'src/components/molecules/opinionWriters/OpinionWriterCardView';
import {normalize, screenWidth} from 'src/shared/utils';
import {OpinionsListItemType} from 'src/redux/opinions/types';
import {
  decodeHTMLTags,
  getImageUrl,
  isNonEmptyArray,
  isNotEmpty,
} from 'src/shared/utils/utilities';
import {useTheme} from 'src/shared/styles/ThemeProvider';

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
  const audioLabel = 'استمع الي المقالة ';
  const slice = screenWidth*0.80;
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
          headLine={item.title}
          subHeadLine={ (Platform.OS==='android')
          ?decodeHTMLTags(item.body.slice(0,slice))
          :decodeHTMLTags(item.body)}
          duration={''} //TODO: duration key should be passed from backend
          nid={item.nid}
          isBookmarked={item.isBookmarked}
          mediaVisibility={isNotEmpty(item.field_jwplayer_id_opinion_export)}
          onPressBookmark={() => {onUpdateOpinionArticlesBookmark(index)}}
          audioLabel={audioLabel}
          hideImageView={hideImageView}
        />
        {isLoading && data.length - 1 == index && (
          <View style={{margin: normalize(28)}}>
            <ActivityIndicator size={'small'} color={theme.themeData.primary} />
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={style.container}>
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
  const OpinionWritersArticlesSectionStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
    },
    scrollMore: {
      fontSize: normalize(16),
      lineHeight: normalize(73),
      color: theme.primary,
      textAlign: 'center',
    },
  });
  return OpinionWritersArticlesSectionStyle;
};

export default OpinionWritersArticlesSection;
