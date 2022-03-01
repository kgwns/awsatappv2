import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { ScreensConstants } from '../constants/ScreenConstants';
import { Routes } from './index';
import DrawerNavigator from './DrawerNavigator';
import { TouchableOpacity } from 'react-native';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const hideHeader = {
  headerShown: false,
}

const AppNavigator = () => {
  const navigation = useNavigation();
  const style = useThemeAwareObject(customStyle)

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

  return (
    <Stack.Navigator initialRouteName={ScreensConstants.LatestNewsScreen}>
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
          headerLeft: Menu,
          headerTitle: HeaderLogo,
          headerTitleAlign: 'center',
          headerRight: Search,
        }}
        />
      <Stack.Screen
        name={ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN}
        component={Routes.OpinionArticleDetail}
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
      height: 20,
      width: 20,
      marginHorizontal: 20,
    },
    logo: {
      height: 30,
      width: 140,
      alignItems: 'center',
    },
    menu: {
      height: 22,
      width: 22,
      marginHorizontal: 20,
    },
  })
)
