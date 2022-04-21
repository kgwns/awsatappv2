import React, {useState} from 'react';
import { ScreenContainer } from '..';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchList } from 'src/components/organisms/';
import { normalize } from 'src/shared/utils';
import CloseIcon from 'src/assets/images/icons/close.svg';
import { useSearch } from 'src/hooks';
import { SearchItemType } from 'src/redux/search/types';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
import {  ScreensConstants } from 'src/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import AdjustAnalyticsManager, { AdjustEventID } from 'src/shared/utils/AdjustAnalyticsManager';


export const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation<StackNavigationProp<any>>()
  const {themeData} = useTheme();
  const styles = useThemeAwareObject(createStyles);
  const {fetchSearchRequest,isLoading,searchData, setSearchHistory, searchHistory} = useSearch();
  const onPressItem = (item:SearchItemType)=>{
    getUpdatedHistoryArray(searchText);
    if (item.nid) {
      AdjustAnalyticsManager.trackEvent(AdjustEventID.SEARCH)
      navigation.navigate(ScreensConstants.ARTICLE_DETAIL_SCREEN, {nid: item.nid})
    }
  }
  const onSearchTextChange = (searchText: string) => {
    setSearchText(searchText);
    fetchSearchRequest({
      searchText: searchText,
    });
  };

  const getUpdatedHistoryArray = (text:string) => { 
    const filterHistoryArray: string[] = searchHistory?.length > 0 ?  searchHistory.filter(v => v !== text) : [];  
    const newHistoryArray: string[] = [text , ...filterHistoryArray];
    setSearchHistory(newHistoryArray.length > 15 ? newHistoryArray.slice(0, 15) : newHistoryArray);
  }

  

  return (
    <ScreenContainer>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              testID='search_goBack'
              accessibilityLabel='search_goBack'
              onPress={() => navigation.goBack()}>
              <CloseIcon fill={themeData.secondaryDarkSlate} />
            </TouchableOpacity>
          </View>
          <SearchList
            testID="search-input"
            onItemActionPress={onPressItem}
            onTextChange={text => {
              onSearchTextChange(text);
            }}
            isLoading={isLoading}
            data={searchData.rows}
            searchHistory={searchHistory}
            onPressHistory={text => {
              onSearchTextChange(text)
            }}
          />
          
          
        </View>
    </ScreenContainer>
  );
};

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: normalize(25),
    backgroundColor: theme.backgroundColor,
  },
  headerContainer: {
    alignItems: 'flex-end',
    height: 55,
    justifyContent: 'center',
  }
})


