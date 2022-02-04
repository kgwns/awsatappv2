import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {flatListUniqueKey} from 'src/constants';
import {normalize, screenWidth} from 'src/shared/utils';
import {colors} from 'src/shared/styles/colors';
import {FollowFavoriteAuthor} from 'src/components/molecules';

const data = [
  {
    id: 1,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 2,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 3,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 4,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 5,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 6,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 7,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 8,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 9,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 10,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 11,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 12,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 13,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 14,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 15,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 16,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 17,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
  {
    id: 18,
    authorName: 'اسم الكاتب',
    authorDescription: 'سياسه و اقتصاد ',
    authorImage: 'https://picsum.photos/200',
    isSelected: false,
  },
];

const FollowFavoriteAuthorWidget = () => {
  const changeSelectedStatus = (item: any, selected: boolean) => {
    console.log(item.id);
    for (let i = 0; i < data.length; i++) {
      if (item.id == data[i].id) {
        data[i].isSelected = selected;
        console.log(data[i].isSelected);
      }
    }
  };

  const renderItem = (item: any) => {
    return (
      <View style={FollowFavoriteAuthorWidgetStyle.widgetContainer}>
        <FollowFavoriteAuthor
          authorName={item.authorName}
          authorDescription={item.authorDescription}
          authorImage={item.authorImage}
          isSelected={item.isSelected}
          onPress={selected => changeSelectedStatus(item, selected)}
        />
      </View>
    );
  };
  return (
    <View style={FollowFavoriteAuthorWidgetStyle.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          listKey={flatListUniqueKey.FOLLOW_FAVORITE_AUTHOR_WIDGET}
          keyExtractor={(_, index) => index.toString()}
          numColumns={Math.ceil(data.length / 3)}
          data={data}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => renderItem(item)}
        />
      </ScrollView>
    </View>
  );
};

const FollowFavoriteAuthorWidgetStyle = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.aquaHaze,
  },
  widgetContainer: {
    justifyContent: 'flex-end',
    marginEnd: normalize(8),
    marginStart: 0.04 * screenWidth,
  },
});

export default FollowFavoriteAuthorWidget;
