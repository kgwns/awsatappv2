import React, {FunctionComponent} from 'react';
import { TouchableOpacity, View, StyleSheet, I18nManager} from 'react-native';
import {Input} from 'react-native-elements';
import { Image } from '../../atoms'
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';
import CloseIcon from 'src/assets/images/icons/close.svg';
import SearchIcon from 'src/assets/images/icons/search.svg';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTheme} from 'src/shared/styles/ThemeProvider';
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
  const styles = useThemeAwareObject(createStyles);
  const {themeData} = useTheme();
  return (
    <View style={styles.container}>
      <Input
        testID={testID}
        accessibilityLabel={testID}
        returnKeyType={'done'}
        spellCheck={false}
        autoCorrect={false}
        selectionColor={themeData.primaryDarkSlateGray}
        value={searchText}
        onChangeText={onChangeText}
        leftIcon={
          searchText.length > 0 && (
            <TouchableOpacity
              testID={'clearSearchButtonId'}
              accessibilityLabel={'clearSearchButtonId'}
              onPress={onClearSearchText}>
                <CloseIcon height={13} width={13}  fill={themeData.secondaryDarkSlate} />
            </TouchableOpacity>
          )
        }
        rightIcon={
          <SearchIcon height={16} width={16} fill={themeData.secondaryDarkSlate} />
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

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
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
      borderColor: theme.primaryDarkSlateGray,
      alignItems: 'center',
    },
    containerStyle: {
      flex: 1,
      height: normalize(40),
      paddingHorizontal: 0,
    },
    inputStyle: {
      color: theme.primaryDarkSlateGray,
      fontSize: normalize(15),
      textAlign: I18nManager.isRTL?'right':'left',
    },
  });
