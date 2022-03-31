import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import {Image} from '../atoms/image/Image';
import {normalize, screenWidth} from '../../shared/utils';
import {Styles} from '../../shared/styles';
import {TextWithFlag, Divider, Label, LabelTypeProp} from '../atoms';
import {ImageResize} from '../../shared/styles/text-styles';
import {flatListUniqueKey, ScreensConstants} from '../../constants';
import {SectionVideoFooter} from '../molecules';
import CalendarIcon from 'src/assets/images/icons/calendarIcon.svg';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {NewsViewListItemType} from 'src/redux/newsView/types';
import {
  calculateDate,
  calculateMonth,
  decodeHTMLTags,
  getImageUrl,
  calculateYear,
} from 'src/shared/utils/utilities';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';

export interface NewsFeedProps {
  title: string;
  imageUrl: string;
  videoLabel: string;
  des: string;
  month: string;
  date: string;
  titleColor: string;
  barColor: string;
  labelType: LabelTypeProp;
}

interface NewsFeedWidgetProps {
  data: NewsViewListItemType[];
  onScroll: () => void;
  isLoading: boolean;
  onUpdateNewsFeedBookmark: (index: number) => void
}

const NewsFeed = ({data, onScroll, isLoading,onUpdateNewsFeedBookmark}: NewsFeedWidgetProps) => {
  const theme = useTheme();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const style = useThemeAwareObject(customStyle)
  const onPress = (nid: string) => {
    if (nid) {
      navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: nid});
    }
  };

  const renderItem = (item: NewsViewListItemType, index: number) => {
    return (
      <View key={flatListUniqueKey.NEWS_FEED + index}>
        <TouchableWithoutFeedback onPress={() => onPress(item.nid)}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                paddingRight: normalize(15),
                top: normalize(10),
              }}>
              <TextWithFlag
                title={item.title}
                titleColor={theme.themeData.primaryBlack}
                numberOfLines={2}
                labelType={LabelTypeProp.h2}
              />
            </View>
            <View style={style.imageContainer}>
              <Image
                url={getImageUrl(item.field_image)}
                fallback
                style={style.image}
                resizeMode={ImageResize.COVER}
              />
            </View>
          </View>
          <Label
            style={style.descriptionStyle}
            children={decodeHTMLTags(item.body)}
            numberOfLines={3}
          />
        </TouchableWithoutFeedback>
        <View>
          <SectionVideoFooter
            leftTitle={item.author_resource}
            rightTitle={calculateYear(item.created_export)+ ','}
            leftTitleColor={theme.themeData.primary}
            rightIcon={() => <CalendarIcon />}
            rightDate={calculateMonth(item.created_export) +' '+ calculateDate(item.created_export).toString()}
            rightDateColor={Styles.color.smokeyGrey}
            rightTitleColor={Styles.color.smokeyGrey}
            addBookMark={true}
            isBookmarked={item.isBookmarked}
            onPressBookmark={()=>{onUpdateNewsFeedBookmark(index)}}
          />
        </View>
        <Divider style={style.divider}/>
        {isLoading && data.length - 1 == index && (
          <View style={{margin: normalize(28)}}>
            <ActivityIndicator size={'small'} color={theme.themeData.primary} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={style.container}>
      <FlatList
        style={style.listContainer}
        keyExtractor={(_, index) => index.toString()}
        listKey={flatListUniqueKey.NEWS_FEED + new Date().getTime().toString()}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => renderItem(item, index)}
        onEndReached={onScroll}
        onEndReachedThreshold={0.5}
      />
      <View
        style={{
          height: normalize(100),
          paddingHorizontal: normalize(20),
          top: normalize(20),
        }}></View>
    </View>
  );
};

export default NewsFeed;

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  container: {
    paddingHorizontal: 0.04 * screenWidth,
    paddingTop: normalize(25),
  },
  listContainer: {},
  footerContainer: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  descriptionStyle: {
    fontSize: normalize(14),
    color: Styles.color.smokeyGrey,
    textAlign: 'left',
    paddingBottom: normalize(20),
    paddingTop: normalize(5),
    lineHeight: normalize(18),
  },
  divider: {
    height: 1.07,
    backgroundColor: theme.dividerColor
  },
  imageContainer: {
    width: 93,
    height: 73,
    marginTop:20
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
