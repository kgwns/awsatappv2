import React, { FunctionComponent } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
    createBottomTabNavigator,
    BottomTabBarProps,
} from '@react-navigation/bottom-tabs';

import { TabConstants } from '../constants/Constants';
import { Label } from '../components/atoms';
import { Routes, ScreenName } from '../navigation/';
import { colors, CustomThemeType } from '../shared/styles/colors';
import { ImagesName } from 'src/shared/styles/images';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { isIOS, isNonEmptyArray, isTab, normalize, screenWidth } from 'src/shared/utils';
import {useThemeAwareObject} from 'src/shared/styles/useThemeAware';
import { useNavigation, useNavigationState, DrawerActions } from '@react-navigation/native';
import { ScreensConstants } from 'src/constants/Constants';
import { useOrientation } from 'src/hooks';
import { useInterstitial } from 'src/hooks/useInterstitial';

const Tab = createBottomTabNavigator<ScreenName>();

const TabNavigator = () => {
    const navigation = useNavigation();
    const route: any= useNavigationState((state) => state.routes)
    const isGoToMyNews = isNonEmptyArray(route) && route[0].params && route[0].params.isGoToMyNews
    const style = useThemeAwareObject(customStyle);

    const Search = () => (
        <TouchableOpacity onPress={() => navigation.navigate(ScreensConstants.SearchScreen)}>
            {getSvgImages({ name: ImagesName.searchIcon, width: style.search.width, height: style.search.height, style: style.search })}
        </TouchableOpacity>
    )

    const HeaderLogo = () => getSvgImages({ name: ImagesName.headerLogo, width: style.logo.width, height: style.logo.height, style: style.logo });

    const Menu = () => (
        <TouchableOpacity onPress={
            () => {
                navigation.dispatch(DrawerActions.toggleDrawer());
            }
        }>
            {getSvgImages({ name: ImagesName.menuIcon, width: style.menu.width, height: style.menu.height, style: style.menu })}
        </TouchableOpacity>
    )

    return (
        <Tab.Navigator screenOptions={{ 
            headerShown: true, 
            headerStyle: style.container,
            headerLeft: Menu,
            headerTitle: HeaderLogo,
            headerTitleAlign: 'center',
            headerRight: Search,
            }} initialRouteName={isGoToMyNews == true ? TabConstants.MY_NEWS :  TabConstants.LATEST_NEWS} tabBar={props => <CustomTabBar {...props} />}>
            <Tab.Screen name={TabConstants.LATEST_NEWS} component={Routes.SectionsScreen} options={{ headerShown: false }} />
            {/* <Tab.Screen name={TabConstants.SECTIONS} component={Routes.SectionsScreen} /> */}
            <Tab.Screen name={TabConstants.MY_NEWS} component={Routes.MyNewsScreen} />
            <Tab.Screen name={TabConstants.MOST_READ} component={Routes.MostReadScreen} />
            <Tab.Screen name={TabConstants.FAVORITE} component={Routes.FavoriteScreen} />
            <Tab.Screen name={TabConstants.DOWNLOAD_NEWS} component={Routes.DownloadNews} />
        </Tab.Navigator>
    );
};

const CustomTabBar: FunctionComponent<BottomTabBarProps> = ({
    state,
    navigation,
}) => {
    const { themeData } = useTheme()
    const style = useThemeAwareObject(customStyle);
    const {isPortrait} = useOrientation();
    const { showInterstitialAd } = useInterstitial();

    return (
        <View style={[style.bottomBar, { backgroundColor: themeData.primaryWhite }, isTab && !isPortrait && style.bottomBarLandscape]}>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;

                

                const onPress = async () => {
                    
                    if (!isFocused) {
                        navigation.navigate(route.name);
                        await showInterstitialAd();
                    }else{
                        global.refFlatList.current?.scrollToOffset({ offset: -100 })
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
                        case TabConstants.MY_NEWS:
                            ImageName =  isFocused ? ImagesName.myNewsActiveIcon : ImagesName.myNewsIcon
                            break;
                        case TabConstants.DOWNLOAD_NEWS:
                            ImageName = isFocused ? ImagesName.printVersionActiveIcon : ImagesName.printVersionGrayIcon
                    }
                    return ImageName;
                }

                const getIconStyle = () : any  => {
                    let tabIconStyle:any = style.tabIcon ;
                    switch (route.name) {
                        case TabConstants.LATEST_NEWS:
                            tabIconStyle = isTab ? style.tabLatestNewsIcon : style.latestNewsIcon
                            break;
                        case TabConstants.SECTIONS:
                            tabIconStyle = isTab ? style.tabSectionsIcon : style.sectionsIcon
                            break;
                        case TabConstants.MOST_READ:
                            tabIconStyle = isTab ? style.tabMostReadIcon : style.mostReadIcon
                            break;
                        case TabConstants.FAVORITE:
                            tabIconStyle = isTab ? style.tabFavoriteIcon : style.favoriteIcon
                            break;
                        case TabConstants.DOWNLOAD_NEWS:
                            tabIconStyle = isTab ? style.tabNewsIcon : style.newsIcon
                            break;
                        case TabConstants.MY_NEWS:
                            tabIconStyle = isTab ? style.tabMyNewsIconStyle : style.myNewsIconStyle
                            break;
                    }
                    return tabIconStyle;
                }

                const iconStyle = getIconStyle();
                return (
                    <View key={index}>
                        <TouchableOpacity
                            key={index}
                            onPress={() => onPress()}>
                            <View style={[style.tabIconContainer, isTab && !isPortrait && style.tabItemMargin]}>
                            {(getSvgImages({ name: getImageName(), width: iconStyle.width, height: iconStyle.height , style: iconStyle}))}
                            </View>
                            <Label color={isFocused ? colors.greenishBlue : colors.lightToneGreen} style={[isTab && !isPortrait && style.tabItemMargin,style.labelStyle]} labelType={'label10'}>{route.name}</Label>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
};

const customStyle = (theme: CustomThemeType) => {
    return StyleSheet.create({
        bottomBar: {
            width: "100%",
            height: isTab ? 93 : 80,
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingTop: isTab ? 20 : 15,
            borderColor: "transparent",
            shadowColor: theme.primaryBlack,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: .1,
            shadowRadius: 4,
            elevation: 15,
        },
        bottomBarLandscape: {
            justifyContent: 'center'
        },
        tabIconContainer: {
            height: isTab ? 29 : 24,
            alignItems: "center",
            alignSelf: "center",
            marginBottom: normalize(2),
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
        newsIcon: {
            width: normalize(31),
            height: normalize(22),
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
        },
        newsDownloadIconActive: {
            tintColor: colors.greenishBlue
        },
        newsDownloadIcon: {
            tintColor: colors.lightToneGreen
        },
        myNewsIconStyle: {
            width: normalize(26),
            height: normalize(22)
        },
        container: {
            backgroundColor: theme.tabBarBackground,
            shadowColor: colors.transparent,
        },
        search: {
            height: 19,
            width: 18,
            marginHorizontal: isTab ? 0.05 * screenWidth : 0.04 * screenWidth,
        },
        logo: {
            height: 32,
            width: 135,
            alignItems: 'center',
        },
        menu: {
            height: 16,
            width: 19,
            marginHorizontal: isTab ? 0.05 * screenWidth : 0.04 * screenWidth,
        },
        labelStyle: {
            alignSelf: 'center',
        },
        tabItemMargin: {
            marginHorizontal: 50
        },
        tabFavoriteIcon: {
            width: 12,
            height: 17,
            marginTop: isIOS ? 2 : 5
        },
        tabNewsIcon: {
            width: 31,
            height: 22,
        },
        tabMostReadIcon: {
            width: 17,
            height: 22
        },
        tabSectionsIcon: {
            width: 20,
            height: 20
        },
        tabLatestNewsIcon: {
            width: 18,
            height: 21
        },
        tabMyNewsIconStyle: {
            width: 26,
            height: 22
        },
    })
}

export default TabNavigator;
