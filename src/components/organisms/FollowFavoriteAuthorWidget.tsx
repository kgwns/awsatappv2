import React, { useRef } from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {flatListUniqueKey} from 'src/constants';
import {CustomThemeType} from 'src/shared/styles/colors';
import {FollowFavoriteAuthor} from 'src/components/molecules';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { isIOS } from 'src/shared/utils';

const FollowFavoriteAuthorWidget = (props: any) => {
  const data = props.writersData;
  const style = useThemeAwareObject(customStyle);
  const scrollRef = useRef<ScrollView>(null);

  const renderItem = (item: any) => {
    return (
      <FollowFavoriteAuthor
        authorName={item.name}
        // authorDescription={item.authorDescription}
        authorImage={item.field_opinion_writer_photo_export}
        isSelected={item.isSelected}
        onPress={selected => props.changeSelectedStatus(item, selected)}
      />
    );
  };
  const scrollToStart = () => {
    if (isIOS) return
    scrollRef.current?.scrollToEnd();
  }
  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      onContentSizeChange={()=> scrollToStart()}
      style={style.container}>
        <FlatList
        key={data ? Math.ceil(data.length / 3) : 3}
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
