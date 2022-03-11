import React, { useState } from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {flatListUniqueKey} from 'src/constants';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import OpinionWritersCardView from 'src/components/molecules/opinionWriters/OpinionWriterCardView';
import {normalize} from 'src/shared/utils';
import {OpinionsListItemType} from 'src/redux/opinions/types';
import {
  decodeHTMLTags,
  getImageUrl,
  isNonEmptyArray,
} from 'src/shared/utils/utilities';
import {useTheme} from 'src/shared/styles/ThemeProvider';

interface OpinionWritersArticlesSectionProps {
  data: OpinionsListItemType[];
  onScroll: () => void;
  isLoading: boolean;
  onUpdateOpinionArticlesBookmark: (index: number) => void
}

const OpinionWritersArticlesSection = ({
  data,
  onScroll,
  isLoading,
  onUpdateOpinionArticlesBookmark,
}: OpinionWritersArticlesSectionProps) => {
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  const [onEndReachedCalledDuringMomentum,setOnEndReachedCalledDuringMomentum]=useState(false);
  const renderItem = (item: any, index: number) => {
    return (
      <View key={flatListUniqueKey.OPINION_WRITER_ARTICLES_SECTION + index}>
        <OpinionWritersCardView
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
          subHeadLine={decodeHTMLTags(item.body)}
          audioLabel={'استمع الي المقالة '}
          duration={'3:22'}
          nid={item.nid}
          isBookmarked={item.isBookmarked}
          onPressBookmark={() => {onUpdateOpinionArticlesBookmark(index)}}
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
        listKey={
          flatListUniqueKey.OPINION_WRITER_ARTICLES_SECTION +
          new Date().getTime().toString()
        }
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => renderItem(item, index)}
        onEndReached={()=> { 
          if(!onEndReachedCalledDuringMomentum) 
          { onScroll() 
            setOnEndReachedCalledDuringMomentum(true) }
          }} 
        onEndReachedThreshold={0.5} 
        onMomentumScrollBegin = {() => {setOnEndReachedCalledDuringMomentum(false)}}
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
