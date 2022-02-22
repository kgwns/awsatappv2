import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ScreensConstants} from '../constants/ScreenConstants';
import {Routes} from './index';
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const hideHeader = {
  headerShown: false,
}

const AppNavigator = () => {
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
    </Stack.Navigator>
  );
};

export default AppNavigator;
