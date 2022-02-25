import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {flatListUniqueKey} from 'src/constants';
import {CustomThemeType} from 'src/shared/styles/colors';
import {FollowFavoriteAuthor} from 'src/components/molecules';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';

const FollowFavoriteAuthorWidget = (props: any) => {
  const data = props.writersData;
  const style = useThemeAwareObject(customStyle);
  const changeSelectedStatus = (item: any, selected: boolean) => {
    for (let i = 0; i < data.length; i++) {
      if (item.tid == data[i].tid) {
        data[i].isSelected = selected;
        console.log(data[i].isSelected);
      }
    }
  };

  const renderItem = (item: any) => {
    return (
      <FollowFavoriteAuthor
        authorName={item.name}
        // authorDescription={item.authorDescription}
        authorImage={item.field_opinion_writer_photo_export}
        // isSelected={item.isSelected}
        onPress={selected => changeSelectedStatus(item, selected)}
      />
    );
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={style.container}>
      <FlatList
        listKey={flatListUniqueKey.FOLLOW_FAVORITE_AUTHOR_WIDGET}
        keyExtractor={(_, index) => index.toString()}
        numColumns={data ? Math.ceil(data.length / 3) : 3}
        data={data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => renderItem(item)}
      />
    </ScrollView>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const FollowFavoriteAuthorWidgetStyle = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      alignContent: 'center',
    },
  });
  return FollowFavoriteAuthorWidgetStyle;
};
export default FollowFavoriteAuthorWidget;
