import React, { useRef } from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {flatListUniqueKey} from 'src/constants/Constants';
import {CustomThemeType} from 'src/shared/styles/colors';
import {FollowFavoriteAuthor} from 'src/components/molecules';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { isIOS, isTab, normalize, screenWidth } from 'src/shared/utils';
import { getImageUrl } from 'src/shared/utils/utilities';

const FollowFavoriteAuthorWidget = (props: any) => {
  const data = props.writersData;
  const style = useThemeAwareObject(customStyle);
  const scrollRef = useRef<ScrollView>(null);
  const numColumns = 7;

  const renderItem = (item: any) => {
    return (
      <FollowFavoriteAuthor
        authorName={item.name}
        // authorDescription={item.authorDescription}
        authorImage={getImageUrl(item.field_opinion_writer_photo_export) }
        isSelected={item.isSelected}
        onPress={selected => props.changeSelectedStatus(item, selected)}
        numColumns={numColumns}
      />
    );
  };
  const scrollToStart = () => {
    console.log('scrollToStart');
    if (isIOS) {
      return
    }
    scrollRef.current?.scrollToEnd();
  }
  if (isTab) {
    return (
      <FlatList
        key={'tabletFollowFavoriteAuthorFlatList'}
        listKey={flatListUniqueKey.FOLLOW_FAVORITE_AUTHOR_WIDGET}
        keyExtractor={(_, index) => index.toString()}
        numColumns={numColumns}
        data={data}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => renderItem(item)}
        contentContainerStyle={style.tabletBottomPadding}
        bounces={false}
      />
    )
  } else {
    return (
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => scrollToStart()}
        bounces={false}
        style={style.container}>
        <FlatList
          key={'mobileFollowFavoriteAuthorFlatList'}
          listKey={flatListUniqueKey.FOLLOW_FAVORITE_AUTHOR_WIDGET}
          keyExtractor={(_, index) => index.toString()}
          numColumns={data ? Math.ceil(data.length / 3) : 3}
          data={data}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => renderItem(item)}
          style={style.mobileWideMargin}
          bounces={false}
          scrollEnabled={false}
        />
      </ScrollView>
    );
  }
};

const customStyle = (theme: CustomThemeType) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.onBoardBackground,
      alignContent: 'center',
    },
    tabletWideMargin: {
      marginHorizontal: normalize(0.04 * screenWidth),
    },
    tabletBottomPadding: {
      paddingBottom: 200
    },
    mobileWideMargin: {
      marginHorizontal: normalize(0.04 * screenWidth)
    }
  });
};
export default FollowFavoriteAuthorWidget;
