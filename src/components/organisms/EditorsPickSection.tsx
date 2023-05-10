import React from 'react';
import { View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { flatListUniqueKey, ScreensConstants } from 'src/constants/Constants';
import { SectionHeader } from '../molecules/podcast/SectionHeader';
import { NewsWithImageItem } from '../molecules';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { isNonEmptyArray, isNotEmpty, isTab, isTypeAlbum, screenWidth } from 'src/shared/utils';
import { Divider } from '../atoms';
import { MainSectionBlockType } from 'src/redux/latestNews/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface EditorsPickSectionProps {
  data: MainSectionBlockType[];
  headerLeft?: string;
  headerRight?: string;
  showHighlightTitle?: boolean;
  tabTitleStyle?: StyleProp<TextStyle>;
  tabImageStyle?: StyleProp<ViewStyle>;
  tabContainerStyle?: StyleProp<ViewStyle>;
}

export const EditorsPickSection = ({
  data,
  headerLeft,
  headerRight,
  showHighlightTitle=true,
  tabTitleStyle,
  tabImageStyle,
  tabContainerStyle
}: EditorsPickSectionProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const style = useThemeAwareObject(customStyle)

  const onPress = (nid: string, isAlbum: boolean) => {
    if (isNotEmpty(nid)) {
      const screenName = isAlbum ? ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN : ScreensConstants.ARTICLE_DETAIL_SCREEN;
      navigation.navigate(screenName, { nid })
    }
  }
  const renderItem = (item: MainSectionBlockType, index: number) => {
    const highlightTitle=  item.news_categories?.title || '';
    const isAlbum = isTypeAlbum(item.type);
    
    return (
      <TouchableOpacity activeOpacity={0.8} key={flatListUniqueKey.EDITORS_PICK_WIDGET + index}
        onPress={() => onPress(item.nid, isAlbum)}
        style={index === 0 && isTab && { paddingStart: 0.02 * screenWidth }}>
        <NewsWithImageItem
          imageUrl={item.image}
          title={item.title}
          highlightedTitle={highlightTitle}
          showHighlightTitle={showHighlightTitle}
          isAlbum={isAlbum}
          displayType={item.displayType}
          tabImageStyle={tabImageStyle}
          tabContainerStyle={tabContainerStyle}
        />
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <>
        {(headerLeft || headerRight) && <View style={style.header}>
          <SectionHeader headerLeft={headerLeft} headerRight={headerRight} tabTitleStyle={tabTitleStyle} />
        </View>
        }
      </>
    )
  }

  if (!isNonEmptyArray(data)) {
    return null
  }

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
        testID={'editorContainerId'}
      />
      {isTab && <View style={style.dividerContainer}>
        <Divider style={style.divider} />
      </View>}
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
    paddingBottom: 10,
  },
  contentContainer: {
    paddingRight: 0.04 * screenWidth,
  },
  header: {
    paddingHorizontal: 0.04 * screenWidth
  },
  container: {
    paddingTop: 10,
    backgroundColor: theme.mainBackground,
  },
  dividerContainer: {
    paddingHorizontal: 0.04 * screenWidth
  }
});
