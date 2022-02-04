import React, {useState, FunctionComponent} from 'react';
import {Keyboard, View, FlatList, ListRenderItem, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import { Label } from 'src/components/atoms/';
import { SearchBar } from 'src/components/molecules/';
import { searchResults } from 'src/constants/SampleData';
import { Styles } from 'src/shared/styles';
import { normalize } from 'src/shared/utils';

export interface SearchResultsProps {
  id: string;
  label: string;
}

export interface SearchListProps {
  testID?: string;
  onItemActionPress?: (item: SearchResultsProps) => void;
  onTextChange?: (searctText: string) => void;
}

const keyExtractor = (_item:SearchResultsProps,index: number) => {
  return `serachResults-${index}`;
};

export const SearchList: FunctionComponent<SearchListProps> = ({
  onItemActionPress,
  testID,
  onTextChange,
}) => {
  const [searchText, setSearchText] = useState('');

  const handleOnItemPressAction = (item: SearchResultsProps) => {
    if (onItemActionPress) {
      onItemActionPress(item);
    }
  };

  const renderItem: ListRenderItem<SearchResultsProps> = ({item,index}) => {
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
            style={styles.searchText}>
            {item.label}
          </Label>
        </View>
      </TouchableWithoutFeedback>
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
          <View style={styles.containerStyle}>
            <FlatList
              testID={'searchResultsListID'}
              data={searchResults}
              showsVerticalScrollIndicator={false}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              bounces={false}
            />
          </View>
        </>
      );
  };

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
          setSearchText('');
          if (onTextChange) {
            onTextChange('');
          }
        }}
      />
      {searchText.length > 0 && getSearchResults()}
    </View>
  );
};

const styles = StyleSheet.create({
  searchText: {
    color: Styles.color.greyDark,
    textAlign: 'left',
    marginVertical: normalize(16),
    fontSize: normalize(16),
  },
  containerStyle: {
    flex : 1
  }
});
