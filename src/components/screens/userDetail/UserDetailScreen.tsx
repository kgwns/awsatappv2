import React, {FunctionComponent, useEffect, useState, useCallback} from 'react';
import {ScreenContainer} from '..';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
  Modal,
  ActionSheetIOS,
} from 'react-native';
import {
  isIOS,
  isTab,
  normalize,
  screenHeight,
  screenWidth,
} from '../../../shared/utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {getSvgImages} from 'src/shared/styles/svgImages';
import {ImagesName} from 'src/shared/styles/images';
import {TextInputField, Label, ButtonOutline} from '../../atoms';
import UserTextFieldIcon from 'src/assets/images/icons/profile/userTextFieldIcon.svg';
import {
  getFullDate,
  isObjectNonEmpty,
  getFormattedDate,
  getProfileImageUrl,
  CustomAlert,
  isNotEmpty,
  horizontalEdge,
  isValidDate,
} from 'src/shared/utils/utilities';
import DatePicker from 'react-native-date-picker';
import {TabBarComponent, TabBarDataProps} from 'src/components/molecules';
import {
  loginPasswordValidation,
  emptyPasswordValidation,
  reTypePasswordValidation,
} from 'src/shared/validators';
import {useUserProfileData} from 'src/hooks/useUserProfileData';
import ImagePicker from 'react-native-image-crop-picker';
import {UpdateUserImageBodyType} from 'src/redux/profileUserDetail/types';
import {isDarkTheme,SystemPermissions} from 'src/shared/utils';
import {useAppCommon, useOrientation} from 'src/hooks';
import {
  DEFAULT_MINIMUM_DATE,
  DEFAULT_ALERT_TITLE,
  TranslateConstants,
  TranslateKey,
} from 'src/constants/Constants';
import {useNewPassword} from 'src/hooks/useNewPassword';
import {AlertPayloadType} from '../ScreenContainer/ScreenContainer';
import { AlertModal } from 'src/components/organisms';
import { useFocusEffect } from '@react-navigation/native';
import { AvoidSoftInput } from "react-native-avoid-softinput";
import { fonts } from 'src/shared/styles/fonts'

export const UserDetailScreen: FunctionComponent = () => {

  const {theme} = useAppCommon();
  const isDarkMode = isDarkTheme(theme);
  const {themeData} = useTheme();
  const { isPortrait } = useOrientation();

  const CONST_NAME_PLACE_HOLDER = TranslateConstants({key:TranslateKey.NAME_PLACE_HOLDER});
  const passwordChangedSuccessfully = TranslateConstants({key:TranslateKey.PASSWORD_CHANGED_SUCCESSFULLY});
  const tryAgain = TranslateConstants({key:TranslateKey.TRY_AGAIN});
  const oldPasswordDoesNotMatch = TranslateConstants({key:TranslateKey.OLD_PASSWORD_DOES_NOT_MATCH});
  const OPEN_CAMERA_OPTION = TranslateConstants({key:TranslateKey.OPEN_CAMERA_OPTION});
  const OPEN_GALLERY_OPTION = TranslateConstants({key:TranslateKey.OPEN_GALLERY_OPTION});
  const CANCEL = TranslateConstants({key:TranslateKey.CANCEL});
  const ok = TranslateConstants({key:TranslateKey.COMMON_OK});
  const success = TranslateConstants({key:TranslateKey.SUCCESS});
  const CONST_PLEASE_ENTER_THE_NAME = TranslateConstants({key:TranslateKey.PLEASE_ENTER_THE_NAME});
  const CONST_OK =TranslateConstants({key:TranslateKey.OK_TEXT});
  const USER_DETAIL_SELECT_BIRTHDAY_TEXT =TranslateConstants({key:TranslateKey.USER_DETAIL_SELECT_BIRTHDAY_TEXT});
  const USER_DETAIL_YOUR_DETAILS =TranslateConstants({key:TranslateKey.USER_DETAIL_YOUR_DETAILS});
  const USER_DETAIL_PASSWORD_TITLE =TranslateConstants({key:TranslateKey.USER_DETAIL_PASSWORD_TITLE});
  const USER_DETAIL_USER_NAME_TITLE =TranslateConstants({key:TranslateKey.USER_DETAIL_USER_NAME_TITLE});
  const USER_DETAIL_BIRTHDAY_TITLE =TranslateConstants({key:TranslateKey.USER_DETAIL_BIRTHDAY_TITLE});
  const CONFIRM =TranslateConstants({key:TranslateKey.CONFIRM});
  const USER_DETAIL_SELECT_THE_DATE =TranslateConstants({key:TranslateKey.USER_DETAIL_SELECT_THE_DATE});
  const USER_DETAIL_OCCUPATION_TITLE =TranslateConstants({key:TranslateKey.USER_DETAIL_OCCUPATION_TITLE});
  const USER_DETAIL_OCCUPATION_PLACEHOLDER =TranslateConstants({key:TranslateKey.USER_DETAIL_OCCUPATION_PLACEHOLDER});
  const USER_DETAIL_UPDATE_BUTTON_TEXT =TranslateConstants({key:TranslateKey.USER_DETAIL_UPDATE_BUTTON_TEXT});
  const USER_DETAIL_OLD_PASSWORD =TranslateConstants({key:TranslateKey.USER_DETAIL_OLD_PASSWORD});
  const USER_DETAIL_NEW_PASSWORD =TranslateConstants({key:TranslateKey.USER_DETAIL_NEW_PASSWORD});
  const USER_DETAIL_CONFIRM_NEW_PASSWORD =TranslateConstants({key:TranslateKey.USER_DETAIL_CONFIRM_NEW_PASSWORD});
  const USER_DETAIL_MOVE_AND_SCALE =TranslateConstants({key:TranslateKey.USER_DETAIL_MOVE_AND_SCALE});

  const {
    isLoading,
    userProfileData,
    sentUserProfileData,
    fetchProfileDataRequest,
    sendUserProfileInfo,
    updateUserImageRequest,
  } = useUserProfileData();

  const currentDate = new Date();
  const {changePasswordInfo, emptyPasswordResponseInfo, changePasswordData} =
    useNewPassword();

  const styles = useThemeAwareObject(createStyles);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [date, setDate] = useState(new Date(DEFAULT_MINIMUM_DATE));
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    USER_DETAIL_SELECT_BIRTHDAY_TEXT,
  );
  const [userName, setUserName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(Object);
  const [userProfileImage, setUserProfileImage] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(false);
  const [alertPayload, setAlertPayload] = useState<AlertPayloadType>();
 
  const [isDisableDate, setDisableDate] = useState(false)
  const [isDisableName, setDisableName] = useState(false)
  const [isDisableOccupation, setDisableOccupation] = useState(false)
  const [showupUp,setShowPopUp] = useState(false)

  const maxDate = currentDate.setFullYear(currentDate.getFullYear() - 15);

  const REQUIRE_ACCESS = TranslateConstants({key:TranslateKey.REQUIRE_ACCESS});
  const REQUEST_CAMERA_ACCESS_MESSAGE = TranslateConstants({key:TranslateKey.REQUEST_CAMERA_ACCESS_MESSAGE})

  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setAdjustResize();
    return () => {
      AvoidSoftInput.setDefaultAppSoftInputMode();
    };
  }, []);
  useFocusEffect(onFocusEffect);

  useEffect(() => {
    fetchProfileDataRequest();
    emptyPasswordResponseInfo();
    return () => {
      fetchProfileDataRequest();
      emptyPasswordResponseInfo();
    };
  }, []);

  useEffect(() => {
    setEmail(userProfileData.user?.email as string);
    {
      setOccupation(
        userProfileData.user?.occupation
          ? ((userProfileData.user?.occupation).toString())
          : occupation,
      );
    }
    {
      userProfileData.user?.display_name && userProfileData.user?.display_name !== ' ' ?  setName(userProfileData.user?.display_name as string) : userProfileData.user?.name &&
        userProfileData.user?.name !== ' ' &&
        setName((userProfileData.user?.name).toString());
    }
    {
      userProfileData.user?.image &&
        setUserProfileImage(
          getProfileImageUrl((userProfileData.user?.image).toString()),
        );
    }
    if (userProfileData.user?.birthday) {
      const birthdayDate = userProfileData.user?.birthday
      setBirthday(getFullDate(birthdayDate));
      if (isValidDate(birthdayDate)) {
        const parsedDate = new Date(birthdayDate)
        setDate(parsedDate)
      }
    }
    {
      userProfileData.user?.display_name && userProfileData.user?.display_name !== ' ' ?  setUserName(userProfileData.user?.display_name as string) : userProfileData.user?.name &&
        userProfileData.user?.name !== ' ' &&
        setUserName((userProfileData.user?.name).toString());
    }
    if(userProfileData.user?.image == null){
      userProfileData.user?.profile_url &&
        setUserProfileImage(
          getProfileImageUrl(userProfileData.user?.profile_url),
        );
    }
  }, [userProfileData]);

  useEffect(() => {
    if (sentUserProfileData.message?.code === 200) {
      setUserName(name);
    }
  }, []);

  useEffect(()=>{
    if (isNotEmpty(name)) {
      setDisableName(userProfileData.user?.display_name !== name)
    } else {
      setDisableName(false)
    }
    if (isNotEmpty(occupation)) {
      setDisableOccupation((userProfileData.user?.occupation !== occupation))
    } else {
      setDisableOccupation(false)
    }

  }, [name, occupation]);

  useEffect(() => {
    const message = changePasswordData?.message;
    if (isObjectNonEmpty(changePasswordData?.message)) {
      if (message.code === 200) {
        setAlertPayload({
          title: success,
          message: passwordChangedSuccessfully,
          buttonTitle: ok,
        });
        setIsAlertVisible(true);
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        emptyPasswordResponseInfo();
      } else if (message.code === 0 && isNotEmpty(message?.message)) {
        setAlertPayload({
          title: tryAgain,
          message: oldPasswordDoesNotMatch,
          buttonTitle: ok,
        });
        setIsAlertVisible(true);
        emptyPasswordResponseInfo();
      } else {
        showAlert(message.message);
      }
    }
  }, [changePasswordData]);

  const showAlert = (text: string) => {
    Alert.alert(text, '', [
      {
        text: ok,
        onPress: () => onAlertOkPressed(),
      },
    ]);
  };

  const onAlertOkPressed = () => {
    if (
      isObjectNonEmpty(changePasswordData?.message) &&
      changePasswordData?.message.code === 200
    ) {
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
    emptyPasswordResponseInfo();
    setIsAlertVisible(false);
  };

  const tabItemData: TabBarDataProps[] = [
    {
      tabName: USER_DETAIL_YOUR_DETAILS,
      isSelected: true,
    },
    {
      tabName: USER_DETAIL_PASSWORD_TITLE,
      isSelected: false,
    },
  ];
  const [tabItem, setTabItem] = useState<TabBarDataProps[]>(tabItemData);
  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);

  const onPressTabItem = (index: number) => {
    const tabData = tabItem;
    tabData[tabSelectedIndex].isSelected = false;
    tabData[index].isSelected = true;
    setTabItem(tabData);
    setTabSelectedIndex(index);
  };

  const renderTabBarComponent = () => (
    <TabBarComponent
      tabItem={tabItem}
      onPressTabItem={onPressTabItem}
    />
  );

  const tabContent = () => {
    if (tabSelectedIndex === 1) {
      return renderPassword();
    } else {
      return renderUserDetails();
    }
  };

  const EditIcon = () => (
    <>
      {getSvgImages({
        name: ImagesName.editIcon,
        width: styles.dpEditIcon.width,
        height: styles.dpEditIcon.height,
      })}
    </>
  );

  const UserIcon = () => (
    <>
      {getSvgImages({
        name: ImagesName.userDefaultIcon,
        width: styles.dpDefaultIcon.width,
        height: styles.dpDefaultIcon.height,
        style: styles.dpDefaultIcon,
      })}
    </>
  );

  const DropDownIcon = () => (
    <>
      {getSvgImages({
        name: ImagesName.dropDownIcon,
        width: styles.dropDownIcon.width,
        height: styles.dropDownIcon.height,
        style: styles.dropDownIcon,
      })}
    </>
  );
  const onPressConfirm = () => {
    setDisableName(false)
    setDisableOccupation(false)
    setDisableDate(false)
    isNotEmpty(name)
      ? sendUpdatedProfileInfo()
      : setShowPopUp(true);
  };

  const onCloseSignUpAlert = () => {
    setShowPopUp(false)
  }


  const sendUpdatedProfileInfo = () => {
    sendUserProfileInfo({
      email: email,
      display_name: name ?? '',
      first_name: name ?? '',
      birthday:
        selectedDate.toString() !== USER_DETAIL_SELECT_BIRTHDAY_TEXT
          ? getFormattedDate(date)
          : userProfileData.user?.birthday
          ? getFormattedDate(userProfileData.user?.birthday)
          : '',
      occupation: occupation ?? '',
    });
    setUserName(name);
  };

  const renderUserDetails = () => (
      <View style={ isPortrait ? styles.userContainerStyle : styles.userContainerLandscapeStyle}>
        <View style={styles.userContainer}>
          <View style={isTab ? styles.tabDpContainer : styles.dpContainer}>
            <TouchableOpacity testID='render_Option_Modal' onPress={() => 
              isIOS? renderOptionModalIOS() :  setModalVisible(true)}>
              <View style={styles.dpEditContainer}>
                <EditIcon />
              </View>
            </TouchableOpacity>
            {userProfileImage ? (
              <Image
                style={styles.dpDefaultIcon}
                source={{uri: userProfileImage}}
              />
            ) : (
              <UserIcon />
            )}
          </View>
          <View style={styles.emailContainer}>
            <Label
              style={styles.emailTitle}
              color={colors.greenishBlue}
              children={
                userName ? userName : USER_DETAIL_USER_NAME_TITLE
              }
            />
            <Label style={styles.email} children={email} />
          </View>
        </View>
        <View style={ isPortrait ? styles.fieldContainer : styles.fieldContainerLandscape}>
          <View style={styles.nameInputContainer}>
            <Label
              style={styles.nameTitle}
              color={colors.greenishBlue}
              children={CONST_NAME_PLACE_HOLDER}
            />
            <TextInputField
              placeholder={CONST_NAME_PLACE_HOLDER}
              testID={'profile_name'}
              onChangeText={setName}
              value={name}
              style={styles.nameInputStyle}
              isMandatory
              maxLength={20}
              placeholderStyle = {isTab && styles.placeholderStyle}
              leftIcon={() => <UserTextFieldIcon fill={themeData.textColor} />}
            />
          </View>
          <View style={styles.spaceStyle}>
            <Label
              style={[styles.birthdayTitle, !isPortrait && {marginTop:0}]}
              color={colors.greenishBlue}
              children={USER_DETAIL_BIRTHDAY_TITLE}
            />
            <DatePicker
              locale="ar_AE"
              testID='date_Picker'
              minimumDate={new Date(DEFAULT_MINIMUM_DATE)}
              maximumDate={new Date(maxDate)}
              cancelText={CANCEL}
              confirmText={CONFIRM}
              modal
              open={open}
              date={date}
              onConfirm={pickerDate => {
                setOpen(false);
                setDate(pickerDate);
                setDisableDate(true);
                setSelectedDate(getFullDate(pickerDate));
                setBirthday('');
              }}
              onCancel={() => {
                setOpen(false);
              }}
              mode={'date'}
              title={USER_DETAIL_SELECT_THE_DATE}
              theme={isDarkMode ? 'dark' : 'light'}
              textColor={isIOS ? themeData.textInputColor : colors.black}
            />
            <TouchableOpacity testID='set_Open' onPress={() => setOpen(true)}>
              <View style={styles.dropDownContainer}>
                <View>
                  <Label
                    children={
                      birthday !== '' ? birthday : selectedDate.toString()
                    }
                    style={[
                      styles.dropDownLabel,
                      !isPortrait && {marginLeft: '2%'},
                      selectedDate.toString() ===
                       USER_DETAIL_SELECT_BIRTHDAY_TEXT &&
                        styles.dropDownLabelPlaceholder,
                    ]}
                  />
                </View>
                <DropDownIcon />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.spaceStyle}>
            <Label
              style={[styles.occupationTitle, !isPortrait && { marginTop: '3%' }]}
              color={colors.greenishBlue}
              children={USER_DETAIL_OCCUPATION_TITLE}
            />
            <TextInputField
              placeholder={USER_DETAIL_OCCUPATION_PLACEHOLDER}
              testID={'profile_occupation'}
              onChangeText={setOccupation}
              maxLength={20}
              value={occupation}
              style={styles.occupationInputStyle}
              placeholderStyle = { isTab && styles.placeholderStyle}
            />
          </View>
        </View>
        <ButtonOutline
          isDisable={!(isDisableName || isDisableDate || isDisableOccupation)}
          style={styles.updateButton}
          labelStyle={styles.updateButtonLabel}
          title={USER_DETAIL_UPDATE_BUTTON_TEXT}
          onPress={onPressConfirm}
        />
      </View>
  );

  const renderPassword = () => (
    <View style={ isPortrait ? styles.container : styles.containerLandscape}>
      <TextInputField
        placeholder={USER_DETAIL_OLD_PASSWORD}
        testID={'old_password'}
        rightIconTestID={'old_password_icon'}
        onChangeText={setOldPassword}
        value={oldPassword}
        style={styles.inputStyle}
        error={oldPasswordError}
        maxLength={20}
        isPassword
        isMandatory
      />
      <TextInputField
        placeholder={USER_DETAIL_NEW_PASSWORD}
        testID={'new_password'}
        rightIconTestID={'new_password_icon'}
        onChangeText={setNewPassword}
        value={newPassword}
        style={styles.inputStyle}
        error={newPasswordError}
        isPassword
        maxLength={20}
        isMandatory
      />
      <TextInputField
        placeholder={USER_DETAIL_CONFIRM_NEW_PASSWORD}
        testID={'new_confirm_password'}
        rightIconTestID={'new_confirm_password_icon'}
        onChangeText={setConfirmNewPassword}
        value={confirmNewPassword}
        style={styles.inputStyle}
        error={confirmNewPasswordError}
        isPassword
        maxLength={20}
        isMandatory
      />
      <View style={styles.updateButtonContainer}>
        <ButtonOutline
          isDisable={!(isNotEmpty(oldPassword) && isNotEmpty(newPassword) && isNotEmpty(confirmNewPassword))}
          style={styles.updateButton}
          labelStyle={styles.updateButtonLabel}
          title={USER_DETAIL_UPDATE_BUTTON_TEXT}
          onPress={onChangePasswordUpdate}
        />
      </View>
    </View>
  );

  const onChangePasswordUpdate = () => {
    Keyboard.dismiss();
    setOldPasswordError(emptyPasswordValidation(oldPassword));
    setNewPasswordError(loginPasswordValidation(newPassword));
    setConfirmNewPasswordError(
      reTypePasswordValidation(newPassword, confirmNewPassword),
    );
    if (
      newPassword === confirmNewPassword &&
      isNotEmpty(newPassword) &&
      isNotEmpty(confirmNewPassword) &&
      isNotEmpty(oldPassword)
    ) {
      changePasswordInfo({
        password: newPassword,
        old_password: oldPassword,
      });
    }
  };

  const renderOptionModalIOS=()=>{
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [OPEN_CAMERA_OPTION, 
        OPEN_GALLERY_OPTION, 
        CANCEL],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 2,
        userInterfaceStyle: isDarkMode ?'dark' :'light'
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          openCamera()
        } else if (buttonIndex === 1) {
          openGallery()
        } 
      }
    );
  }

  const renderOptionModal = () => (
    <Modal
      visible={isModalVisible}
      animationType={'slide'}
      transparent={true}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.optionModalContainer}>
        <View style={styles.overlayStyle}>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              testID={'camera_option'}
              onPress={onClickOpenCamera}>
              <View style={styles.optionStyle}>
                <Label
                  style={styles.optionTextStyle}
                  children={OPEN_CAMERA_OPTION}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              testID={'gallery_option'}
              onPress={() => {
              openGallery()
             }}>
              <View style={styles.optionStyle}>
                <Label
                  style={styles.optionTextStyle}
                  children={OPEN_GALLERY_OPTION}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.cancelContainer}>
            <TouchableOpacity testID={'modal_Visible'} onPress={() => setModalVisible(false)}>
              <View style={styles.cancelStyle}>
                <Label
                  style={styles.cancelTextStyle}
                  children={CANCEL}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const openGallery = () => {
    setModalVisible(false);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.6,
      cropperToolbarTitle: USER_DETAIL_MOVE_AND_SCALE,
    }).then(image => {
      uploadImage(image);
    });
  };

  const openCamera = async () => {
    setModalVisible(false);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.6,
      cropperToolbarTitle: USER_DETAIL_MOVE_AND_SCALE,
    }).then(image => {
      uploadImage(image);
    });
  };

  const onClickOpenCamera = async () => {
    if (isIOS) {
      openCamera();
    } else {
      const hasPermission = await SystemPermissions.hasCameraPermission();
      if (hasPermission) {
        openCamera();
      } else {
        const hasPermissionGranted =
          await SystemPermissions.requestCameraPermission();
        hasPermissionGranted
          ? openCamera()
          : CustomAlert({
              title: REQUIRE_ACCESS,
              message: REQUEST_CAMERA_ACCESS_MESSAGE,
            });
      }
    }
  };

  const uploadImage = (image: any) => {
    const payload: UpdateUserImageBodyType = {
      image: image.path,
    };
    setModalVisible(false);
    setProfileImage(image);
    setUserProfileImage(image.path);
    updateUserImageRequest(payload);
  };

  return (
      <ScreenContainer
        edge={horizontalEdge}
        isOverlayLoading={isLoading}
        isAlertVisible={isAlertVisible}
        setIsAlertVisible={setIsAlertVisible}
        alertOnPress={onAlertOkPressed}
        alertPayload={alertPayload}
        backgroundColor={styles.screenBackgroundColor?.backgroundColor}>
          {showupUp && <AlertModal
          title={DEFAULT_ALERT_TITLE}
          message={CONST_PLEASE_ENTER_THE_NAME}
          buttonText={CONST_OK}
          isVisible={true}
          onPressSuccess={onCloseSignUpAlert}
          onClose={onCloseSignUpAlert}
        />}
        {renderOptionModal()}
        {renderTabBarComponent()} 
        <KeyboardAwareScrollView
        bounces={false}
        extraHeight={230}
        showsVerticalScrollIndicator={false}
        scrollEnabled>
        {tabContent()}
        </KeyboardAwareScrollView>
      </ScreenContainer>
  );
};

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: '20%',
      marginStart: '10%', 
      marginEnd: '15%'
    },
    containerLandscape: {
      flex: 1,
      marginVertical: '7%',
      marginStart: '10%', 
      marginEnd: '15%'
    },
    userContainerStyle: {
      flex: 1,
      marginVertical: isTab ? '10%' : '20%',
    },
    userContainerLandscapeStyle: {
      flex: 1,
      marginVertical: 8,
      justifyContent:'center'
    },
    userContainer: {
      flexDirection: 'row',
      width: '100%',
      paddingVertical: '2%',
      marginHorizontal: '10%',
    },
    dpContainer: {
      backgroundColor: colors.cyanGreen,
      width: normalize(76),
      height: normalize(76),
      borderRadius: normalize(76) / 2,
    },
    tabDpContainer: {
      backgroundColor: colors.cyanGreen,
      width: 76,
      height: 76,
      borderRadius: 76/2,
    },
    dpEditContainer: {
      zIndex: 999,
      backgroundColor: 'white',
      position: 'absolute',
      left: 2,
      top: 0,
      width: isTab ? 21 : normalize(21),
      height: isTab ? 21 : normalize(21),
      borderRadius: isTab ? 21/2 : normalize(21) / 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dpEditIcon: {
      width: isTab ? 11 : normalize(11),
      height: isTab ? 11 : normalize(11),
    },
    dpDefaultIcon: {
      zIndex: -4,
      width: isTab ? 76 : normalize(76),
      height: isTab ? 76 : normalize(76),
      borderRadius: isTab ? 76/2 : normalize(76) / 2,
    },
    emailContainer: {
      flex: 0.8,
      marginLeft: '5%',
      justifyContent: 'center',
    },
    emailTitle: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: isTab ? '4%' : '6%',
      textAlign: 'left',
      fontFamily: fonts.IBMPlexSansArabic_Bold,
    },
    email: {
      fontSize: isTab ? 12 : normalize(12),
      lineHeight: isTab ? 17 : normalize(17),
      textAlign: 'left',
      color: theme.textInputColor,
      fontFamily: fonts.IBMPlexSansArabic_Regular,
    },
    fieldContainer: {
      marginVertical: '10%',
    },
    fieldContainerLandscape: {
      marginVertical: 6,
    },
    nameTitle: {
      fontSize: isTab ? 13 : normalize(13),
      lineHeight: isTab ? 17 : normalize(17),
      marginBottom: '2%',
      textAlign: 'left',
      fontFamily: fonts.AwsatDigital_Bold,
    },
    birthdayTitle: {
      fontSize: isTab ? 13 : normalize(13),
      lineHeight: isTab ? 17 : normalize(17),
      marginBottom: '2%',
      marginTop: '2%',
      textAlign: 'left',
      fontFamily: fonts.AwsatDigital_Bold,
    },
    dropDownContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      alignItems: 'center',
      width: '100%',
      height: normalize(40),
      borderWidth: 1,
      borderRadius: normalize(25),
      borderColor: colors.greyLight1,
      paddingHorizontal: isTab ? isIOS ? 0 : 15 : normalize(10),
    },
    dropDownLabel: {
      fontSize: isTab ? 14 : normalize(14),
      lineHeight: 21,
      marginLeft: '3%',
      color: theme.textInputColor,
    },
    dropDownIcon: {
      width: isTab ? 20 : normalize(15),
      height: isTab ? 20 : normalize(15),
      position: 'absolute',
      right: 15,
    },
    dropDownLabelPlaceholder: {
      color: theme.dropDownLabelColor,
    },
    occupationTitle: {
      fontSize: isTab ? 13 : normalize(13),
      lineHeight: isTab ? 17 : normalize(17),
      marginTop: isTab ? '6%' : '10%',
      marginBottom: '2%',
      textAlign: 'left',
      fontFamily: fonts.AwsatDigital_Bold,
    },
    nameInputStyle: {
      width: isTab ? '96%' : '94%',
      color: theme.primaryLightGray,
    },
    occupationInputStyle: {
      width: '100%',
      color: theme.primaryLightGray,
      paddingHorizontal: 2
    },
    placeholderStyle: {
      fontSize: 14,
      paddingVertical: 5,
      paddingHorizontal: 5
    },
    inputStyle: {
      width: '100%',
      color: theme.primaryLightGray,
    },
    updateButtonContainer: {
      marginTop: '10%',
    },
    updateButton: {
      width: '60%',
      alignSelf: 'center',
      backgroundColor: colors.greenishBlue,
      borderWidth: 0,
    },
    updateButtonLabel: {
      color: colors.white,
      fontSize: isTab ? 16 : normalize(16),
      lineHeight: isTab ? 36 :26,
      fontFamily: fonts.AwsatDigital_Bold,
    },
    overlayStyle: {
      flex: 1,
      justifyContent: 'center',
    },
    optionContainer: {
      borderRadius: normalize(10),
      justifyContent: 'space-evenly',
      marginBottom: normalize(15),
      padding: normalize(10),
      backgroundColor: theme.whiteSurface,
      marginHorizontal: '10%',
    },
    cancelContainer: {
      alignSelf: 'stretch',
      marginHorizontal: '10%',
    },
    cancelStyle: {
      borderRadius: normalize(23),
      backgroundColor: colors.greenishBlue,
      padding: normalize(15),
    },
    cancelTextStyle: {
      textAlign: 'center',
      color: colors.white,
      fontFamily: fonts.AwsatDigital_Bold,
      fontSize: normalize(16),
      lineHeight: 20,
    },
    optionStyle: {
      backgroundColor: colors.transparent,
      paddingVertical: normalize(15),
    },
    optionTextStyle: {
      textAlign: 'center',
      fontSize: normalize(16),
      lineHeight: 20,
      fontFamily: fonts.AwsatDigital_Bold,
      color: theme.secondaryDarkSlate,
    },
    optionModalContainer: {
      backgroundColor: colors.blackOpacity95,
      width: screenWidth,
      height: screenHeight,
    },
    spaceStyle: {
      paddingHorizontal: isTab ? '10%' : 0.1 * screenWidth
    },
    nameInputContainer: {
      paddingStart: '10%', 
      paddingEnd: isTab ? '7%' : 0.05 * screenWidth,
    },
    screenBackgroundColor: {
      backgroundColor: theme.profileBackground
    }
  }
  );
