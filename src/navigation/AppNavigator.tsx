import 'react-native-gesture-handler';
import React from 'react';
import { Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
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
import {isAndroid, isIOS, isTab, normalize, screenWidth} from 'src/shared/utils';
import {getSvgImages} from 'src/shared/styles/svgImages';
import { HeaderConstants } from '../constants/HeaderConstants'; 
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants';
import { fonts } from 'src/shared/styles/fonts'
import { createStackNavigator } from '@react-navigation/stack';

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
        options={{...hideHeader, animationEnabled: false}}
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
          headerShadowVisible: false,
          gestureEnabled: false
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
          headerTitle: () => HeaderTitle(HeaderConstants.USER_DETAIL_HEADER_TITLE),
          headerTitleStyle: style.headerTitle,
          headerTitleAlign: 'center',
          headerShadowVisible: false
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
          gestureEnabled: false,
          headerShadowVisible: false
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
          gestureEnabled: false,
          headerShadowVisible: false,
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
          gestureEnabled: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={ScreensConstants.NEWS_LETTER_SCREEN}
        component={Routes.NewsLetterScreen}
        options={{
          headerStyle: style.container,
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(t('profileSetting.myNewsLetter')),
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name={ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN}
        component={Routes.KeepNotifiedScreen}
        options={{
          headerStyle: style.container,
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(t('profileSetting.manageMyNotification')),
          headerTitleAlign: 'center',
          headerShadowVisible: false
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
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name={ScreensConstants.PDFArchive}
        component={Routes.PDFArchive}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.PDF_EDITOR_VIEW}
        component={Routes.PDFEditorView}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.CONTACT_US_SCREEN}
        component={Routes.ContactUs}
        options={hideHeader}
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
      height: 32,
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
      marginEnd: isTab ? normalize(0.03 * screenWidth) : normalize(0.05 * screenWidth),
      marginTop: isIOS ? 3 : 1,
    },
    onBoardPrevTitle: {
      color: theme.primaryDarkSlateGray,
      fontSize: isTab ? 16 : 12,
      lineHeight: 30,
      fontFamily: fonts.AwsatDigitalBetav10_Regular,
    },
    onBoardPrevIcon: {
      width: isTab ? 14 : 12,
      height: isTab ? 10.8 : 8.8,
      marginEnd: 5,
      marginTop: isAndroid ? 2 : 0
    },
    headerTitle:{
      fontSize: 24,
      lineHeight: 50,
      color:theme.primaryDarkSlateGray,
      fontFamily: fonts.IBMPlexSansArabic_Bold,
    }
  })
)
