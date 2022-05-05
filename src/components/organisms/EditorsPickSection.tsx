import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { flatListUniqueKey, ScreensConstants } from 'src/constants';
import { SectionHeader } from '../molecules/podcast/SectionHeader';
import { NewsWithImageItem } from '../molecules';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { isNonEmptyArray, isNotEmpty, isTab, normalize, screenWidth } from 'src/shared/utils';
import { Divider } from '../atoms';
import { MainSectionBlockType } from '~/redux/latestNews/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface EditorsPickSectionProps {
  data: MainSectionBlockType[];
  headerLeft?: string;
  headerRight?: string
}

export const EditorsPickSection = ({
  data,
  headerLeft,
  headerRight,
}: EditorsPickSectionProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const style = useThemeAwareObject(customStyle)

  const onPress = (nid: string) => {
    if (isNotEmpty(nid)) navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, { nid: nid })
  }

  const renderItem = (item: MainSectionBlockType, index: number) => {
    return (
      <TouchableOpacity activeOpacity={0.8} key={flatListUniqueKey.EDITORS_PICK_WIDGET + index}
        onPress={() => onPress(item.nid)}
        style={index == 0 && isTab && { paddingStart: 0.02 * screenWidth }}>
        <NewsWithImageItem
          imageUrl={item.image}
          title={item.title}
          highlightedTitle={item.news_categories?.title || ''}
        />
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <>
        {headerLeft && headerRight && <View style={style.header}>
          <SectionHeader headerLeft={headerLeft} headerRight={headerRight} />
        </View>
        }
      </>
    )
  }

  if (!isNonEmptyArray(data)) return null

  return (
    <View style={style.container}>
      {renderHeader()}
      <FlatList
        horizontal
        style={style.listStyle}
        keyExtractor={(_, index) => index.toString()}
        listKey={
          flatListUniqueKey.EDITORS_PICK_WIDGET +
          new Date().getTime().toString()
        }
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => renderItem(item, index)}
        contentContainerStyle={style.contentContainer}
      />
      <View style={isTab ? { paddingHorizontal: 0.04 * screenWidth } : { paddingStart: 0.04 * screenWidth }}>
        <Divider style={style.divider} />
      </View>
    </View>
  );
};

export default EditorsPickSection;

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: theme.dividerColor,
  },
  listStyle: {
    paddingHorizontal: 0.04 * screenWidth,
  },
  contentContainer: {
    paddingRight: 0.04 * screenWidth,
  },
  header: {
    paddingHorizontal: 0.04 * screenWidth
  },
  container: {
    paddingTop: normalize(25),
    backgroundColor: theme.backgroundColor,
  }
});