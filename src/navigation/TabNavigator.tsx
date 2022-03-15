import React, { FunctionComponent } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
    createBottomTabNavigator,
    BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import analytics from '@react-native-firebase/analytics';
import { useTranslation } from 'react-i18next';
import { TabConstants } from '../constants/TabConstants';
import { Label } from '../components/atoms';
import { Routes, ScreenName } from '../navigation/';
import { colors } from '../shared/styles/colors';
import { ImagesName } from 'src/shared/styles/images';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { recordCurrentScreen } from 'src/shared/utils';

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
    const { themeData } = useTheme()
    return (
        <View style={[TabNavigatorStyle.bottomBar, { backgroundColor: themeData.secondaryWhite }]}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                

                const onPress = async () => {
                    if (!isFocused) {
                        navigation.navigate(route.name);
                        recordCurrentScreen(route.name);
                    }
                };

                const getImageName = () : ImagesName  => {
                    let ImageName:ImagesName = ImagesName.newsIcon ;
                    switch (route.name) {
                        case TabConstants.LATEST_NEWS:
                            ImageName = isFocused ? ImagesName.newsActiveIcon : ImagesName.newsIcon
                            break;
                        case TabConstants.SECTIONS:
                            ImageName = isFocused ? ImagesName.sectionsActiveIcon : ImagesName.sectionsIcon
                            break;
                        case TabConstants.MOST_READ:
                            ImageName = isFocused ? ImagesName.mostReadActiveIcon : ImagesName.mostReadIcon
                            break;
                        case TabConstants.FAVORITE:
                            ImageName = isFocused ? ImagesName.favoriteActiveIcon : ImagesName.favoriteIcon
                            break;
                    }
                    return ImageName;
                }

                return (
                    <View key={index}>
                        <TouchableOpacity
                            key={index}
                            onPress={() => onPress()}>
                            <View style={TabNavigatorStyle.tabIconContainer}>
                                {(getSvgImages({ name: getImageName(), width: TabNavigatorStyle.tabIcon.width, height: TabNavigatorStyle.tabIcon.height }))}
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