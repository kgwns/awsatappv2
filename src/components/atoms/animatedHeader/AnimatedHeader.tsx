import React, { FunctionComponent } from 'react';
import { TouchableOpacity, View, StyleSheet, StyleProp, ViewStyle, Animated } from 'react-native';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles';
import { isDarkTheme, recordLogEvent, screenWidth } from 'src/shared/utils';
import HeaderDarkLogoSvg from 'src/assets/images/headerIcons/aaaNewLogoDarkStretch.svg';
import HeaderLogoSvg from 'src/assets/images/headerIcons/aaaNewLogoStretch.svg';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { ScreensConstants } from 'src/constants/Constants';
import { useAppCommon } from 'src/hooks';
import { AnalyticsEvents } from 'src/shared/utils/analytics';
import { sideMenuEventParameter } from 'src/shared/utils/analyticsEvents';

export interface HeaderProps {
    scrollY?: any;
    containerStyle?: StyleProp<ViewStyle>;
    animated?: boolean;
}

const ANIMATE_IMAGE_WIDTH = 166;
const ANIMATE_IMAGE_HEIGHT = 44;
const IMAGE_WIDTH = 130;
const IMAGE_HEIGHT = 32;

export const AnimatedHeader: FunctionComponent<HeaderProps> = ({
    scrollY,
    containerStyle,
    animated = true
}) => {

    const styles = useThemeAwareObject(createStyles);
    const navigation = useNavigation();
    const { theme } = useAppCommon();
    const isDarkMode = isDarkTheme(theme);

    const onPressRightIcon = () => {
        recordLogEvent(AnalyticsEvents.MENU_VIEW,sideMenuEventParameter)
        navigation.dispatch(DrawerActions.toggleDrawer());
    }

    const onPressLeftIcon = () => navigation.navigate(ScreensConstants.SearchScreen);

    const renderLeftComponent = () => {
        return (
            <TouchableOpacity     testID="onPressLeftIconId"
            onPress={onPressLeftIcon}>
                <View style={styles.itemContainer}>
                    {getSvgImages({
                        name: ImagesName.searchIcon,
                        width: 18,
                        height: 19,
                    })}
                </View>
            </TouchableOpacity>
        );
    };

    const renderRightComponent = () => {
        return (
            <TouchableOpacity onPress={onPressRightIcon} testID="onPressRightIconId">
                <View style={styles.rightItemContainer}>
                    {getSvgImages({
                        name: ImagesName.menuIcon,
                        width: 19,
                        height: 16,
                    })}
                </View>
            </TouchableOpacity>
        );
    };

    const renderHeaderLogo = () => {
        if (animated) {
            const inputRange = [-100, 0, 100]
            const widthStyle = scrollY.interpolate({
                inputRange,
                outputRange: [ANIMATE_IMAGE_WIDTH, ANIMATE_IMAGE_WIDTH, 130],
                extrapolate: 'clamp'
            })
            const heightStyle = scrollY.interpolate({
                inputRange,
                outputRange: [ANIMATE_IMAGE_HEIGHT, ANIMATE_IMAGE_HEIGHT, 32],
                extrapolate: 'clamp'
            })

            return (
                <Animated.View style={{ width: widthStyle, height: heightStyle }}>
                    {isDarkMode ? <HeaderDarkLogoSvg testID='headerDarkLogoId' /> : <HeaderLogoSvg testID='headerLogoId' />}
                </Animated.View>
            )
        } else {
            return (
                <View style={styles.titleContainerWrapper} testID='logoId'>
                    {getSvgImages({ name: ImagesName.headerLogo, width: IMAGE_WIDTH, height: IMAGE_HEIGHT })}
                </View>
            )
        }

    }

    return (
        <View style={StyleSheet.flatten([styles.containerStyle, containerStyle])}>
            {renderRightComponent()}
            {renderHeaderLogo()}
            {renderLeftComponent()}
        </View>
    );
};

const createStyles = (theme: CustomThemeType) =>
    StyleSheet.create({
        containerStyle: {
            backgroundColor: theme.tabBarBackground,
            shadowColor: colors.transparent,
            paddingHorizontal: 0.04 * screenWidth,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 8,
        },
        titleContainerWrapper: {
            flex: 1,
            alignContent: 'center',
            alignItems: 'center',
            width: '100%',
        },
        logo: {
            height: 30,
            width: 140,
            alignItems: 'center',
        },
        itemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        rightItemContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    })
