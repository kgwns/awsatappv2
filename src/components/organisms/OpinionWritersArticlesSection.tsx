import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {flatListUniqueKey} from 'src/constants';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import OpinionWritersCardView from 'src/components/molecules/opinionWriters/OpinionWriterCardView';
import {Label} from '../atoms';
import {normalize} from 'src/shared/utils';
import {TouchableOpacity} from 'react-native-gesture-handler';

export interface opinionWriterArticleProps {
  imageUrl: string;
  writerTitle: string;
  headLine: string;
  subHeadLine: string;
  audioLabel: string;
  duration: string;
}

interface OpinionWritersArticlesSectionProps {
  data: opinionWriterArticleProps[];
}

const OpinionWritersArticlesSection = ({
  data,
}: OpinionWritersArticlesSectionProps) => {
  const style = useThemeAwareObject(customStyle);
  const renderItem = (item: opinionWriterArticleProps, index: number) => {
    return (
      <View key={flatListUniqueKey.OPINION_WRITER_ARTICLES_SECTION + index}>
        <OpinionWritersCardView
          imageUrl={item.imageUrl}
          writerTitle={item.writerTitle}
          headLine={item.headLine}
          subHeadLine={item.subHeadLine}
          audioLabel={item.audioLabel}
          duration={item.duration}
        />
        {data.length - 1 == index && (
          <TouchableOpacity
            onPress={() => console.log('OlderStoriesScroll Pressed')}>
            <Label style={style.scrollMore}>Older stories scroll</Label>
          </TouchableOpacity>
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
