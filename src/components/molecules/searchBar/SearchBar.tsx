import React, {FunctionComponent} from 'react';
import { TouchableOpacity, View, StyleSheet, I18nManager} from 'react-native';
import {Input} from 'react-native-elements';
import { Image } from '../../atoms'
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';
import {ImagesName} from 'src/shared/styles';
import CloseIcon from 'src/assets/images/icons/close.svg';
export interface SearchBarProps {
  searchText: string;
  onChangeText: (searchText: string) => void;
  onClearSearchText: () => void;
  testID?: string;
}
export const SearchBar: FunctionComponent<SearchBarProps> = ({
  searchText,
  onChangeText,
  onClearSearchText,
  testID,
}) => {
  return (
    <View style={styles.container}>
      <Input
        testID={testID}
        accessibilityLabel={testID}
        returnKeyType={'done'}
        spellCheck={false}
        autoCorrect={false}
        selectionColor={Styles.color.greyDark}
        value={searchText}
        onChangeText={onChangeText}
        leftIcon={
          searchText.length > 0 && (
            <TouchableOpacity
              testID={'clearSearchButtonId'}
              accessibilityLabel={'clearSearchButtonId'}
              onPress={onClearSearchText}>
                <CloseIcon height={13} width={13} />
            </TouchableOpacity>
          )
        }
        rightIcon={
          <Image
            name={ImagesName.searchIcon}
            resizeMode={'contain'}
            size={18}
            style={styles.rightIconStyle}
          />
        }
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={styles.containerStyle}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        rightIconContainerStyle={styles.rightIconContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: normalize(12),
    height: normalize(40),
  },
  leftIconStyle: {
    tintColor: Styles.color.black,
  },
  leftIconContainerStyle: {
    height: normalize(40),
    paddingRight: normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainerStyle: {
    height: normalize(40),
    paddingLeft: normalize(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconStyle: {
    tintColor: Styles.color.black,
  },
  inputContainerStyle: {
    height: normalize(40),
    borderBottomWidth: 1.2,
    borderColor: Styles.color.greyDark50,
    alignItems: 'center',
  },
  containerStyle: {
    flex: 1,
    height: normalize(40),
    paddingHorizontal: 0,
  },
  inputStyle: {
    color: Styles.color.greyDark50,
    fontSize: normalize(15),
    textAlign: I18nManager.isRTL?'right':'left',
  },
});
