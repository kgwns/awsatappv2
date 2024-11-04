import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import { ScreensConstants } from '../constants/Constants';
import { Routes } from './index';
import DrawerNavigator from './DrawerNavigator';
import { ImagesName } from 'src/shared/styles';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { Label } from 'src/components/atoms';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { isAndroid, isIOS, isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { fonts } from 'src/shared/styles/fonts'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useAds } from 'src/hooks/useAds';

const Stack = createStackNavigator();

const hideHeader = {
  headerShown: false,
}


const AppNavigator = () => {
  const navigation = useNavigation();
  const routes = useNavigationState((state) => state.routes)
  const params = isNonEmptyArray(routes) && routes[0].params ? routes[0].params : {}
  const style = useThemeAwareObject(customStyle);
  const transition = isIOS && TransitionPresets.SlideFromRightIOS


  const PROFILE_SETTING_ARITHMETIC = TranslateConstants({key:TranslateKey.PROFILE_SETTING_ARITHMETIC})
  const PROFILE_USER_DETAIL_TITLE = TranslateConstants({key:TranslateKey.PROFILE_USER_DETAIL_TITLE})
  const MANAGE_MY_NEWS_HEADER = TranslateConstants({key:TranslateKey.MANAGE_MY_NEWS_HEADER})
  const ON_BOARD_COMMON_RETURN = TranslateConstants({key:TranslateKey.ON_BOARD_COMMON_RETURN})
  const PROFILE_SETTING_MY_NEWS_LETTER = TranslateConstants({key:TranslateKey.PROFILE_SETTING_MY_NEWS_LETTER})
  const PROFILE_SETTING_MANAGE_MY_NOTIFICATION = TranslateConstants({key:TranslateKey.PROFILE_SETTING_MANAGE_MY_NOTIFICATION})
  const DELETE_MY_ACCOUNT = TranslateConstants({key:TranslateKey.PROFILE_SETTING_DELETE_MY_ACCOUNT})
  
  const previousIconStyle = style.onBoardPrevIcon;

  const HeaderLogo = () => getSvgImages({ name: ImagesName.headerLogo, width: style.logo.width, height: style.logo.height, style: style.logo });

  const HeaderTitle = (title: string) => <Label style={style.headerTitle}>{title}</Label>;
  
  const {loadAppOpenAd} = useAds();
  useEffect(() => {
    loadAppOpenAd();
  }, []);

  const onBoardReturn = () => (
    <TouchableOpacity
      style={style.onBoardReturn}
      onPress={() => {
        Keyboard.dismiss()
        navigation.goBack()
      }}>
      <Label style={style.onBoardPrevTitle}>{ON_BOARD_COMMON_RETURN}</Label>
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
        initialParams={params}
      />
      <Stack.Screen
        name={ScreensConstants.SearchScreen}
        component={Routes.SearchScreen}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.ARTICLE_DETAIL_SCREEN}
        component={Routes.ArticleDetailScreen}
        options={{
          ...transition,
          headerShown: false,
        }}
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
        name={ScreensConstants.PODCAST_EPISODE_MODAL}
        component={Routes.PodcastEpisodeModal}
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
          headerStyle: [style.container, style.profileBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(PROFILE_SETTING_ARITHMETIC),
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
          headerStyle: [style.container, style.profileBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(PROFILE_USER_DETAIL_TITLE),
          headerTitleStyle: style.headerTitle,
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name={ScreensConstants.WEATHER_DETAIL_SCREEN}
        component={Routes.WeatherDetailScreen}
        options={{
          headerStyle: [style.container, style.weatherScreenBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderLogo(),
          headerTitleStyle: style.headerTitle,
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name={ScreensConstants.MANAGE_MY_NEWS_SCREEN}
        component={Routes.ManageMyNewsScreen}
        options={{
          headerStyle: [style.container, style.profileBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(MANAGE_MY_NEWS_HEADER),
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name={ScreensConstants.VideoPlayerScreen}
        component={Routes.VideoPlayerScreen}
        options={{ ...hideHeader, animationEnabled: false }}
      />
      <Stack.Screen
        name={ScreensConstants.VideoScreen}
        component={Routes.VideoScreen}
        options={{
          headerStyle: [style.container, style.onboardBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle('فيديو'),
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={ScreensConstants.MANAGE_MY_FAVORITE_AUTHOR_SCREEN}
        component={Routes.ManageMyFavoriteAuthorScreen}
        options={{
          headerStyle: [style.container, style.onboardBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(MANAGE_MY_NEWS_HEADER),
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={ScreensConstants.MANAGE_MY_FAVORITE_TOPICS_SCREEN}
        component={Routes.ManageMyFavoriteTopicsScreen}
        options={{
          headerStyle: [style.container, style.onboardBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(MANAGE_MY_NEWS_HEADER),
          headerTitleAlign: 'center',
          gestureEnabled: false,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={ScreensConstants.NEWS_LETTER_SCREEN}
        component={Routes.NewsLetterScreen}
        options={{
          headerStyle: [style.container, style.profileBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(PROFILE_SETTING_MY_NEWS_LETTER),
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name={ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN}
        component={Routes.KeepNotifiedScreen}
        options={{
          headerStyle: [style.container, style.profileBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(PROFILE_SETTING_MANAGE_MY_NOTIFICATION),
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
        name={ScreensConstants.JOURNALIST_DETAIL_SCREEN}
        component={Routes.JournalistDetail}
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
          headerStyle: [style.container, style.gameScreenBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(TranslateConstants({ key: TranslateKey.GAMES })),
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={ScreensConstants.DYNAMIC_GAME_SCREEN}
        component={Routes.DynamicGameScreen}
        options={{
          headerStyle: [style.container, style.gameScreenBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(TranslateConstants({ key: TranslateKey.GAMES })),
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
      <Stack.Screen
        name={ScreensConstants.PHOTO_GALLERY_DETAIL_SCREEN}
        component={Routes.PhotoGalleryDetailScreen}
        options={{ ...hideHeader, animationEnabled: isAndroid }}
      />
      <Stack.Screen
        name={ScreensConstants.DMA_INTRODUCTION_SCREEN}
        component={Routes.DMAIntroductionScreen}
        options={{
          headerStyle: [style.container, style.profileBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(DELETE_MY_ACCOUNT),
          headerTitleStyle: style.headerTitle,
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name={ScreensConstants.DMA_OPTIONS_LIST_SCREEN}
        component={Routes.DMAOptionsListScreen}
        options={{
          headerStyle: [style.container, style.profileBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(DELETE_MY_ACCOUNT),
          headerTitleStyle: style.headerTitle,
          headerTitleAlign: 'center',
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name={ScreensConstants.DMA_FEED_BACK_SCREEN}
        component={Routes.DMAFeedbackScreen}
        options={{
          headerStyle: [style.container, style.profileBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(DELETE_MY_ACCOUNT),
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={ScreensConstants.DMA_DELETE_ACCOUNT_SCREEN}
        component={Routes.DMADeleteAccountScreen}
        options={{
          headerStyle: [style.container, style.profileBackground],
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(DELETE_MY_ACCOUNT),
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={ScreensConstants.CartoonListScreen}
        component={Routes.CartoonList}
        options={hideHeader}
      />
      <Stack.Screen
        name={ScreensConstants.EntityQueueListScreen}
        component={Routes.EntityQueueListScreen}
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
      fontFamily: fonts.AwsatDigital_Regular,
    },
    onBoardPrevIcon: {
      width: isTab ? 14 : 12,
      height: isTab ? 10.8 : 8.8,
      marginEnd: 5,
      marginTop: isAndroid ? 2 : 0
    },
    headerTitle: {
      fontSize: 24,
      lineHeight: 50,
      color: theme.primaryDarkSlateGray,
      fontFamily: fonts.IBMPlexSansArabic_Bold,
    },
    gameScreenBackground: {
      backgroundColor: theme.gameBackground
    },
    weatherScreenBackground: {
      backgroundColor: theme.tabBarBackground
    },
    profileBackground: {
      backgroundColor: theme.profileBackground
    },
    onboardBackground: {
      backgroundColor: theme.profileBackground
    }
  })
)
