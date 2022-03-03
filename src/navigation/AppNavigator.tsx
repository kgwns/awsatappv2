import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreensConstants } from '../constants/ScreenConstants';
import { Routes } from './index';
import DrawerNavigator from './DrawerNavigator';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { Label } from 'src/components/atoms';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { normalize } from 'src/shared/utils';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles';

const Stack = createStackNavigator();

const hideHeader = {
  headerShown: false,
}

const AppNavigator = () => {
  const { themeData } = useTheme();
  const navigation = useNavigation();
  const [t] = useTranslation();
  const style = useThemeAwareObject(customStyle);
  const previousIconStyle = style.onBoardPrevIcon;

  const HeaderTitle = (title: string) => <Label style={style.headerTitle}>{title}</Label>;

  const onBoardReturn = () => (
    <TouchableOpacity
      style={style.onBoardReturn}
      onPress={() => navigation.goBack()}>
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
        name={ScreensConstants.OPINION_ARTICLE_DETAIL_SCREEN}
        component={Routes.OpinionArticleDetail}
        options={hideHeader}
      />
       <Stack.Screen
        name={ScreensConstants.MANAGE_MY_NEWS_SCREEN}
        component={Routes.ManageMyNewsScreen}
        options={{
          headerStyle: style.container,
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(t('manageMyNews.header')),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={ScreensConstants.MANAGE_MY_FAVORITE_AUTHOR_SCREEN}
        component={Routes.ManageMyFavoriteAuthorScreen}
        options={{
          headerStyle: style.container,
          headerLeft: () => onBoardReturn(),
          headerTitle: () => HeaderTitle(t('manageMyNews.header')),
          headerTitleAlign: 'center',
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
        }}
      />
    </Stack.Navigator>
  );
};

const customStyle = (theme: CustomThemeType) => {
  const headerStyles = StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      shadowColor: colors.transparent,
    },
    onBoardReturn: {
      flexDirection: 'row-reverse',
      alignItems: 'center',
      marginEnd: normalize(10),
    },
    onBoardPrevTitle: {
      color: theme.primaryDarkSlateGray,
      fontSize: normalize(12),
      lineHeight: normalize(16),
    },
    onBoardPrevIcon: {
      width: normalize(12),
      height: normalize(8.8),
      marginEnd: normalize(5),
    },
    headerTitle:{
      fontSize:normalize(24),
      lineHeight:normalize(50),
      fontWeight:'bold',
      color:theme.primaryDarkSlateGray,
    }
  });
  return headerStyles;
};


export default AppNavigator;
