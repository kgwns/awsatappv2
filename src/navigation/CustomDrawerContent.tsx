import React, {useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {ImagesName} from '../shared/styles/images';
import {ButtonImage, Image} from '../components/atoms';
import {ButtonList, Divider, ButtonOutline} from 'src/components/atoms';
import {useTranslation} from 'react-i18next';
import {normalize} from 'src/shared/utils';
import CloseIcon from 'src/assets/images/icons/close.svg';
import UserIcon from 'src/assets/images/icons/user.svg';
import FacebookIcon from 'src/assets/images/icons/facebook.svg';
import InstagramIcon from 'src/assets/images/icons/instagram.svg';
import YoutubeIcon from 'src/assets/images/icons/youtube.svg';
import TwitterIcon from 'src/assets/images/icons/twitter.svg';
import LinkedinIcon from 'src/assets/images/icons/linkedin.svg';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {flatListUniqueKey, ScreensConstants} from 'src/constants';
import {useSideMenu} from 'src/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import { ABOUT_US, TERMS_AND_CONDITION } from 'src/services/apiEndPoints';

interface CustomDrawerContentProps {}

const CustomDrawerContent = (props: CustomDrawerContentProps) => {
  const [t] = useTranslation();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const {themeData} = useTheme();
  const styles = useThemeAwareObject(createStyles);

  const {isLoading, sideMenuData, fetchSideMenuRequest} =
  useSideMenu();

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

  const header = () => (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} name={ImagesName.headerLogo} />
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
            sideMenuData.map((item) => {
              return (
                <ButtonList
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
              { title: t('terms_and_condition'), id: TERMS_AND_CONDITION }
            )}
            titleStyle={styles.nonBoldTitle}
          />
          <ButtonList
            title={t('drawer.aboutTheEast')}
            onPress={() => onPressNavigation(
              ScreensConstants.TERMS_AND_ABOUT_US,
              { title: t('about_the_news_paper'), id: ABOUT_US }
            )}
            titleStyle={styles.nonBoldTitle}
          />
          <ButtonList
            title={t('drawer.callUs')}
            onPress={() => console.log('clicked')}
            titleStyle={styles.nonBoldTitle}
          />
          <ButtonOutline
            title={t('drawer.myPersonalAccount')}
            leftIcon={() => <UserIcon fill={themeData.primaryDarkSlateGray} />}
            color={themeData.primaryDarkSlateGray}
          />
          <View style={styles.socialContainer}>
            <ButtonImage
              icon={() => <LinkedinIcon />}
              onPress={() => console.log('linkedin')}
            />
            <ButtonImage
              icon={() => <TwitterIcon />}
              onPress={() => console.log('twitter')}
            />
            <ButtonImage
              icon={() => <FacebookIcon />}
              onPress={() => console.log('facebook')}
            />
            <ButtonImage
              icon={() => <YoutubeIcon />}
              onPress={() => console.log('youtube')}
            />
            <ButtonImage
              icon={() => <InstagramIcon />}
              onPress={() => console.log('instagram')}
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
    menuContainer: {
      marginHorizontal: normalize(35),
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
