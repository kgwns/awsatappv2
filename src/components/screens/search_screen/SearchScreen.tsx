import React, {useState} from 'react';
import { ScreenContainer } from '..';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchList,SearchResultsProps } from 'src/components/organisms/';
import { normalize } from 'src/shared/utils';
import CloseIcon from 'src/assets/images/icons/close.svg';


export const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation()
  const onPressItem = (item:SearchResultsProps)=>{
    // console.log('itempressed',item,searchText)
  }

  return (
    <ScreenContainer>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              testID='search_goBack'
              accessibilityLabel='search_goBack'
              onPress={() => navigation.goBack()}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <SearchList
            testID="search-input"
            onItemActionPress={onPressItem}
            onTextChange={text => {
              setSearchText(text);
            }}
          />
        </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: normalize(25),
  },
  headerContainer: {
    alignItems: 'flex-end',
    height: 55,
    justifyContent: 'center',
  }
})


