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
import { isIOS, isTab, normalize, recordCurrentScreen } from 'src/shared/utils';

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

                const getIconStyle = () : any  => {
                    let iconStyle:any = TabNavigatorStyle.tabIcon ;
                    switch (route.name) {
                        case TabConstants.LATEST_NEWS:
                            iconStyle = TabNavigatorStyle.latestNewsIcon
                            break;
                        case TabConstants.SECTIONS:
                            iconStyle = TabNavigatorStyle.sectionsIcon
                            break;
                        case TabConstants.MOST_READ:
                            iconStyle = TabNavigatorStyle.mostReadIcon
                            break;
                        case TabConstants.FAVORITE:
                            iconStyle = TabNavigatorStyle.favoriteIcon
                            break;
                    }
                    return iconStyle;
                }

                const iconStyle = getIconStyle();
                return (
                    <View key={index}>
                        <TouchableOpacity
                            key={index}
                            onPress={() => onPress()}>
                            <View style={TabNavigatorStyle.tabIconContainer}>
                                {(getSvgImages({ name: getImageName(), width: iconStyle.width, height: iconStyle.height , style: iconStyle}))}
                            </View>
                            <Label color={isFocused ? colors.greenishBlue : colors.lightToneGreen} labelType={'label10'}>{route.name}</Label>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
};

const TabNavigatorStyle = StyleSheet.create({
    bottomBar: {
        width: "100%",
        height: isTab ? 93 : 80,
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingTop: isTab ? 20 : 15,
        borderColor: "transparent",
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: .1,
        shadowRadius: 4,  
        elevation: 15
    },
    tabIconContainer: {
        height: isTab ? 29 : 24,
        alignItems: "center",
        alignSelf: "center",
        marginBottom: normalize(2)
    },
    tabIcon: {
        width: 20,
        height: 20
    },
    favoriteIcon: {
        width: normalize(12),
        height: normalize(17),
        marginTop: isIOS ? normalize(2) : normalize(5)
    },
    mostReadIcon: {
        width: normalize(17),
        height: normalize(22)
    },
    sectionsIcon: {
        width: normalize(20),
        height: normalize(20)
    },
    latestNewsIcon: {
        width: normalize(18),
        height: normalize(21)
    }
});

export default TabNavigator;