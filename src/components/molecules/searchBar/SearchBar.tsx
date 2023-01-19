import React, {FunctionComponent} from 'react';
import { TouchableOpacity, View, StyleSheet, I18nManager} from 'react-native';
import {Input} from 'react-native-elements';
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils';
import CloseIcon from 'src/assets/images/icons/close.svg';
import SearchIcon from 'src/assets/images/icons/search.svg';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import { fonts } from 'src/shared/styles/fonts';
import { TranslateConstants, TranslateKey } from '../../../constants/Constants';

export interface SearchBarProps {
  searchText: string;
  onChangeText: (searchText: string) => void;
  onSubmitSearch?: () => void;
  onClearSearchText: () => void;
  testID?: string;
}
export const SearchBar: FunctionComponent<SearchBarProps> = ({
  searchText,
  onChangeText,
  onClearSearchText,
  testID,
  onSubmitSearch,
}) => {
  const styles = useThemeAwareObject(createStyles);
  const {themeData} = useTheme();
  const SEARCH_PLACEHOLDER = TranslateConstants({key:TranslateKey.SEARCH_PLACEHOLDER})
  return (
    <View style={styles.container}>
      <Input
        placeholder={SEARCH_PLACEHOLDER}
        testID={testID}
        accessibilityLabel={testID}
        returnKeyType={'done'}
        spellCheck={false}
        autoCorrect={false}
        selectionColor={themeData.textColor}
        value={searchText}
        onChangeText={onChangeText}
        maxLength={50}
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
        onSubmitEditing={onSubmitSearch}
      />
    </View>
  );
};

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      marginVertical: normalize(12),
      height: normalize(38),
    },
    leftIconStyle: {
      tintColor: Styles.color.black,
    },
    leftIconContainerStyle: {
      height: normalize(38),
      paddingRight: normalize(15),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: normalize(5),
    },
    rightIconContainerStyle: {
      height: normalize(38),
      paddingLeft: normalize(15),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: normalize(5),
    },
    rightIconStyle: {
      tintColor: Styles.color.black,
    },
    inputContainerStyle: {
      height: normalize(20),
      justifyContent: 'flex-start',
      paddingVertical: 0,
      borderBottomWidth: 0,
    },
    containerStyle: {
      flex: 1,
      height: normalize(38),
      paddingHorizontal: 0,
      paddingVertical: 0,
      marginVertical: 0,
      borderBottomWidth: 1.07,
      borderColor: theme.primaryNobel,
    },
    inputStyle: {
      color: theme.primaryDarkSlateGray,
      fontSize: normalize(15),
      textAlign: I18nManager.isRTL?'right':'left',
      paddingVertical: 0,
      marginTop: 0,
      fontFamily: fonts.AwsatDigital_Regular,
    },
  });
