import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
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
  const style = useThemeAwareObject(customStyle);
  const theme = useTheme();
  const numberOfColumn = isTab ? 2 : 1;

  const renderFooter = () => {
    if(!isLoading) return null
    return (
      <View style={{ margin: normalize(20) }}>
        <ActivityIndicator size={'small'} color={theme.themeData.primary} />
      </View>
    )
  }

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
          imageStyle={isTab ? style.tabImageStyle : style.imageStyle}
          tagName={tagName}
          title={item.title}
          titleStyle={style.titleStyle}
          footerInfo={{
            rightIcon: () => TimeIcon(timeFormat.icon),
            rightTitle: timeFormat.time,
            hideBookmark: false,
            rightTitleColor: theme.themeData.signinRightsColor,
          }}
          author={''} created={''}
          isBookmarked={item.isBookmarked}
          onPressBookmark={() => onUpdateArticlesBookmark(index)}
          showDivider={false}
          containerStyle={{ paddingTop: normalize(20) }}
          articleItemStyle={articleItemStyle}
          isJournalist={true}
        />
        {isLoading && data.length - 1 == index && renderFooter()}
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
    flex: 1,
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
  tabImageStyle: {
    width: 0.5 * screenWidth,
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
});

