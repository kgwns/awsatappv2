import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {flatListUniqueKey} from 'src/constants';
import {NewsLetterCard} from '../molecules';
import {normalize, screenWidth} from 'src/shared/utils';
import { NewsLetterCardProps } from '../molecules/NewsLetterCard';

export const NewsLettersWidget = (props:any) => {
  const data = props.data;
  const style = useThemeAwareObject(customStyle);
  const renderItem = (item: NewsLetterCardProps) => (
    <View style={style.cardContainer}>
      <NewsLetterCard
        title={item.title}
        subTitle={item.subTitle}
        description={item.description}
        image={item.image}
        isSelected={item.isSelected}
        onPress={selected => {
          props.changeSelectedStatus(item, selected)
        }}
      />
    </View>
  );
  return (
    <View style={style.container}>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        listKey={
          flatListUniqueKey.NEWS_LETTER_WIDGET + new Date().getTime().toString()
        }
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) => renderItem(item)}
        bounces={false}
      />
    </View>
  );
};
const customStyle = (theme: CustomThemeType) => {
  const NewsLettersWidgetStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: 0.05 * screenWidth,
    },
    cardContainer: {paddingVertical: normalize(15)},
  });
  return NewsLettersWidgetStyle;
};
