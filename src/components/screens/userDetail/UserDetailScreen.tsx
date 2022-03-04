import React, { FunctionComponent, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '..';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { isIOS, normalize } from '../../../shared/utils';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { useTranslation } from 'react-i18next';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles/images';
import { TextInputField, Label, ButtonOutline } from '../../atoms';
import UserTextFieldIcon from 'src/assets/images/icons/profile/userTextFieldIcon.svg';
import { getFullDate, getFormatedDate} from 'src/shared/utils/utilities';
import DatePicker from 'react-native-date-picker';
import { TabBarComponent, TabBarDataProps } from 'src/components/molecules';
import { KeyboardAwareView } from 'keyboard-aware-view';
import { loginPasswordValidation, reTypePasswordValidation } from 'src/shared/validators';
import { useUserProfileData } from 'src/hooks/useUserProfileData';
import { Image } from 'src/components/atoms';
import { StackNavigationProp } from '@react-navigation/stack';

export const UserDetailScreen: FunctionComponent = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()
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
  const { isLoading, userProfileData, sentUserProfileData ,fetchProfileDataRequest, sendUserProfileInfo } = useUserProfileData()
  const [userProfileImage, setUserProfileImage] = useState('') 
  const [birthday, setbirthday] = useState('')
  useEffect(() => {
    fetchProfileDataRequest();
  }, []);

  useEffect(() => {
    setEmail(userProfileData.user?.email as string)
    {setOccupation(userProfileData.user?.occupation? userProfileData.user?.occupation as string : occupation )}
    {userProfileData.user?.name && userProfileData.user?.name !== " " && setName(userProfileData.user?.name as string)}
    {userProfileData.user?.image && setUserProfileImage(userProfileData.user?.image as string)}
    {userProfileData.user?.birthday && setbirthday(getFullDate(userProfileData.user?.birthday))}
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
      birthday: selectedDate.toString() != t('profile.userDetail.selectBirthdayText')? getFormatedDate(date) : '',
      occupation: occupation ?? ''
    })        
    setUserName(name)
  }

  const renderUserDetails = () => (
    <KeyboardAwareView extraKeyboardOffset={isIOS ? 750 : 0}>
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <View style={styles.dpContainer}>
            <View style={styles.dpEditContainer}>
              <EditIcon />
            </View>
            {userProfileImage? 
            <Image url={userProfileImage} />:<UserIcon />}
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
            leftIcon={() => <UserTextFieldIcon fill={themeData.textColor} />}
          />
          <View>
            <Label style={styles.birthdayTitle} color={colors.greenishBlue} children={t('profile.userDetail.birthdayTitle')} />
            <DatePicker
              locale='ar'
              cancelText={t('profile.userDetail.cancelText')}
              confirmText={t('profile.userDetail.confirmText')}
              modal
              open={open}
              date={date}
              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                setSelectedDate(getFullDate(date))
                setbirthday('')
              }}
              onCancel={() => {
                setOpen(false)
              }}
              mode={'date'}
              title={t('profile.userDetail.selectTheDate')}
              textColor={themeData.textInputColor}
            />
            <TouchableOpacity onPress={() => setOpen(true)}>
              <View style={styles.dropDownContainer}>
                <View>
                  <Label children={birthday != ''? birthday : selectedDate.toString()}
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

  return (
    <ScreenContainer isOverlayLoading={isLoading}>
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
  })
