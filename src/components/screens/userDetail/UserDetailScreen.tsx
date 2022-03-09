import React, { FunctionComponent, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '..';
import { View, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { isIOS, normalize, screenHeight, screenWidth } from '../../../shared/utils';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { useTranslation } from 'react-i18next';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles/images';
import { TextInputField, Label, ButtonOutline } from '../../atoms';
import UserTextFieldIcon from 'src/assets/images/icons/profile/userTextFieldIcon.svg';
import { getFullDate, isObjectNonEmpty, getFormatedDate, getProfileImageUrl, CustomAlert} from 'src/shared/utils/utilities';
import DatePicker from 'react-native-date-picker';
import { TabBarComponent, TabBarDataProps } from 'src/components/molecules';
import { KeyboardAwareView } from 'keyboard-aware-view';
import { loginPasswordValidation, reTypePasswordValidation } from 'src/shared/validators';
import { useUserProfileData } from 'src/hooks/useUserProfileData';
import { StackNavigationProp } from '@react-navigation/stack';
import ImagePicker from 'react-native-image-crop-picker';
import { UpdateUserImageBodyType } from 'src/redux/profileUserDetail/types';
import { isDarkTheme } from 'src/shared/utils';
import { useAppCommon } from 'src/hooks';
import { SystemPermissions } from 'src/shared/utils';
import { REQUEST_CAMERA_ACCESS_MESSAGE, REQUIRE_ACCESS } from 'src/constants/SharedConstants';

export const UserDetailScreen: FunctionComponent = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()
  const { theme } = useAppCommon()
  const isDarkMode = isDarkTheme(theme)
  const { themeData } = useTheme();
  const [t] = useTranslation();
  const styles = useThemeAwareObject(createStyles);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [occupation, setOccupation] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(t('profile.userDetail.selectBirthdayText'));
  const [userName, setUserName] = useState('')
  const [oldPassword, setOldPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(Object);
  const { isLoading, userProfileData, sentUserProfileData ,fetchProfileDataRequest, sendUserProfileInfo, updateUserImageRequest } = useUserProfileData()
  const [userProfileImage, setUserProfileImage] = useState('') 
  const [birthday, setBirthday] = useState('')
  const currentDate = new Date();
  useEffect(() => {
    fetchProfileDataRequest();
  }, []);

  useEffect(() => {
    setEmail(userProfileData.user?.email as string)
    {setOccupation(userProfileData.user?.occupation? userProfileData.user?.occupation as string : occupation )}
    {userProfileData.user?.name && userProfileData.user?.name !== " " && setName(userProfileData.user?.name as string)}
    {userProfileData.user?.image &&  setUserProfileImage( getProfileImageUrl(userProfileData.user?.image as string))}
    {userProfileData.user?.birthday && setBirthday(getFullDate(userProfileData.user?.birthday))}
    {userProfileData.user?.name && userProfileData.user?.name !== " " && setUserName(userProfileData.user?.name as string)}
  }, [userProfileData])

  useEffect(() =>{
    if (sentUserProfileData.message?.code === 200) {
      setUserName(name)
    }
  },[] )

  const tabItemData: TabBarDataProps[] = [
    {
      tabName: t('profile.userDetail.yourDetails'),
      isSelected: true,
    },
    {
      tabName: t('profile.userDetail.passwordTitle'),
      isSelected: false,
    }
  ]
  const [tabItem, setTabItem] = useState<TabBarDataProps[]>(tabItemData);
  const [tabSelectedIndex, setTabSelectedIndex] = useState<number>(0);

  const onPressTabItem = (index: number) => {
    const tabData = tabItem
    tabData[tabSelectedIndex].isSelected = false;
    tabData[index].isSelected = true;
    setTabItem(tabData)
    setTabSelectedIndex(index);
  };

  const renderTabBarComponent = () => (
    <TabBarComponent tabItem={tabItem} onPressTabItem={onPressTabItem} style={styles.tabBarStyle} />
  );

  const tabContent = () => {
    switch (tabSelectedIndex) {
      case 1:
        return renderPassword();
      default:
        return renderUserDetails();
    }
  };

  const EditIcon = () => (
    <>
      {getSvgImages({ name: ImagesName.editIcon, width: styles.dpEditIcon.width, height: styles.dpEditIcon.height })}
    </>
  )

  const UserIcon = () => (
    <>
      {getSvgImages({ name: ImagesName.userDefaultIcon, width: styles.dpDefaultIcon.width, height: styles.dpDefaultIcon.height, style: styles.dpDefaultIcon })}
    </>
  )

  const DropDownIcon = () => (
    <>
      {getSvgImages({ name: ImagesName.dropDownIcon, width: styles.dropDownIcon.width, height: styles.dropDownIcon.height, style: styles.dropDownIcon })}
    </>
  )
  const onpressConfirm = () => {
    sendUserProfileInfo({
      email: email,
      first_name: name ?? '',
      birthday: selectedDate.toString() != t('profile.userDetail.selectBirthdayText')? getFormatedDate(date) : (userProfileData.user?.birthday ? getFormatedDate(userProfileData.user?.birthday): '' ),
      occupation: occupation ?? ''
    })        
    setUserName(name)
  }

  const renderUserDetails = () => (
    <KeyboardAwareView extraKeyboardOffset={isIOS ? 750 : 0}>
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <View style={styles.dpContainer}>
            <TouchableOpacity onPress={()=> setModalVisible(true)}>
            <View style={styles.dpEditContainer}>
              <EditIcon />
            </View>
            </TouchableOpacity>
            {userProfileImage ?  <Image style={styles.dpDefaultIcon} source={{uri:userProfileImage}} /> : <UserIcon />}
          </View>
          <View style={styles.emailContainer}>
            <Label style={styles.emailTitle} color={colors.greenishBlue} children={userName? userName : t('profile.userDetail.userNameTitle')} />
            <Label style={styles.email} children={email} />
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <Label style={styles.nameTitle} color={colors.greenishBlue} children={t('profile.userDetail.nameTitle')} />
          <TextInputField placeholder={t('profile.userDetail.nameTitle')}
            testID={'profile_name'}
            onChangeText={setName}
            value={name}
            style={styles.nameInputStyle}
            isMandatory
            maxLength={20}
            leftIcon={() => <UserTextFieldIcon fill={themeData.textColor} />}
          />   
          <View>
            <Label style={styles.birthdayTitle} color={colors.greenishBlue} children={t('profile.userDetail.birthdayTitle')} />
            <DatePicker
              locale='ar'
              maximumDate={new Date(currentDate)}
              cancelText={t('profile.userDetail.cancelText')}
              confirmText={t('profile.userDetail.confirmText')}
              modal
              open={open}
              date={date}
              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                setSelectedDate(getFullDate(date))
                setBirthday('')
              }}
              onCancel={() => {
                setOpen(false)
              }}
              mode={'date'}
              title={t('profile.userDetail.selectTheDate')}
              theme={isDarkMode? 'dark' : 'light'}
              textColor={isIOS? themeData.textInputColor: colors.black}
            />
            <TouchableOpacity onPress={() => setOpen(true)}>
              <View style={styles.dropDownContainer}>
                <View>
                  <Label children={birthday != '' ? birthday : selectedDate.toString()}
                    style={[styles.dropDownLabel,
                    selectedDate.toString() == t('profile.userDetail.selectBirthdayText') && styles.dropDownLabelPlaceholder]} />
                </View>
                <DropDownIcon />
              </View>
            </TouchableOpacity>
          </View>
          <Label style={styles.occupationTitle} color={colors.greenishBlue} children={t('profile.userDetail.occupationTitle')} />
          <TextInputField placeholder={t('profile.userDetail.occupationPlaceholder')}
            testID={'profile_occupation'}
            onChangeText={setOccupation}
            maxLength={20}
            value={occupation}
            style={styles.nameInputStyle}
          />
        </View>
        <ButtonOutline
          style={styles.updateButton}
          labelStyle={styles.updateButtonLabel} title={t('profile.userDetail.updateButtonText')}
          onPress={onpressConfirm} />
      </View>
    </KeyboardAwareView>
  )

  const renderPassword = () => (
    <View style={styles.container}>
      <TextInputField placeholder={t('profile.userDetail.oldPassword')}
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
      <TextInputField placeholder={t('profile.userDetail.newPassword')}
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
      <TextInputField placeholder={t('profile.userDetail.confirmNewPassword')}
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
      <View style={styles.updateButtonContainer} >
        <ButtonOutline
          style={styles.updateButton}
          labelStyle={styles.updateButtonLabel}
          title={t('profile.userDetail.updateButtonText')}
          onPress={onChangePasswordUpdate}
        />
      </View>
    </View>
  )

  const onChangePasswordUpdate = () => {
    setOldPasswordError(loginPasswordValidation(oldPassword));
    setNewPasswordError(loginPasswordValidation(newPassword));
    setConfirmNewPasswordError(reTypePasswordValidation(newPassword, confirmNewPassword));
  };

  const renderOptionModal = () => (

      <Modal visible={isModalVisible} animationType={'slide'} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.optionModalContainer}>
          <View style={styles.overlayStyle}>
            <View style={styles.optionContainer}>
              <TouchableOpacity testID={'camera_option'} onPress={onClickOpenCamera} >
                <View style={styles.optionStyle}>
                  <Label style={styles.optionTextStyle} children={t('profile.userDetail.openCameraOption')} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity testID={'gallery_option'} onPress={() => openGallery()} >
                <View style={styles.optionStyle}>
                  <Label style={styles.optionTextStyle} children={t('profile.userDetail.chooseFromGallery')} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.cancelContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View style={styles.cancelStyle}>
                  <Label style={styles.cancelTextStyle} children={t('profile.userDetail.cancelText')} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  );

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.6,
      cropperToolbarTitle: t('profile.userDetail.moveAndScale')
    }).then(image => {
      uploadImage(image)
    })
  };

  const openCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.6,
      cropperToolbarTitle: t('profile.userDetail.moveAndScale')
    }).then(image => {
      uploadImage(image)
    })
  };

  const onClickOpenCamera = async () => {
    if (isIOS) {
      openCamera()
    } else {
      const hasPermission = await SystemPermissions.hasCameraPermission()
      if (hasPermission) {
        openCamera()
      } else {
        const hasPermissionGranted = await SystemPermissions.requestCameraPermission()
        hasPermissionGranted ? openCamera() : CustomAlert({
          title: REQUIRE_ACCESS,
          message: REQUEST_CAMERA_ACCESS_MESSAGE,
        })
      }
    }
  }
  
  const uploadImage = (image:any) => {
    const payload: UpdateUserImageBodyType = {
      image:image.path,
    };
    setModalVisible(false);
    setProfileImage(image);
    setUserProfileImage(image.path);
    updateUserImageRequest(payload);
  }

  return (
    <ScreenContainer isOverlayLoading={isLoading}>
      {renderOptionModal()}
      {renderTabBarComponent()}
      {tabContent()}
    </ScreenContainer>
  );
};

const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: '20%',
      marginHorizontal: '10%',
    },
    userContainer: {
      flexDirection: 'row',
      width: '100%',
      paddingVertical: '2%'
    },
    dpContainer: {
      backgroundColor: colors.cyanGreen,
      width: normalize(76),
      height: normalize(76),
      borderRadius: normalize(76) / 2,
    },
    dpEditContainer: {
      zIndex: 999,
      backgroundColor: 'white',
      position: 'absolute',
      left: 2,
      top: 0,
      width: normalize(21),
      height: normalize(21),
      borderRadius: normalize(21) / 2,
      alignItems: 'center',
      justifyContent: 'center'
    },
    dpEditIcon: {
      width: normalize(11),
      height: normalize(11),
    },
    dpDefaultIcon: {
      zIndex: -4,
      width: normalize(76),
      height: normalize(76),
      borderRadius: normalize(76) / 2
    },
    emailContainer: {
      marginLeft: '5%',
      justifyContent: 'center'
    },
    emailTitle: {
      fontSize: normalize(13),
      fontWeight: 'bold',
      lineHeight: normalize(17),
      marginBottom: '6%',
      textAlign: 'left'
    },
    email: {
      fontSize: normalize(12),
      lineHeight: normalize(17),
      textAlign: 'left',
      color: theme.textInputColor
    },
    fieldContainer: {
      marginVertical: '10%'
    },
    nameTitle: {
      fontSize: normalize(13),
      lineHeight: normalize(17),
      marginBottom: '2%',
      textAlign: 'left'
    },
    birthdayTitle: {
      fontSize: normalize(13),
      lineHeight: normalize(17),
      marginBottom: '2%',
      marginTop: '2%',
      textAlign: 'left'
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
      paddingHorizontal: normalize(10)
    },
    dropDownLabel: {
      fontSize: normalize(14),
      lineHeight: 21,
      marginLeft: '3%',
      color: theme.textInputColor,
    },
    dropDownIcon: {
      width: normalize(15),
      height: normalize(15),
      position: 'absolute',
      right: 15
    },
    dropDownLabelPlaceholder: {
      color: theme.dropDownLabelColor,
    },
    occupationTitle: {
      fontSize: normalize(13),
      lineHeight: normalize(17),
      marginTop: '10%',
      marginBottom: '2%',
      textAlign: 'left'
    },
    nameInputStyle: {
      width: '100%',
      color: theme.primaryLightGray,
    },
    tabBarStyle: {
      borderBottomColor: colors.gableGreen,
      borderBottomWidth: 1.2
    },
    inputStyle: {
      width: '100%',
      color: theme.primaryLightGray,
    },
    updateButtonContainer: {
      marginTop: '10%'
    },
    updateButton: {
      width: '60%',
      alignSelf: 'center',
      backgroundColor: colors.greenishBlue,
      borderWidth: 0,
    },
    updateButtonLabel: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: normalize(16)
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
      fontWeight: 'bold',
      fontSize: normalize(16),
      lineHeight: 20,
    },
    optionStyle: {
      backgroundColor: colors.transparent,
      paddingVertical: normalize(15)
    },
    optionTextStyle: {
      textAlign: 'center',
      fontSize: normalize(16),
      lineHeight: 20,
      fontWeight: 'bold',
      color: theme.secondaryDarkSlate,
    },
    optionModalContainer: {
      backgroundColor: colors.blackOpacity95,
      width: screenWidth,
      height: screenHeight
    }
  })
