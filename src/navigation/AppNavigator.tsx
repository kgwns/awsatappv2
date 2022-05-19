import 'react-native-gesture-handler';
import React from 'react';
import { Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreensConstants } from '../constants/ScreenConstants';
import { Routes } from './index';
import DrawerNavigator from './DrawerNavigator';
import { ImagesName } from 'src/shared/styles';
import {colors, CustomThemeType} from 'src/shared/styles/colors';
import {useTheme} from 'src/shared/styles/ThemeProvider';
import {Label} from 'src/components/atoms';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import {isTab, normalize, screenWidth} from 'src/shared/utils';
import {getSvgImages} from 'src/shared/styles/svgImages';
import { HeaderConstants } from '../constants/HeaderConstants'; 
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants';
import { fonts } from 'src/shared/styles/fonts'

const Stack = createStackNavigator();

const hideHeader = {
  headerShown: false,
}

const AppNavigator = () => {
  const { themeData } = useTheme();
  const navigation = useNavigation();
  const style = useThemeAwareObject(customStyle)


  const [t] = useTranslation();
  const previousIconStyle = style.onBoardPrevIcon;

  const Search = () => (
    <TouchableOpacity onPress={() => navigation.navigate(ScreensConstants.SearchScreen)}>
      {getSvgImages({ name: ImagesName.searchIcon, width: style.search.width, height: style.search.height, style: style.search })}
    </TouchableOpacity>
  )

  const HeaderLogo = () => getSvgImages({ name: ImagesName.headerLogo, width: style.logo.width, height: style.logo.height, style: style.logo });

  const Menu = () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      {getSvgImages({ name: ImagesName.menuIcon, width: style.menu.width, height: style.menu.height, style: style.menu })}
    </TouchableOpacity>
  )

  const HeaderTitle = (title: string) => <Label style={style.headerTitle}>{title}</Label>;

  const onBoardReturn = () => (
    <TouchableOpacity
      style={style.onBoardReturn}
      onPress={() => {
        Keyboard.dismiss()
        navigation.goBack()
         }}>
      <Label style={style.onBoardPrevTitle}>{t('onBoard.common.return')}</Label>
      {getSvgImages({
        name: ImagesName.returnGreenish,
        width: previousIconStyle.width,
        height: previousIconStyle.height,
        style: previousIconStyle,
      })}
    </TouchableOpacity>
  );

  return (
    <Stack.Navigator initialRouteName={ScreensConstants.LatestNewsScreen}
      screenOptions={({ navigation }) => {
        return {
          detachPreviousScreen: !navigation.isFocused(),
        }
      }}>
      <Stack.Screen
        name={ScreensConstants.HOME_SCREEN}
        component={DrawerNavigator}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.SearchScreen}
        component={Routes.SearchScreen}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.ARTICLE_DETAIL_SCREEN}
        component={Routes.ArticleDetailScreen}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.PodcastProgram}
        component={Routes.PodcastProgram}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.StoryScreen}
        component={Routes.StoryScreen}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.PodcastEpisode}
        component={Routes.PodcastEpisode}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.SectionArticlesScreen}
        component={Routes.SectionArticlesScreen}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.VideoDetailScreen}
        component={Routes.VideoDetailScreen}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.TERMS_AND_ABOUT_US}
        component={Routes.TermsAndAboutUs}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.PROFILE_SETTING}
        component={Routes.ProfileSettings}
        options={{
          headerStyle: style.container,
          headerLeft: () => onBoardReturn(),
          headerTitle: ()=>HeaderTitle(t('profileSetting.arithmetic')),
          headerTitleAlign: 'center',
        }}
        />
      <Stack.Screen
        name={ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN}
        component={Routes.OpinionArticleDetail}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.USER_DETAIL_SCREEN}
        component={Routes.UserDetailScreen}
        options={{
          headerStyle: style.container,
          headerLeft: () => onBoardReturn(),
          headerTitle: HeaderConstants.USER_DETAIL_HEADER_TITLE,
          headerTitleStyle: style.headerTitle,
          headerTitleAlign: 'center',
        }}
      />
       <Stack.Screen
        name={ScreensConstants.MANAGE_MY_NEWS_SCREEN}
        component={Routes.ManageMyNewsScreen}
        options={{
          headerStyle: style.container,
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(t('manageMyNews.header')),
          headerTitleAlign: 'center',
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name={ScreensConstants.VideoPlayerScreen}
        component={Routes.VideoPlayerScreen}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.MANAGE_MY_FAVORITE_AUTHOR_SCREEN}
        component={Routes.ManageMyFavoriteAuthorScreen}
        options={{
          headerStyle: style.container,
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(t('manageMyNews.header')),
          headerTitleAlign: 'center',
          gestureEnabled: false
        }}
      />
         <Stack.Screen
        name={ScreensConstants.MANAGE_MY_FAVORITE_TOPICS_SCREEN}
        component={Routes.ManageMyFavoriteTopicsScreen}
        options={{
          headerStyle: style.container,
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(t('manageMyNews.header')),
          headerTitleAlign: 'center',
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name={ScreensConstants.NEWS_LETTER_SCREEN}
        component={Routes.NewsLetterScreen}
        options={{
          headerStyle: style.container,
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(t('profileSetting.myNewsLetter')),
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN}
        component={Routes.KeepNotifiedScreen}
        options={{
          headerStyle: style.container,
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(t('profileSetting.manageMyNotification')),
          headerTitleAlign: 'center'
        }}
      />
       <Stack.Screen
        name={ScreensConstants.WRITERS_DETAIL_SCREEN}
        component={Routes.WritersDetailScreen}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.SectionArticlesParentScreen}
        component={Routes.SectionArticlesParentScreen}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.GAME_SCREEN}
        component={Routes.GameScreen}
        options={{
          headerStyle: style.container,
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(TranslateConstants({key: TranslateKey.GAMES})),
          headerTitleAlign: 'center'
        }}
      />
        <Stack.Screen
        name={ScreensConstants.DYNAMIC_GAME_SCREEN}
        component={Routes.DynamicGameScreen}
        options={{
          headerStyle: style.container,
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(TranslateConstants({key: TranslateKey.GAMES})),
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const customStyle = (theme: CustomThemeType) => (
  StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      shadowColor: colors.transparent,
    },
    search: {
      height: 19,
      width: 18,
      marginHorizontal: normalize(20),
    },
    logo: {
      height: 23,
      width: 130,
      alignItems: 'center',
    },
    menu: {
      height: 16,
      width: 19,
      marginHorizontal: normalize(20),
    },
    onBoardReturn: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      marginEnd: isTab ? normalize(0.02 * screenWidth) : normalize(0.04 * screenWidth),
    },
    onBoardPrevTitle: {
      color: theme.primaryDarkSlateGray,
      fontSize: normalize(12),
      lineHeight: normalize(16),
      fontFamily: fonts.AwsatDigitalBetav10_Regular,
    },
    onBoardPrevIcon: {
      width: normalize(12),
      height: normalize(8.8),
      marginEnd: normalize(5),
    },
    headerTitle:{
      fontSize:normalize(24),
      lineHeight:normalize(50),
      color:theme.primaryDarkSlateGray,
      fontFamily: fonts.IBMPlexSansArabic_Bold,
    }
  })
)
