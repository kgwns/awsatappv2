import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {flatListUniqueKey} from 'src/constants';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import OpinionWritersCardView from 'src/components/molecules/opinionWriters/OpinionWriterCardView';
import {Label} from '../atoms';
import {normalize} from 'src/shared/utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {OpinionsListItemType} from 'src/redux/opinions/types';
import {decodeHTMLTags} from 'src/shared/utils/utilities';
import {useTheme} from 'src/shared/styles/ThemeProvider';

interface OpinionWritersArticlesSectionProps {
  data: OpinionsListItemType[];
  onPress: () => void;
  isLoading: boolean;
}

const OpinionWritersArticlesSection = ({
  data,
  onPress,
  isLoading,
}: OpinionWritersArticlesSectionProps) => {
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  const renderItem = (item: any, index: number) => {
    return (
      <View key={flatListUniqueKey.OPINION_WRITER_ARTICLES_SECTION + index}>
        <OpinionWritersCardView
          imageUrl={item.field_opinion_writer_node_export.opinion_writer_photo}
          writerTitle={item.field_opinion_writer_node_export.name}
          headLine={item.title}
          subHeadLine={decodeHTMLTags(item.body)}
          audioLabel={'استمع الي المقالة '}
          duration={'3:22'}
        />
        {data.length - 1 == index && !isLoading && (
          <TouchableOpacity onPress={onPress}>
            <Label style={style.scrollMore}>Older stories scroll</Label>
          </TouchableOpacity>
        )}
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
