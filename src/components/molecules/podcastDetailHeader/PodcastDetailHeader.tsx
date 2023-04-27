import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { Label } from 'src/components/atoms';
import { colors } from 'src/shared/styles/colors';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles';
import { TranslateConstants, TranslateKey } from 'src/constants/Constants';
import { fonts } from 'src/shared/styles/fonts';
import PodcastHome from 'src/assets/images/podcastHome.svg'

interface PodcastDetailHeaderProps {
    visibleHome?: boolean;
    onBackPress: () => void;
    onHomePress: () => void;
}

export const PodcastDetailHeader = ({
    visibleHome = false,
    onBackPress,
    onHomePress,
}: PodcastDetailHeaderProps) => {
    const style = useThemeAwareObject(customStyle);
    const CONST_RETURN = TranslateConstants({ key: TranslateKey.RETURN });

    const renderLeftComponent = () => {
        return (
            <TouchableOpacity
                onPress={onHomePress} testID={'podcastHomeId'}>
                <View style={style.leftComponentContainer}>
                    <PodcastHome width={26} height={23} />
                </View>
            </TouchableOpacity>
        )
    }

    const renderRightComponent = () => {
        return (
            <TouchableOpacity
                onPress={onBackPress} testID={'podcastBackIconId'} >
                <View style={style.prevTabContainer}>
                    {getSvgImages({
                        name: ImagesName.returnWhiteIcon,
                        width: 20,
                        height: 20,
                        style: style.prevIconStyle,
                    })}
                    <Label style={style.prevTitleStyle} children={CONST_RETURN} />
                </View>
            </TouchableOpacity>
        )
    }


    const renderBackIcon = () => {
        return (
            <View style={style.containerStyle}>
                {renderRightComponent()}
                {visibleHome && renderLeftComponent()}
            </View>
        );
    };

    return (
        <View>
            {renderBackIcon()}
        </View>
    );
};

const customStyle = () =>
    StyleSheet.create({
        containerStyle: {
            backgroundColor: colors.black,
            height: 55,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        leftComponentContainer: {
            backgroundColor: colors.darkFungusGreen,
            width: 47,
            height: 47,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 28,
            marginHorizontal: 40
        },
        prevIconStyle: {
            width: 12,
            height: 8.8,
            marginEnd: 5,
        },
        prevTitleStyle: {
            fontSize: 18,
            lineHeight: 28,
            color: colors.white,
            fontFamily: fonts.AwsatDigital_Regular,
        },
        prevTabContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 30
        },
        returnStyle: {
            alignContent: 'center',
        },
    });
