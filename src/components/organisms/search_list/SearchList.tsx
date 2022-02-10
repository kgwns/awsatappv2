import React, {useState, FunctionComponent} from 'react';
import {Keyboard, View, FlatList, ListRenderItem, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import { Label, LoadingState } from 'src/components/atoms/';
import { SearchBar } from 'src/components/molecules/';
import { normalize } from 'src/shared/utils';
import { SearchItemType } from 'src/redux/search/types';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {CustomThemeType} from 'src/shared/styles/colors';
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
}) => {
  const [searchText, setSearchText] = useState('');
  const styles = useThemeAwareObject(createStyles);

  const handleOnItemPressAction = (item: SearchItemType) => {
    if (onItemActionPress) {
      onItemActionPress(item);
    }
  };

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
            />
          </View>
        }
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
          if (onTextChange) {
            onTextChange('');
          }
          setSearchText('');
        }}
      />
      {searchText.length > 0 && getSearchResults()}
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
  },
  containerStyle: {
    flex : 1
  },
  rowStyle: {
    flexDirection: 'row',
  }
});
