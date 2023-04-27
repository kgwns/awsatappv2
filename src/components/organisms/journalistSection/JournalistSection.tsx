import React from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { isTab, normalize, screenWidth } from 'src/shared/utils';
import {
  dateTimeAgo,
  isObjectNonEmpty,
  TimeIcon,
} from 'src/shared/utils/utilities';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { fonts } from 'src/shared/styles/fonts';
import { ArticleItem } from 'src/components/molecules';
import { JournalistArticleData } from 'src/redux/journalist/types';
import { useOrientation } from 'src/hooks';

interface JournalistArticlesSectionProps {
  data: JournalistArticleData[];
  isLoading: boolean;
  onScroll: () => void;
  onUpdateArticlesBookmark: (index: number) => void
}

export const JournalistSection = ({
  data,
  isLoading,
  onScroll,
  onUpdateArticlesBookmark,
}: JournalistArticlesSectionProps) => {
  const {isPortrait} = useOrientation();
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  const numberOfColumn = isTab ? 2 : 1;

  const renderFooter = () => {
    if(!isLoading) {
      return null
    }
    return (
      <View style={style.loaderContainer}>
        <ActivityIndicator size={'small'} color={theme.themeData.primary} />
      </View>
    )
  }

  const getTabImageStyle = () => {
    const tabletStyle = {
      width: Dimensions.get('window').width * 0.46,
      height: 'auto',
      aspectRatio: 1.34,
    };

    return isPortrait ? { ...tabletStyle } : { ...tabletStyle, aspectRatio: 1.33 };
  };

  const renderItem = (item: JournalistArticleData, index: number) => {
    const timeFormat = dateTimeAgo(item.created)
    const articleItemStyle = isTab ? numberOfColumn > 1 && data.length > 1 ? (index % 2 === 0) ? style.evenStyle : style.oddStyle : {} : style.mobileArticleItem
    const tagName = isObjectNonEmpty(item.news_categories) ? item.news_categories.title : ''
    return (
      <View style={style.itemContainer}>
        <ArticleItem
          index={index}
          nid={item.nid}
          image={item.image || 'placeholderImg'}
          imageStyle={isTab ? getTabImageStyle() : style.imageStyle}
          tagName={tagName}
          title={item.title}
          titleStyle={style.titleStyle}
          footerInfo={{
            rightIcon: () => TimeIcon(timeFormat.icon),
            rightTitle: timeFormat.time,
            hideBookmark: false,
            rightTitleColor: theme.themeData.footerTextColor,
          }}
          author={''} created={''}
          isBookmarked={item.isBookmarked}
          onPressBookmark={() => onUpdateArticlesBookmark(index)}
          showDivider={false}
          containerStyle={style.containerStyle}
          articleItemStyle={articleItemStyle}
          isJournalist={true}
        />
        {isLoading && data.length - 1 === index && renderFooter()}
      </View>
    );
  };

  return (
    <View style={style.container}>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item, index }) => renderItem(item, index)}
        onEndReached={onScroll}
        onEndReachedThreshold={0.5}
        numColumns={numberOfColumn}
        columnWrapperStyle={isTab && style.listColumn}
      />
    </View>
  );
};

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColor,
    paddingHorizontal: normalize(20),
    paddingTop: normalize(25)
  },
  scrollMore: {
    fontSize: normalize(16),
    lineHeight: normalize(73),
    color: theme.primary,
    textAlign: 'center',
  },
  headerStyle: {
    fontSize: 20,
    lineHeight: 42,
    color: theme.primary,
    textAlign: 'left',
    marginLeft: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
    marginBottom: normalize(8),
    fontFamily: fonts.AwsatDigital_Bold,
  },
  itemContainer: {
    flex: isTab ? 0.49 : 1,
  },
  titleStyle: {
    fontFamily: fonts.AwsatDigital_Bold,
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'left',
    paddingVertical: normalize(8),
    color: theme.primaryBlack,
  },
  imageStyle: {
    width: '100%',
    height: 'auto',
    aspectRatio: 1.34,
  },
  evenStyle: {
    marginRight: normalize(10),
  },
  oddStyle: {
    marginLeft: normalize(10),
  },
  mobileArticleItem: {
    paddingBottom: normalize(20),
  },
  loaderContainer: {
     margin: normalize(20) 
  },
  containerStyle: {
     paddingTop: normalize(20) 
  },
  listColumn: {
    flex: 1, 
    justifyContent: 'space-between'
  },
});

