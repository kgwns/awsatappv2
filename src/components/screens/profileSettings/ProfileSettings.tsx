import {
    View,
    StyleSheet,
    FlatList,
    ListRenderItem,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTranslation } from 'react-i18next';
import { ImagesName, Styles } from 'src/shared/styles';
import { ScreensConstants } from 'src/constants';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { isDarkTheme, normalize, screenWidth } from 'src/shared/utils';
import { ButtonImage, Divider, Label, LabelTypeProp } from 'src/components/atoms';
import { ScreenContainer } from '..';
import { CustomThemeType } from 'src/shared/styles/colors';
import { ToggleWithLabel } from 'src/components/molecules';
import { useDispatch } from 'react-redux';
import { storeAppTheme } from 'src/redux/appCommon/action';
import { Theme } from 'src/redux/appCommon/types';
import { useAppCommon, useBookmark, useLogin } from 'src/hooks';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type SettingDataType = {
    iconName: ImagesName,
    title: string,
    screenName: string,
}

const sampleUserName = 'رانيا';

export const ProfileSettings = () => {
    const [t] = useTranslation()
    const dispatch = useDispatch()
    const navigation = useNavigation<StackNavigationProp<any>>();

    const style = useThemeAwareObject(customStyle);

    const { theme } = useAppCommon();
    const { removeBookmark } = useBookmark()
    const isDark = isDarkTheme(theme);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(isDark);

    const CONST_MANAGE_NOTIFICATION = t('profileSetting.manageMyNotification');
    const CONST_MANAGE_NEWS = t('profileSetting.manageMyNews');
    const CONST_MY_NEWS_LETTER = t('profileSetting.myNewsLetter');
    const CONST_MY_ACCOUNT_DETAILS = t('profileSetting.myAccountDetails');
    const CONST_APP_APPEARANCE = t('profileSetting.appAppearance');
    const CONST_EXIT = t('profileSetting.exit');
    const CONST_DARK_MODE = t('profileSetting.darkMode');
    const CONST_LIGHT_MODE = t('profileSetting.darkMode');
    const CONST_WELCOME = t('profileSetting.welcome');

    const data: SettingDataType[] = [
        {
            iconName: ImagesName.notificationGrey,
            title: CONST_MANAGE_NOTIFICATION,
            screenName: ScreensConstants.KEEP_NOTIFIED_ONBOARD_SCREEN
        },
        {
            iconName: ImagesName.manageNews,
            title: CONST_MANAGE_NEWS,
            screenName: ScreensConstants.MANAGE_MY_NEWS_SCREEN
        },
        {
            iconName: ImagesName.newsLetter,
            title: CONST_MY_NEWS_LETTER,
            screenName: ScreensConstants.NEWS_LETTER_SCREEN
        },
        {
            iconName: ImagesName.profile,
            title: CONST_MY_ACCOUNT_DETAILS,
            screenName: ScreensConstants.USER_DETAIL_SCREEN
        },
        {
            iconName: ImagesName.themeChange,
            title: CONST_APP_APPEARANCE,
            screenName: ''
        },
        {
            iconName: ImagesName.exit,
            title: CONST_EXIT,
            screenName: ''
        }
    ]

    const { fetchLogoutRequest } = useLogin();

    const onPressToggle = (isOn: boolean) => {
        const themeData = isOn ? Theme.LIGHT : Theme.DARK;
        dispatch(storeAppTheme(themeData));
        setIsDarkMode(!isOn);
    };

    const renderItem: ListRenderItem<SettingDataType> = ({ item, index }) => {
        return (
            <TouchableOpacity activeOpacity={0.8} key={index} onPress={() => {

                if (item.title === CONST_EXIT) {
                    console.log('exit clicked');
                    fetchLogoutRequest();
                    removeBookmark()
                    navigation.reset({
                        index: 0,
                        routes: [{ name: ScreensConstants.AuthNavigator }],
                    });
                } else {
                    const params = (item.title === (CONST_MANAGE_NOTIFICATION || CONST_MANAGE_NEWS)) ? {canBoBack: true} : {};
                    (item.screenName.length > 0) ? navigation.navigate(item.screenName,params) : {}
                }
            }
            }>
                <View style={style.itemContainer}>
                    <View style={style.itemLeftContainer}>
                        <ButtonImage
                            icon={() => {
                                return getSvgImages({
                                    name: item.iconName,
                                    size: normalize(18),
                                });
                            }}
                            onPress={() => {

                            }}
                        />
                        <Label
                            children={item.title}
                            style={style.label}
                            labelType={LabelTypeProp.p4}
                        />
                    </View>
                    {renderRightElement(item)}
                </View>
            </TouchableOpacity>
        );
    };

    const itemSeparator = () => <Divider style={style.divider} />;

    const renderRightElement = (item: SettingDataType) => {
        if (item.title == CONST_APP_APPEARANCE) {
            return (
                <ToggleWithLabel
                    title={isDarkMode ? CONST_DARK_MODE : CONST_LIGHT_MODE}
                    isActive={!isDarkMode}
                    onPress={onPressToggle}
                />
            );
        } else if (item.title == CONST_EXIT) {
            return null;
        }

        return (
            <ButtonImage
                icon={() => {
                    return getSvgImages({
                        name: ImagesName.arrowLeftGrey,
                        size: normalize(10),
                    });
                }}
                onPress={() => { }}
            />
        );
    };

    const welcomeView = () => (
        <View style={style.title}>
            <Label
                children={CONST_WELCOME}
                style={style.welcome}
                labelType={LabelTypeProp.h1}
            />
            <Label
                children={sampleUserName}
                style={style.userName}
                labelType={LabelTypeProp.h1}
            />
        </View>
    );

    return (
        <ScreenContainer>
            {welcomeView()}
            <View style={style.titleDivider} />
            <FlatList
                keyExtractor={(_, index) => index.toString()}
                style={style.listContainer}
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                ItemSeparatorComponent={itemSeparator}
                bounces={false}
            />
        </ScreenContainer>
    );
};

const customStyle = (theme: CustomThemeType) =>
    StyleSheet.create({
        listContainer: {
            marginHorizontal: 0.04 * screenWidth,
            paddingTop: normalize(20),
        },
        titleDivider: {
            backgroundColor: Styles.color.greenishBlue,
            width: screenWidth,
            height: 1,
        },
        itemContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: normalize(20),
        },
        itemLeftContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        label: {
            marginLeft: normalize(20),
            color: theme.secondaryMediumGrey,
        },
        divider: {
            padding: 0,
            marginTop: 0,
        },
        title: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 0.04 * screenWidth,
            paddingBottom: normalize(10),
        },
        welcome: {
            color: Styles.color.greenishBlue,
            paddingRight: normalize(10),
        },
        userName: {
            color: theme.primaryBlack,
        },
    });
