import React, { FunctionComponent } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
    createBottomTabNavigator,
    BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { TabConstants } from '../constants/TabConstants';
import { Image, Label } from '../components/atoms';
import { Routes, ScreenName } from '../navigation/';
import { colors } from '../shared/styles/colors';
import { ImageName } from '~/shared/styles/images';

const Tab = createBottomTabNavigator<ScreenName>();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen name={TabConstants.LATEST_NEWS} component={Routes.LatestNewsScreen} />
            <Tab.Screen name={TabConstants.SECTIONS} component={Routes.SectionsScreen} />
            <Tab.Screen name={TabConstants.MOST_READ} component={Routes.MostReadScreen} />
            <Tab.Screen name={TabConstants.FAVORITE} component={Routes.FavoriteScreen} />
        </Tab.Navigator>
    );
};

const CustomTabBar: FunctionComponent<BottomTabBarProps> = ({
    state,
    navigation,
}) => {
    const [t] = useTranslation();
    return (
        <View style={TabNavigatorStyle.bottomBar}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    if (!isFocused) {
                        navigation.navigate(route.name);
                    }
                };

                const getImageIcon = () : ImageName | undefined => {
                    let imageSource;
                    switch (route.name) {
                        case TabConstants.LATEST_NEWS:
                            imageSource = isFocused ? TabConstants.TABICONS.NEWS_ACTIVE : TabConstants.TABICONS.NEWS
                            break;
                        case TabConstants.SECTIONS:
                            imageSource = isFocused ? TabConstants.TABICONS.SECTIONS_ACTIVE : TabConstants.TABICONS.SECTIONS
                            break;
                        case TabConstants.MOST_READ:
                            imageSource = isFocused ? TabConstants.TABICONS.MOST_READ_ACTIVE : TabConstants.TABICONS.MOST_READ
                            break;
                        case TabConstants.FAVORITE:
                            imageSource = isFocused ? TabConstants.TABICONS.FAVORITE_ACTIVE : TabConstants.TABICONS.FAVORITE
                            break;
                    }
                    return imageSource;
                }

                return (
                    <View key={index}>
                        <TouchableOpacity
                            key={index}
                            onPress={() => onPress()}>
                            <View style={TabNavigatorStyle.tabIconContainer}>
                                <Image
                                    resizeMode='contain'
                                    name={getImageIcon()}
                                    style={TabNavigatorStyle.tabIcon}
                                />
                            </View>
                        </TouchableOpacity>
                        <Label color={isFocused ? colors.greenishBlue : colors.lightToneGreen} labelType={'label10'}>{route.name}</Label>
                    </View>
                );
            })}
        </View>
    );
};

const TabNavigatorStyle = StyleSheet.create({
    bottomBar: {
        width: "100%",
        height: 80,
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingTop: 10,
    },
    tabIconContainer: {
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 10
    },
    tabIcon: {
        width: 25,
        height: 25
    }
});

export default TabNavigator;