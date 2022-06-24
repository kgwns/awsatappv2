import React, {useState, FunctionComponent} from 'react';
import {Keyboard, View, FlatList, ListRenderItem, TouchableWithoutFeedback, StyleSheet, ScrollView, Text} from 'react-native';
import { ButtonList, Label, LoadingState, SocialLoginButton, Image, Divider, FooterCaptionWithImage } from 'src/components/atoms/';
import { SearchBar } from 'src/components/molecules/';
import { isIOS, isTab, normalize, recordLogEvent } from 'src/shared/utils';
import { SearchItemType } from 'src/redux/search/types';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import { useTranslation } from 'react-i18next';
import { useSearch } from 'src/hooks';
import { fonts } from 'src/shared/styles/fonts';
import { getImageUrl, decodeHTMLTags, isNonEmptyArray, dateTimeAgo, TimeIcon } from 'src/shared/utils/utilities';
import { ImageResize } from 'src/shared/styles/text-styles';
import { decode } from 'html-entities';

export interface SearchResultsProps {
  id: string;
  label: string;
}

export interface SearchListProps {
  testID?: string;
  onItemActionPress?: (item: SearchItemType) => void;
  onTextChange?: (searctText: string) => void;
  isLoading: boolean;
  data: SearchItemType[];
  searchHistory: string[];
  onPressHistory: (historyText: string) => void;
}

const keyExtractor = (_item:SearchItemType,index: number) => {
  return `serachResults-${index}`;
};

export const SearchList: FunctionComponent<SearchListProps> = ({
  onItemActionPress,
  testID,
  onTextChange,
  isLoading,
  data,
  searchHistory,
  onPressHistory
}) => {
  const [searchText, setSearchText] = useState('');
  const styles = useThemeAwareObject(createStyles);
  const [t] = useTranslation();
  const { emptySearchHistory } = useSearch();

  const handleOnItemPressAction = (item: SearchItemType) => {
    if (onItemActionPress) {
      onItemActionPress(item);
    }
  };

  const onSubmit = () => {
    recordLogEvent('Search_Content', {searchKeyword: searchText});
  }

  const renderItem: ListRenderItem<SearchItemType> = ({item,index}) => {
    const tagLabel =  item.field_news_categories_export && isNonEmptyArray(item.field_news_categories_export) ? item.field_news_categories_export[0].title + '  |  ' : ''
    const title = decode(item.title)
    const body = decode(item.body)
    const timeFormat = dateTimeAgo(item.created_export)
    const date = timeFormat.time
    return (
      <TouchableWithoutFeedback
        testID={`searchItem_${index}`}
        accessibilityLabel={`searchItem_${index}`}
        onPress={() => {
          handleOnItemPressAction(item);
        }}>
        <View style={styles.searchItemContainer}>
          <View style={styles.rowContentContainer}>
            <View style={isTab ? styles.tabTitleContainer : styles.titleContainer}>
              <Text style={styles.searchTag}> {tagLabel}
                <Text style={styles.searchText}>{decodeHTMLTags(title)}</Text>
              </Text>
            </View>
            <View style={isTab ? styles.tabImageWrapper : styles.imageWrapper}>
              <View style={isTab ? styles.tabImageContainer : styles.imageContainer}>
                <Image fallback url={getImageUrl(item.field_image)} style={styles.image} resizeMode={ImageResize.COVER} />
              </View>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <FooterCaptionWithImage icon={() => TimeIcon(timeFormat.icon)} subTitle={date} subTitleColor={colors.smokeyGrey} />
          </View>
          <View style={styles.descriptionContainer}>
            <Label 
              style={styles.descriptionText}>
              {decodeHTMLTags(body)}
            </Label>
          </View>
          <Divider style={styles.divider} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderEmpty = () => {
    return (
      <View style={styles.emptyListShowStyle}>
        <Label labelType='h1' style={styles.emptyText} numberOfLines={2}>
          {t('searchScreen.notFound')}
        </Label>
      </View>
    );
  };

  const onSearchTextChange = (searchString: string) => {
    setSearchText(searchString);
    if (onTextChange) {
      onTextChange(searchString);
    }
  };

  const getSearchResults = () => {
    return (
      <>
        {isLoading ? <LoadingState /> :
          <View style={styles.containerStyle}>
            <FlatList
              testID={'searchResultsListID'}
              data={data}
              showsVerticalScrollIndicator={false}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              bounces={false}
              ListEmptyComponent={renderEmpty}
            />
          </View>
        }
      </>
      );
  };

  const searchHistoryView = () => {
    return(

        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'flex-start'}}>
          {searchHistory?.length > 0 && searchHistory.map(item => {
            return(
              <View>
              <ButtonList
                title={item}
                titleStyle={styles.historyItemText}
                showIcon={false}
                onPress={() => onSearchTextChange(item)}
              />
              </View>
            )
          })}
          </View>
          {searchHistory?.length > 0 && 
          <SocialLoginButton
            testID="clear_search_history"
            onPress={() => emptySearchHistory()}
            label={t('searchScreen.clearSearchHistory')}
            style={styles.clearButtonStyle}   
            labelStyle={styles.clearButtonLabel}
          />
        }
        </ScrollView>
        
      
      
    )
  }

  return (
    <View style={{flex:1}}>
      <SearchBar
        testID={testID}
        searchText={searchText}
        onChangeText={(text:string) => {
          onSearchTextChange(text);
        }}
        onClearSearchText={() => {
          Keyboard.dismiss();
          if (onTextChange) {
            onTextChange('');
          }
          setSearchText('');
        }}
        onSubmitSearch={onSubmit}
      />
      {/* User Need to type minimum four char */}
      {searchText.length >= 4 ? getSearchResults() : searchHistoryView()}
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  searchItemContainer: {
    marginTop: normalize(20)
  },
  searchTag: {
    color: theme.primary,
    textAlign: 'left',
    fontSize: 18,
    lineHeight: 26,
    fontFamily: fonts.AwsatDigitalBetav10_Bold,
  },
  searchText: {
    color: theme.primaryBlack,
    fontSize: 18,
    lineHeight: 26,
    fontFamily: fonts.AwsatDigitalBetav10_Bold,
  },
  containerStyle: {
    flex : 1
  },
  rowStyle: {
    flexDirection: 'row',
  },
  emptyListShowStyle: {
    flex:1,
  },
  emptyText: {
    color: theme.primaryDarkSlateGray,
    textAlign: 'center',
    fontSize: 16,
    marginTop:30,
  },
  historyItemText: {
    fontWeight: 'normal',
    fontFamily: fonts.AwsatDigitalBetav10_Regular,
  },
  clearButtonStyle: {
   marginTop: normalize(20),
   backgroundColor: colors.cyanGreen,
   borderWidth: 0,
   marginBottom: normalize(30)
  },
  clearButtonLabel: {
    color: colors.greenishBlue,
    lineHeight: isTab ? 36 : 32
  },
  rowContentContainer: {
    flexDirection:'row'
  },
  tabTitleContainer: {
    width: '83%',
    flexDirection: 'row',
    flexShrink: 1 
  },
  titleContainer: {
    width: '70%',
    flexDirection: 'row',
    flexShrink: 1,
    marginRight: isIOS ? '3%' : '4%' 
  },
  descriptionContainer: {
    marginTop: 5
  },
  descriptionText: {
    color: theme.secondaryDavyGrey,
    textAlign: 'left',
    fontSize: 15,
    lineHeight: 23,
    fontFamily: fonts.Effra_Regular,
  },
  divider: {
    height: 1,
    backgroundColor: theme.dividerColor
  },
  tabImageWrapper: {
    width: '15%',
    marginLeft: '2%',
    alignItems: 'flex-end'
  },
  imageWrapper: {
    width: '25%',
    marginLeft: '2%',
    alignItems: 'flex-end'
  },
  tabImageContainer: {
    width: 153,
    height: 125
  },
  imageContainer: {
    width: 92,
    height: 69
  },
  image: {
    width: '100%',
    height:'100%'
  },
  dateContainer: {
    marginTop: 5
  }
});
