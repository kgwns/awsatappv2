import { StyleSheet, View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { HomeButton, Label } from 'src/components/atoms';
import { normalize } from 'src/shared/utils';
import { CustomThemeType } from 'src/shared/styles/colors';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles';
import { TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { fonts } from 'src/shared/styles/fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface DetailHeaderProps {
    visibleHome?: boolean;
    onBackPress: () => void;
    onHomePress: () => void;
    containerStyle?: StyleProp<ViewStyle>;
}

export const DetailHeaderTablet = ({
    visibleHome = false,
    onBackPress,
    onHomePress,
    containerStyle,
}: DetailHeaderProps) => {
    const insets = useSafeAreaInsets();
    const style = useThemeAwareObject(customStyle);

    const CONST_RETURN = TranslateConstants({ key: TranslateKey.RETURN });

    const renderBackIcon = () => {
        return (
            <TouchableOpacity
                testID={'onPressBackTestID'}
                style={style.returnStyle}
                onPress={onBackPress}>
                {getSvgImages({
                    name: ImagesName.returnBlackSvg,
                    width: 12,
                    height: 8.8,
                    style: style.prevIconStyle,
                })}
                <Label style={style.prevTitleStyle} children={CONST_RETURN} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={[style.headerContainer, containerStyle, { marginTop: insets.top }]}>
            {renderBackIcon()}
            {visibleHome && <HomeButton onPress={onHomePress} />}
        </View>
    );
};

const customStyle = (theme: CustomThemeType) =>
    StyleSheet.create({
        headerContainer: {
            backgroundColor: theme.secondaryWhite,
            justifyContent: 'space-between',
            paddingHorizontal: normalize(25),
            flexDirection: 'row',
            alignItems: 'center',
        },
        prevIconStyle: {
            width: 12,
            height: 8.8,
            marginEnd: 5,
            alignItems: 'center',
        },
        prevTitleStyle: {
            fontSize: 14,
            lineHeight: 30,
            color: theme.primaryBlack,
            fontFamily: fonts.AwsatDigital_Regular,
        },
        returnStyle: {
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
        },
    });
