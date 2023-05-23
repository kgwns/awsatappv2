import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { decodeHTMLTags, horizontalEdge, isIOS, isNonEmptyArray, isNotEmpty, isObjectNonEmpty, isTab, normalize, screenWidth } from 'src/shared/utils'
import { AlertPayloadType, ScreenContainer } from '../ScreenContainer/ScreenContainer'
import { FLEX_START } from 'src/shared/styles/item-alignment'
import { CustomThemeType, colors } from 'src/shared/styles/colors'
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { ButtonOnboard, Label, TextInputField } from 'src/components/atoms'
import { ScreensConstants, TranslateConstants, TranslateKey } from 'src/constants/Constants'
import { DeleteMyAccountLabel } from 'src/components/molecules'
import { fetchDMAConfirmInfo, makeConfirmDeleteRequest } from 'src/services/deleteMyAccountService'
import { fonts } from 'src/shared/styles/fonts'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useLogin } from 'src/hooks'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScreenTestId } from 'src/constants/TestConstant'

export const DMADeleteAccountScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { params } = useRoute<RouteProp<any>>();

  const style = useThemeAwareObject(customStyle);
  const { makeUserLogout } = useLogin();

  const SUB_TITLE = TranslateConstants({ key: TranslateKey.DELETE_MY_ACCOUNT_CONFIRMATION_TITLE });
  const PLACE_HOLDER = TranslateConstants({ key: TranslateKey.DMA_CONFIRM_DELETE_PLACEHOLDER });
  const CONFIRM_DELETE_TITLE = TranslateConstants({ key: TranslateKey.DMA_TYPE_DELETE });
  const CONFIRM_DELETE = TranslateConstants({ key: TranslateKey.DELETE_MY_ACCOUNT_CONFIRM_DELETE_BUTTON_TITLE });
  const CANCEL = TranslateConstants({ key: TranslateKey.DELETE_MY_ACCOUNT_CANCEL_BUTTON_TITLE });
  const CONFIRM_TEXT_ENGLISH = TranslateConstants({ key: TranslateKey.DMA_DELETE_ACCOUNT_ENGLISH });
  const CONFIRM_TEXT_ARABIC = TranslateConstants({ key: TranslateKey.DMA_DELETE_ACCOUNT_ARABIC });
  const COMMON_OK = TranslateConstants({key:TranslateKey.COMMON_OK})

  const deleteAccount: AlertPayloadType = {
    title: '',
    message: '',
    buttonTitle: COMMON_OK,
  };

  const [deleteAccountInfo, setDeleteAccountInfo] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isButtonEnable, setIsButtonEnable] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertPayload, setAlertPayload] = useState<AlertPayloadType>(deleteAccount);
  
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetchDMAConfirmInfo();
        if (isObjectNonEmpty(response) && isNonEmptyArray(response.rows)) {
          setDeleteAccountInfo(decodeHTMLTags(response.rows[0].body_export))
          setIsLoading(false);
        }
      } catch (error) {
        console.log('Error DMADeleteAccountScreen Fetch :::, error')
      }
    };

    fetchInfo();
  }, []);

  const onChangeText = (text: string) => {
    const canEnableButton = (text.trim() === CONFIRM_TEXT_ARABIC || text.trim() === CONFIRM_TEXT_ENGLISH);
    setIsButtonEnable(canEnableButton);
    setMessage(text);
  };

  const logout = () => {
    makeUserLogout();
    navigation.reset({
      index: 0,
      routes: [{ name: ScreensConstants.AuthNavigator }],
    });
  };

  const alertOnPress = () => {
    logout();
  }

  const onPressConfirmDelete = async () => {
    setIsLoading(true);
    const payload = {
      option_id: params?.optionId,
      comment: params?.comment,
    };

    try {
      const response = await makeConfirmDeleteRequest(payload);
      if (isObjectNonEmpty(response) && isObjectNonEmpty(response.message)
        && response.message.code && response.message.code === 200) {
        setIsLoading(false);
        setIsAlertVisible(true);
        setAlertPayload({
          ...deleteAccount,
          message: response.message.message
        });
      }
    } catch (error) {
      console.log('Error DMADeleteAccountScreen Delete :::', error)
    }
  }

  const onPressCancel = () => {
    navigation.pop(4);
  };

  const renderTextField = () => (
    <View style={style.confirmDeleteContainer}>
      <Label children={CONFIRM_DELETE_TITLE} style={style.descriptionStyle} />
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
        blurOnSubmit={true}
        testID={ScreenTestId.dmaDeleteAccount.typeDeleteLabel}
      />
    </View>
  );

  const renderFooter = () => (
    <View style={style.footer}>
      <ButtonOnboard
        title={CONFIRM_DELETE}
        buttonStyle={[style.deleteButton, isButtonEnable && { backgroundColor: colors.greenishBlue }]}
        titleStyle={style.buttonText}
        disabled={!isButtonEnable}
        onPress={onPressConfirmDelete}
      />
      <ButtonOnboard
        title={CANCEL}
        buttonStyle={style.button}
        titleStyle={style.buttonText}
        onPress={onPressCancel}
      />
    </View>
  );

  return (
    <ScreenContainer edge={horizontalEdge}
      isLoading={isLoading}
      backgroundColor={style.screenBackgroundColor?.backgroundColor} 
      isAlertVisible = {isAlertVisible} setIsAlertVisible={setIsAlertVisible}
      alertPayload = {alertPayload} alertOnPress={alertOnPress} isAlertCloseIconVisible = {false}>
      <View style={style.container}>
        <DeleteMyAccountLabel title={SUB_TITLE} />
        {isNotEmpty(deleteAccountInfo) && <>
          <Label children={deleteAccountInfo}
            style={[style.descriptionStyle, style.descriptionSpaceStyle]}
            testID={ScreenTestId.dmaDeleteAccount.description}
          />
          <KeyboardAwareScrollView
            bounces={false}
            extraHeight={230}
            showsVerticalScrollIndicator={false}
            scrollEnabled>
              {renderTextField()}
          </KeyboardAwareScrollView>
          {renderFooter()}
        </>}
      </View>
    </ScreenContainer>
  )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
  screenBackgroundColor: {
    backgroundColor: theme.profileBackground
  },
  container: {
    paddingHorizontal: isTab ? '4%' : (0.04) * screenWidth,
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: theme.profileBackground
  },
  descriptionStyle: {
    fontSize: isTab ? 20 : 16,
    fontFamily: fonts.Effra_Arbc_Regular,
    lineHeight: isTab ? 40 : isIOS ? 28 : 32,
    textAlign: 'left',
    color: theme.secondaryDavyGrey,
  },
  textFieldContainer: {
    marginTop: 60,
  },
  confirmDeleteContainer: {
    marginTop: 10,
  },
  inputStyle: {
    color: theme.primaryLightGray,
    height: isTab ? 150 : normalize(100),
    justifyContent: FLEX_START,
    paddingTop: isIOS ? 5 : 8,
    borderRadius: 15,
  },
  messageTextInput: {
    height: '92%',
    textAlignVertical: 'top',
  },
  placeHolder: {
    color: theme.secondaryMediumGrey,
  },
  footer: {
    position: 'absolute',
    bottom: '10%',
  },
  deleteButton: {
    marginBottom: 20,
    backgroundColor: theme.secondaryDavyGrey,
  },
  button: {
    width: normalize(180),
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: isTab ? 18 : 15,
    lineHeight: isTab ? 30 : 24,
  },
  descriptionSpaceStyle: {
    marginTop: 50,
    marginBottom: 10,
  }
});
