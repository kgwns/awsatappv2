import React, {useState, FunctionComponent} from 'react';
import {Keyboard, View, FlatList, ListRenderItem, TouchableWithoutFeedback, StyleSheet, ScrollView} from 'react-native';
import { ButtonList, Label, LoadingState, SocialLoginButton } from 'src/components/atoms/';
import { SearchBar } from 'src/components/molecules/';
import { normalize, recordLogEvent } from 'src/shared/utils';
import { SearchItemType } from 'src/redux/search/types';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import { useTranslation } from 'react-i18next';
import { useSearch } from 'src/hooks';
import { fonts } from 'src/shared/styles/fonts';

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
    return (
      <TouchableWithoutFeedback
        testID={`searchItem_${index}`}
        accessibilityLabel={`searchItem_${index}`}
        onPress={() => {
          handleOnItemPressAction(item);
        }}>
        <View>
          <Label
            labelType='caption4'
            style={styles.searchText} numberOfLines={2}>
            {item.title}
          </Label>
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
      {searchText.length > 0 ? getSearchResults() : searchHistoryView()}
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
StyleSheet.create({
  searchText: {
    color: theme.primaryDarkSlateGray,
    textAlign: 'left',
    marginVertical: normalize(16),
    fontSize: normalize(16),
    fontFamily: fonts.Almaria_Regular,
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
    fontSize: normalize(16),
    marginTop: normalize(30),
  },
  historyItemText: {
    fontWeight: 'normal',
    fontFamily: fonts.Almaria_Regular,
  },
  clearButtonStyle: {
   marginTop: normalize(20),
   backgroundColor: colors.cyanGreen,
   borderWidth: 0,
   marginBottom: normalize(30)
  },
  clearButtonLabel: {
    color: colors.greenishBlue
  }
});
