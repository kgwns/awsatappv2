import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { flatListUniqueKey } from 'src/constants';
import { NewsWithImageItemProps } from '../molecules/podcast/NewsWithImageItem';
import { SectionHeader } from '../molecules/podcast/SectionHeader';
import { NewsWithImageItem } from '../molecules';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import { Divider } from '../atoms';

interface EditorsPickSectionProps {
  data: NewsWithImageItemProps[];
  headerLeft?: string;
  headerRight?: string
}

export const EditorsPickSection = ({
  data,
  headerLeft,
  headerRight,
}: EditorsPickSectionProps) => {
  const style = useThemeAwareObject(customStyle)
  const renderItem = (item: NewsWithImageItemProps, index: number) => {
    return (
      <View key={flatListUniqueKey.EDITORS_PICK_WIDGET + index} style={index == 0 && isTab && { paddingStart: 0.02 * screenWidth }}>
        <NewsWithImageItem
          imageUrl={item.imageUrl}
          title={item.title}
          highlightedTitle={item.highlightedTitle}
          footerRightLabel={item.footerRightLabel}
          footerLeftLabel={item.footerLeftLabel}
        />
      </View>
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
      <Divider  style={style.divider}/>
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