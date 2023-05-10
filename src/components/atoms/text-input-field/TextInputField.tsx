import React, { FunctionComponent, useState } from 'react';
import { StyleProp, ViewStyle, TextStyle, StyleSheet, View, TextInput, KeyboardTypeOptions, I18nManager, TouchableOpacity, TextInputProps } from 'react-native';
import { normalize } from 'src/shared/utils/dimensions';
import { Styles } from 'src/shared/styles';
import EyeIcon from 'src/assets/images/icons/eye_icon.svg';
import LockIcon from 'src/assets/images/icons/lock_icon.svg';
import { Label } from 'src/components/atoms/label/Label';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { fonts } from 'src/shared/styles/fonts';

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: normalize(40),
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: normalize(25),
      borderColor: Styles.color.greyLight1,
      paddingHorizontal: normalize(10),
    },
    textInputStyle: {
      fontFamily: fonts.IBMPlexSansArabic_Regular,
      fontSize: normalize(14),
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      paddingVertical: normalize(5),
      paddingHorizontal: normalize(5),
      color: theme.textInputColor,
    },
    inputContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
    },
    iconContainerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: normalize(5),
    },
    errorTextContainer: {
      alignItems: 'flex-start',
      marginHorizontal: normalize(5),
    },
    errorTextStyle: {
      color: theme.danger,
      paddingVertical: normalize(5),
    },
    starLabelStyle: {
      lineHeight: normalize(17), 
      fontSize: normalize(16)
    },
    starContainer: {
      marginLeft: 5,
    },
    containerStyle: {
      flexDirection: 'row'
    }
  });

interface TextInputfieldProps {
  placeholder?: string;
  rightIcon?: () => void;
  leftIcon?: () => void;
  style?: StyleProp<ViewStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  testID?: string;
  rightIconTestID?: string;
  value?: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  isPassword?: boolean;
  autoFocus?: boolean;
  editable?: boolean;
  disableEyeIcon?: boolean;
  isMandatory?: boolean;
  errorStyle?: StyleProp<ViewStyle>;
  maxLength?: number;
  leftIconStyle?: StyleProp<ViewStyle>;
  multiline?: boolean;
  textInputStyle?: StyleProp<TextInputProps>;
  tabErrorTextStyle?: StyleProp<TextStyle>;
  tabStarLabelStyle?: StyleProp<TextStyle>;
  placeholderTextColor?: string;
  blurOnSubmit?: boolean;
}
export const TextInputField: FunctionComponent<TextInputfieldProps> = ({
  placeholder,
  value = '',
  onChangeText,
  onSubmitEditing = () => ({}),
  keyboardType = 'default',
  error = '',
  isPassword = false,
  style,
  autoFocus = false,
  testID,
  leftIcon,
  rightIcon,
  placeholderStyle,
  editable = true,
  rightIconTestID,
  disableEyeIcon = false,
  isMandatory = false,
  maxLength = 30,
  errorStyle,
  leftIconStyle,
  multiline = false,
  textInputStyle,
  tabErrorTextStyle,
  tabStarLabelStyle,
  placeholderTextColor,
  ...props
}) => {
  const { themeData } = useTheme();
  const styles = useThemeAwareObject(createStyles);
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(isPassword);

  const handleFocus = () => {
    if (!isFocused) {
      setIsFocused(true);
    }
  };
  const handleBlur = () => {
    if ((isFocused && value === '') || !value) {
      setIsFocused(false);
    }
  };
  return (
    <View>
      <View style={styles.containerStyle}>
        <View style={[styles.container, style]}>
          <View style={[styles.iconContainerStyle, leftIconStyle]}>
            {isPassword && <LockIcon width={11} height={14.15} fill={themeData.textColor} />}
            {leftIcon && leftIcon()}
          </View>
          <View style={[styles.inputContainer, style]}>
            <TextInput
              testID={testID}
              accessibilityLabel={testID}
              autoFocus={autoFocus}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor ?? themeData.textColor}
              value={value.toString()}
              style={StyleSheet.flatten([styles.textInputStyle, textInputStyle,placeholderStyle])}
              underlineColorAndroid="transparent"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChangeText={onChangeText}
              onSubmitEditing={() => onSubmitEditing(value.toString())}
              keyboardType={keyboardType}
              secureTextEntry={!!isPasswordVisible}
              selectionColor={themeData.textColor}
              editable={editable}
              maxLength={maxLength}
              contextMenuHidden={isPassword}
              multiline={multiline}
              {...props}
            />
          </View>
          {isPassword && 
          <TouchableOpacity 
            testID={rightIconTestID} 
            accessibilityLabel={rightIconTestID} 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)} 
            style={[styles.iconContainerStyle]}
          >
            <View style={[styles.iconContainerStyle]}>
              {isPassword && !disableEyeIcon && <EyeIcon fill={isPasswordVisible ? themeData.textColor : themeData.primary} />}
              {rightIcon && rightIcon()}
            </View>
          </TouchableOpacity>
          }
        </View>
        {isMandatory && <View style={styles.starContainer}><Label children={'*'} color={colors.greenishBlue} style={[styles.starLabelStyle,tabStarLabelStyle]} /></View>}
      </View>
      <View style={[styles.errorTextContainer, errorStyle]}>
        <Label style={[styles.errorTextStyle,tabErrorTextStyle]}>{error}</Label>
      </View>
    </View>
  );
};
