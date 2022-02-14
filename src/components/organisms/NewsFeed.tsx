import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react';
import { Image } from '../atoms/image/Image'
import { normalize, screenWidth } from '../../shared/utils'
import { Styles } from '../../shared/styles'
import { TextWithFlag, Divider, Label, LabelTypeProp } from '../atoms'
import { ImageResize } from '../../shared/styles/text-styles';
import { flatListUniqueKey } from '../../constants';
import { SectionVideoFooter } from '../molecules';
import CalendarIcon from 'src/assets/images/icons/calendarIcon.svg'
import {useTheme} from 'src/shared/styles/ThemeProvider';
export interface NewsFeedProps{
  title: string,
  imageUrl: string,
  videoLabel: string,
  des: string,
  month: string,
  date: string,
  titleColor: string,
  barColor: string,
  labelType: LabelTypeProp,
}
const NewsFeed = ({ data }: { data: NewsFeedProps[] }) => {
  const theme = useTheme();
  const renderItem = (item: NewsFeedProps, index: number) => {
    
    return <View key={flatListUniqueKey.NEWS_FEED + index}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, paddingRight: normalize(15), top: normalize(10) }}>
          <TextWithFlag
            title={item.title} titleColor={item.titleColor}
            numberOfLines={2}
            labelType={item.labelType}
          />
        </View>
        <Image url={item.imageUrl} style={{ width: normalize(110), height: normalize(85), top: normalize(20) }} resizeMode={ImageResize.COVER} />
      </View>
      <Label style={NewsFeedStyle.descriptionStyle} children={item.des} numberOfLines={0} />

      <SectionVideoFooter
        leftTitle={item.videoLabel}
        rightTitle={item.month}
        leftTitleColor={theme.themeData.primary}
        rightIcon={() => <CalendarIcon />}
        rightDate={item.date}
        rightDateColor={Styles.color.smokeyGrey}
        rightTitleColor={Styles.color.smokeyGrey}
        addBookMark={true}
      />
      <Divider />
    </View>
  }

  return (
    <View style={NewsFeedStyle.container}>
      <FlatList
        style={NewsFeedStyle.listContainer}
        keyExtractor={(_, index) => index.toString()}
        listKey={flatListUniqueKey.SHORT_ARTICLE + new Date().getTime().toString()}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
      <View style={{ height: normalize(100), paddingHorizontal: normalize(20), top: normalize(20) }}>
        <TouchableOpacity onPress={() => { console.log('Older stories scroll') }}>
          <View style={{ height: normalize(200), alignItems: 'center' }}>
            <Label style={{ color: theme.themeData.primary, fontSize: normalize(18), padding: normalize(15) }} children={'Older stories scroll'} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsFeed

const NewsFeedStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 0.04 * screenWidth
  },
  listContainer: {

  },
  footerContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  descriptionStyle: {
    fontSize: normalize(14),
    color: Styles.color.smokeyGrey,
    textAlign: 'left',
    paddingVertical: normalize(20),
    lineHeight: normalize(18)
  }
})

