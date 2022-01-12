import React, {FunctionComponent, useState} from 'react';
import {
  View,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {Label, Image, ImageName} from 'src/components/atoms';
import {Styles} from 'src/shared/styles';
import {normalize} from 'src/shared/utils/dimensions';
import {inputDropdownStyle} from 'src/components/atoms/input-dropdown/InputDropdown.style';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Divider} from 'src/components/atoms/divider/Divider';

const {
  container,
  activeLabelStyle,
  textInputStyle,
  lineStyle,
  inputContainer,
  errorTextStyle,
  iconStyle,
  draggableIcon,
  bottomSheetContainer,
  filterItem,
  optionsContainer,
  dividerStyle,
  bottomSheetSafeViewContainer,
} = inputDropdownStyle;
interface OptionsProps {
  label: string;
}
interface InputDropdownProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: (text: string) => void;
  onOptionChanged: (text: any) => void;
  keyboardType?: KeyboardTypeOptions;
  error?: string;
  icon?: ImageName;
  isPassword?: boolean;
  style?: StyleProp<ViewStyle>;
  maxLength?: number;
  optionsTitle: string;
  optionsData: OptionsProps[];
  sheetRef: React.RefObject<RBSheet>;
  editable?: boolean;
}

export const InputDropdown: FunctionComponent<InputDropdownProps> = ({
  label,
  placeholder,
  value = '',
  onChangeText,
  onSubmitEditing,
  keyboardType = 'default',
  error = '',
  icon,
  isPassword = false,
  style,
  maxLength = 30,
  onOptionChanged,
  optionsTitle,
  optionsData,
  sheetRef,
  editable = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
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

  const handleOnSubmitEditing = (text: string) => {
    if (onSubmitEditing) {
      onSubmitEditing(text);
    }
  };

  return (
    <View style={[container, style]}>
      <Label style={activeLabelStyle}>{label}</Label>
      <View style={inputContainer}>
        <TextInput
          value={value.toString()}
          style={textInputStyle}
          placeholder={placeholder}
          placeholderTextColor={Styles.color.greyLight}
          underlineColorAndroid="transparent"
          focusable={false}
          editable={editable}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          onSubmitEditing={event => {
            handleOnSubmitEditing(event.nativeEvent.text);
          }}
          keyboardType={keyboardType}
          maxLength={maxLength}
          {...props}
        />

        <TouchableOpacity
          onPress={() => {
            sheetRef.current?.open();
          }}
        >
          <Image
            style={iconStyle}
            name={'tick'}
            size={normalize(24)}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={lineStyle} />
      <Label style={errorTextStyle}>{error}</Label>
      <RBSheet
        ref={sheetRef}
        keyboardAvoidingViewEnabled
        closeOnDragDown
        closeOnPressMask
        closeOnPressBack
        customStyles={{
          draggableIcon,
          container: bottomSheetContainer,
        }}
      >
        <SafeAreaView style={bottomSheetSafeViewContainer}>
          <View style={optionsContainer}>
            <View>
              <Label labelType={'h2'}>{optionsTitle}</Label>
            </View>

            <View>
              <FlatList
                data={optionsData}
                ItemSeparatorComponent={() => <Divider style={dividerStyle} />}
                renderItem={({item}: {item: any}) => (
                  <View style={filterItem}>
                    <TouchableOpacity
                      onPress={() => {
                        sheetRef.current?.close();
                        onOptionChanged(item);
                      }}
                    >
                      <Label
                        color={Styles.color.greyDark}
                        labelType={'caption4'}
                      >
                        {item.label}
                      </Label>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item: any) => item.label.toString()}
              />
            </View>
          </View>
        </SafeAreaView>
      </RBSheet>
    </View>
  );
};
