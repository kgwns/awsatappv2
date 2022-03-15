import React, {useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Linking} from 'react-native';
import {ImagesName} from '../shared/styles/images';
import {ButtonImage} from '../components/atoms';
import {ButtonList, Divider} from 'src/components/atoms';
import {useTranslation} from 'react-i18next';
import {isIOS, normalize} from 'src/shared/utils';
import CloseIcon from 'src/assets/images/icons/close.svg';
import FacebookIcon from 'src/assets/images/icons/facebook.svg';
import InstagramIcon from 'src/assets/images/icons/instagram.svg';
import YoutubeIcon from 'src/assets/images/icons/youtube.svg';
import TwitterIcon from 'src/assets/images/icons/twitter.svg';
import LinkedinIcon from 'src/assets/images/icons/linkedin.svg';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {ScreensConstants} from 'src/constants';
import {useLogin, useSideMenu} from 'src/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { ABOUT_US, ADVERTISE_INFO_ID, AWSATT_HISTORY_INFO_ID, TERMS_AND_CONDITION } from 'src/services/apiEndPoints';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { colors } from '../shared/styles/colors';
import { useUserProfileData } from 'src/hooks/useUserProfileData';
import { getProfileImageUrl } from 'src/shared/utils/utilities';
import { FACEBOOK_URL, INSTAGRAM_URL, LINKEDIN_URL, TWITTER_URL } from 'src/constants/SharedConstants';

interface CustomDrawerContentProps {}

const CustomDrawerContent = (props: CustomDrawerContentProps) => {
  const [t] = useTranslation();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const {themeData} = useTheme();
  const styles = useThemeAwareObject(createStyles);

  const {isLoading, sideMenuData, fetchSideMenuRequest} =
  useSideMenu();

  const {isLoggedIn} = useLogin();

  const {userProfileData} = useUserProfileData()
  
  useEffect(() => {
    fetchSideMenuRequest();
  }, []);

  const onPressNavigation = (screen: string,params: object) => {
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate(screen,params);
  }

  // useEffect(() => {
  //   //console.log('News Categories data', newsCategoriesData);
  // }, [newsCategoriesData]);

  const UserIcon = () => (
    <>
      {getSvgImages({ name: ImagesName.userDefaultIcon, width: styles.user.width, height: styles.user.height, style: styles.user })}
    </>
  )

  const header = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.headerLeft} onPress={() => {
        if(isLoggedIn){
          navigation.navigate(ScreensConstants.PROFILE_SETTING)
        }else{
          navigation.reset({
            index: 0,
            routes: [{ name: ScreensConstants.AuthNavigator }],
        });
        }
        
        }}>
        {useLogin().isLoggedIn && userProfileData.user?.image ? <Image style={styles.user} source={{uri: getProfileImageUrl(userProfileData.user?.image as string)}}/> : <UserIcon/>}  
        {/* {getSvgImages({ name: ImagesName.userDefaultIcon, width: styles.user.width, height: styles.user.height, style: styles.user })} */}
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        {getSvgImages({ name: ImagesName.headerLogo, width: styles.logo.width, height: styles.logo.height, style: styles.logo })}
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <CloseIcon fill={themeData.secondaryDarkSlate} />
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <SafeAreaView>
      {header()}
      <ScrollView bounces={false}>
        <View style={styles.menuContainer}>
          {sideMenuData.length > 0 &&
            sideMenuData.map((item,index) => {
              return (
                <ButtonList
                  key={index}
                  title={item.title}
                  onPress={() =>
                    onPressNavigation(ScreensConstants.SectionArticlesScreen,
                      { sectionId: item.field_sectionid_export, title: item.title })
                  }
                />
              );
            })}
          <Divider />
          <ButtonList
            title={t('drawer.advertiseWithUs')}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: t('drawer.advertiseWithUs'), id: ADVERTISE_INFO_ID }
            )}
            titleStyle={styles.nonBoldTitle}
          />
          <ButtonList
            title={t('drawer.aboutTheEast')}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: t('drawer.aboutTheEast'), id: AWSATT_HISTORY_INFO_ID }
            )}
            titleStyle={styles.nonBoldTitle}
          />
          <ButtonList
            title={t('drawer.callUs')}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: t('about_the_news_paper'), id: ABOUT_US }
            )}
            titleStyle={styles.nonBoldTitle}
          />
          <ButtonList
            title={t('drawer.termsOfUse')}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: t('terms_and_condition'), id: TERMS_AND_CONDITION }
            )}
            titleStyle={styles.nonBoldTitle}
          />
          <View style={styles.socialContainer}>
            <ButtonImage
              icon={() => <LinkedinIcon />}
              onPress={() => Linking.openURL(LINKEDIN_URL)}
            />
            <ButtonImage
              icon={() => <TwitterIcon />}
              onPress={() => Linking.openURL(TWITTER_URL)}
            />
            <ButtonImage
              icon={() => <FacebookIcon />}
              onPress={() => Linking.openURL(FACEBOOK_URL)}
            />
            <ButtonImage
              icon={() => <InstagramIcon />}
              onPress={() => Linking.openURL(INSTAGRAM_URL)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;
const createStyles = (theme: CustomThemeType) =>
  StyleSheet.create({
    headerContainer: {
      justifyContent: 'center',
    },
    socialContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: normalize(30),
    },
    headerRight: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      left: normalize(20),
    },
    headerLeft: {
      zIndex: 1,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      right: normalize(20),
      top : 0,
    },
    user: {
      width: normalize(27),
      height: normalize(27),
      borderRadius: normalize(27)/2,
      borderWidth: isIOS? normalize(2): normalize(3),
      borderColor: colors.lightGreenishBlue,
    },
    menuContainer: {
      marginHorizontal: normalize(35),
      marginTop: normalize(20),
    },
    drawerItemStyle: {
      left: 0,
      width: '100%',
    },
    logo: {
      height: normalize(30),
      width: normalize(140),
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
    },
    nonBoldTitle: {
      fontWeight: 'normal',
    },
  });
