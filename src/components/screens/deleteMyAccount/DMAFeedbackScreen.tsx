import { StyleSheet, View, } from 'react-native'
import React, { useState } from 'react'
import { horizontalEdge, isIOS, isTab, normalize, screenWidth } from 'src/shared/utils';
import { ScreenContainer } from '../ScreenContainer/ScreenContainer';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { ButtonOnboard, TextInputField } from 'src/components/atoms';
import { FLEX_START } from 'src/shared/styles/item-alignment';
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { DeleteMyAccountLabel } from 'src/components/molecules';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenTestId } from 'src/constants/TestConstant';

export const DMAFeedbackScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<any>>();

  const style = useThemeAwareObject(customStyle);

  const SUB_TITLE = TranslateConstants({ key: TranslateKey.DELETE_MY_ACCOUNT_FEEDBACK_TITLE });
  const PLACE_HOLDER = TranslateConstants({ key: TranslateKey.DELETE_MY_ACCOUNT_COMMENT_PLACEHOLDER });
  const NEXT_BUTTON = TranslateConstants({ key: TranslateKey.DELETE_MY_ACCOUNT_NEXT_BUTTON_TITLE });

  const [message, setMessage] = useState('');

  const onChangeText = (text: string) => {
    setMessage(text);
  };

  const onPressNext = () => {
    const paramsInfo = {
      optionId: params?.optionId,
      comment: message,
    }
    navigation.navigate(ScreensConstants.DMA_DELETE_ACCOUNT_SCREEN, paramsInfo as never);
  }

  const renderTextField = () => (
    <View style={style.textFieldContainer}>
      <TextInputField
        placeholder={PLACE_HOLDER}
        onChangeText={onChangeText}
        value={message}
        style={style.inputStyle}
        isMandatory={false}
        maxLength={500}
        multiline={true}
        textInputStyle={style.messageTextInput}
        placeholderTextColor={style.placeHolder.color}
        testID={ScreenTestId.dmaFeedback.commentLabel}
      />
    </View>
  );

  return (
    <ScreenContainer edge={horizontalEdge}
      backgroundColor={style.screenBackgroundColor?.backgroundColor}>
      <View style={style.container}>
        <DeleteMyAccountLabel title={SUB_TITLE} />
        <KeyboardAwareScrollView
          bounces={false}
          extraHeight={230}
          showsVerticalScrollIndicator={false}
          scrollEnabled>
          {renderTextField()}
        </KeyboardAwareScrollView>
        <View style={style.footer}>
          <ButtonOnboard
            title={NEXT_BUTTON}
            buttonStyle={style.button}
            titleStyle={style.buttonText}
            onPress={onPressNext}
          />
        </View>
      </View>
    </ScreenContainer>)
};

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  screenBackgroundColor: {
    backgroundColor: theme.profileBackground
  },
  container: {
    paddingHorizontal: isTab ? '4%' : 0.04 * screenWidth,
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: theme.profileBackground
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 30,
  },
  textFieldContainer: {
    marginTop: isTab ? 50 : 30,
  },
  inputStyle: {
    color: theme.primaryLightGray,
    height: isTab ? 350 : normalize(180),
    justifyContent: FLEX_START,
    paddingTop: isIOS ? 5 : 8,
    borderRadius: 15,
  },
  messageTextInput: {
    height: '92%',
    textAlignVertical: 'top',
    fontSize: isTab ? 18 : 12,
    lineHeight: isTab ? 26 : 20,
  },
  placeHolder: {
    color: theme.secondaryMediumGrey,
  },
  footer: {
    position: 'absolute',
    bottom: '15%',
  },
  button: {
    width: normalize(180),
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: isTab ? 18 : 15,
    lineHeight: isTab ? 30 : 24,
  },
});
