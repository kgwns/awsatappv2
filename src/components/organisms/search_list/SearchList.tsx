import React, {useState, FunctionComponent} from 'react';
import {Keyboard, View, TouchableWithoutFeedback, StyleSheet, ScrollView, Text} from 'react-native';
import { Label } from 'src/components/atoms/label/Label';
import { ButtonList } from 'src/components/atoms/button-list/ButtonList';
import { LoadingState } from 'src/components/atoms/loading/LoadingState';
import { SocialLoginButton } from 'src/components/atoms/social-login-button/SocialLoginButton';
import { Image } from 'src/components/atoms/image/Image';
import { Divider } from 'src/components/atoms/divider/Divider';
import FooterCaptionWithImage from 'src/components/atoms/footerCaptionWithImage/FooterCaptionWithImage';
import { SearchBar } from 'src/components/molecules/';
import { isIOS, isTab, normalize, recordLogEvent } from 'src/shared/utils';
import { SearchItemType } from 'src/redux/search/types';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import { useSearch } from 'src/hooks';
import { fonts } from 'src/shared/styles/fonts';
import { decodeHTMLTags, isNonEmptyArray, dateTimeAgo, TimeIcon, getArticleImage } from 'src/shared/utils/utilities';
import { ImageResize } from 'src/shared/styles/text-styles';
import { decode } from 'html-entities';
import { TranslateConstants, TranslateKey } from '../../../constants/Constants';
import { Styles } from 'src/shared/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AnalyticsEvents } from 'src/shared/utils/analytics';

export interface SearchResultsProps {
  id: string;
  label: string;
}

export interface SearchListProps {
  testID?: string;
  onItemActionPress?: (item: SearchItemType) => void;
  onTextChange?: (searctText: string, isSubmit: boolean) => void;
  isLoading: boolean;
  isSubmit?: boolean;
  data: SearchItemType[];
  searchHistory: string[];
  onPressHistory: (historyText: string) => void;
}

export const SearchList: FunctionComponent<SearchListProps> = ({
  onItemActionPress,
  testID,
  onTextChange,
  isLoading,
  data,
  searchHistory,
  onPressHistory,
  isSubmit = false,
}) => {
  const [searchText, setSearchText] = useState('');
  const styles = useThemeAwareObject(createStyles);
  const SEARCH_NOT_FOUND = TranslateConstants({key:TranslateKey.SEARCH_NOT_FOUND})
  const CLEAR_SEARCH_HISTORY = TranslateConstants({key:TranslateKey.CLEAR_SEARCH_HISTORY})
  const { emptySearchHistory } = useSearch();

  const handleOnItemPressAction = (item: SearchItemType) => {
    if (onItemActionPress) {
      onItemActionPress(item);
    }
  };

  const onSubmit = () => {
    if(searchText.length < 3){
      searchResults(searchText, true);
    }
    if(isNonEmptyArray(data)){
      recordLogEvent(AnalyticsEvents.SEARCH, {query: searchText, results_length: data.length});
    }
  }

  const renderItem = (item:SearchItemType,index:number) => {
    const tagLabel =  item.field_news_categories_export && isNonEmptyArray(item.field_news_categories_export) ? item.field_news_categories_export[0].title + '  |  ' : ''
    const title = decode(item.title)
    const body = decode(item.body)
    const timeFormat = dateTimeAgo(item.changed)
    const date = timeFormat.time
    return (
      <TouchableWithoutFeedback
        testID={`searchItem_${index}`}
        accessibilityLabel={`searchItem_${index}`}
        onPress={() => {
          handleOnItemPressAction(item);
        }}>
        <View style={ isTab ? styles.tabSearchItemContainer : styles.searchItemContainer}>
          <View style={styles.rowContentContainer}>
            <View style={isTab ? styles.tabTitleContainer : styles.titleContainer}>
              <Text style={styles.searchTag}> {tagLabel}
                <Text style={styles.searchText}>{decodeHTMLTags(title)}</Text>
              </Text>
            </View>
            <View style={isTab ? styles.tabImageWrapper : styles.imageWrapper}>
              <View style={isTab ? styles.tabImageContainer : styles.imageContainer}>
                <Image fallback url={getArticleImage(item.field_image, item.field_new_photo)} style={styles.image} resizeMode={ImageResize.COVER} />
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
          {SEARCH_NOT_FOUND}
        </Label>
      </View>
    );
  };

  const searchResults = (text: string, isSubmit: boolean = false) => {
    if (onTextChange) {
      onTextChange(text, isSubmit);
    }
  }

  const onSearchTextChange = (searchString: string) => {
    setSearchText(searchString);
    searchResults(searchString);
  };

  const onClearSearchText = () => {
    if (onTextChange) {
      onTextChange('', false);
    }
    setSearchText('');
    requestAnimationFrame(() => {
      Keyboard.dismiss();
    });
  }

  const getSearchResults = () => {
    return (
      <>
        {isLoading ?
          <View style = {styles.loadingContainer}>
             <LoadingState />
          </View>
        :
          <View style={styles.containerStyle} testID={'searchResultsListID'}>
            { isNonEmptyArray(data) ? data.map((item,index) => {
                return renderItem(item,index);
              }) :
              renderEmpty()
            }
          </View>
        }
      </>
      );
  };

  const searchHistoryView = () => {
    return(

        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <View style={styles.searchHistoryContainer}>
          {searchHistory?.length > 0 && searchHistory.map((item, index) => {
            return(
              <View key={index} style = {(index === 0) && styles.listContainer}>
              <ButtonList
                title={item}
                titleStyle={ isTab ? styles.tabHistoryItemText : styles.historyItemText}
                showIcon={false}
                onPress={() => onSearchTextChange(item)}
                containerStyle = {isTab && styles.searchDataContainer}
              />
              </View>
            )
          })}
          </View>
          {searchHistory?.length > 0 && 
          <SocialLoginButton
            testID="clear_search_history"
            onPress={() => emptySearchHistory()}
            label={CLEAR_SEARCH_HISTORY}
            style={isTab ? styles.tabClearButtonStyle : styles.clearButtonStyle}   
            labelStyle={styles.clearButtonLabel}
          />
        }
        </ScrollView>
    )
  }

  return (
    <View style={ isTab ? styles.tabSearchBarContainer : styles.searchBarContainer}>
      <SearchBar
        testID={testID}
        searchText={searchText}
        onChangeText={(text:string) => {
          onSearchTextChange(text);
        }}
        onClearSearchText={onClearSearchText}
        onSubmitSearch={onSubmit}
      />
    <KeyboardAwareScrollView bounces={false} enableOnAndroid = {true} 
      showsVerticalScrollIndicator={false} scrollEnabled>
      {/* User Need to type minimum four char */}
      {isSubmit ? getSearchResults() : searchText.length >= 3 ? getSearchResults() : searchHistoryView()} 
    </KeyboardAwareScrollView>
  </View>

  );
};

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  searchItemContainer: {
    marginTop: normalize(20)
  },
  tabSearchItemContainer: {
    marginTop: 30
  },
  searchTag: {
    color: theme.primary,
    textAlign: 'left',
    fontSize: 18,
    lineHeight: 26,
    fontFamily: fonts.AwsatDigital_Bold,
  },
  searchText: {
    color: theme.primaryBlack,
    fontSize: 18,
    lineHeight: 26,
    fontFamily: fonts.AwsatDigital_Bold,
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
    fontFamily: fonts.AwsatDigital_Regular,
  },
  tabHistoryItemText: {
    fontWeight: '400',
    fontFamily: fonts.AwsatDigital_Regular,
    fontSize: 20,
    lineHeight: 28,
    color: Styles.color.davyGrey
  },
  clearButtonStyle: {
   marginTop: normalize(20),
   backgroundColor: colors.cyanGreen,
   borderWidth: 0,
   marginBottom: normalize(30)
  },
  tabClearButtonStyle: {
    marginTop: 40,
    backgroundColor: colors.cyanGreen,
    borderWidth: 0,
    marginBottom: 30
   },
  clearButtonLabel: {
    color: colors.greenishBlue,
    lineHeight: isTab ? 36 : 32
  },
  rowContentContainer: {
    flexDirection:'row'
  },
  tabTitleContainer: {
    width: '80%',
    flexDirection: 'row',
    flexShrink: 1,
    paddingRight: 23,
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
    marginLeft: '5%',
    alignItems: 'flex-end'
  },
  imageWrapper: {
    width: '25%',
    marginLeft: '2%',
    alignItems: 'flex-end'
  },
  tabImageContainer: {
    width: 153,
    height: 125,
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
  }, 
  searchBarContainer: {
    flex: 1
  },
  searchHistoryContainer: {
    alignItems: 'flex-start'
  },
  searchDataContainer: {
    paddingVertical:23
  },
  tabSearchBarContainer: {
    flex: 1,
    backgroundColor: theme.profileBackground,
    marginHorizontal: 35,
    padding: 40,
  },
  listContainer: {
    marginTop: 40
  },
  loadingContainer: {
    marginTop:20,
    height: 80
  }
});
