import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {flatListUniqueKey} from 'src/constants';
import {Divider} from '../atoms';
import {NewsWithImageItemProps} from '../molecules/podcast/NewsWithImageItem';
import {SectionHeader} from '../molecules/podcast/SectionHeader';
import {NewsWithImageItem} from '../molecules';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';

interface EditorsPickSectionProps {
  data: NewsWithImageItemProps[];
}

export const EditorsPickSection = ({data}: EditorsPickSectionProps) => {
  const style = useThemeAwareObject(customStyle)
  const renderItem = (item: NewsWithImageItemProps, index: number) => {
    return (
      <View key={flatListUniqueKey.EDITORS_PICK_WIDGET + index}>
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
  return (
    <View>
      <SectionHeader headerLeft={'المزيد'} headerRight={'اختيارات المحررين'} />
      <FlatList
        horizontal
        keyExtractor={(_, index) => index.toString()}
        listKey={
          flatListUniqueKey.EDITORS_PICK_WIDGET +
          new Date().getTime().toString()
        }
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => renderItem(item, index)}
      />
      <Divider style={style.divider}/>
    </View>
  );
};

export default EditorsPickSection;

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  divider: {
      height: 1,
      backgroundColor: theme.dividerColor
  },
});