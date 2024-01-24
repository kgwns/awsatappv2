import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { CustomThemeType } from 'src/shared/styles/colors';
import { normalize, isTab } from 'src/shared/utils';
import { fonts } from 'src/shared/styles/fonts';

export interface LabelProps {
    isAd?: boolean;
}

export const AdvertisedContentLabel: FunctionComponent<LabelProps> = ({
    isAd = false
}) => {
    const style = useThemeAwareObject(defaultStyle);

    if (!isAd)
        return null;

    if (isTab) {
        return (
            <View style={style.tabAdvContainer}>
                <Text children="محتـــــــــــــــــــوى مـــــــــروج" style={style.adv} />
            </View>
        );
    }

    return (
        <View style={style.advContainer}>
            <Text children="محتوى مروج" style={style.adv} />
        </View>
    );
};

const defaultStyle = (theme: CustomThemeType) =>
    StyleSheet.create({
        advContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start'
        },
        tabAdvContainer: {
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            marginVertical: normalize(10)
        },
        adv: {
            fontFamily: fonts.AwsatDigital_Regular,
            fontSize: 12.8,
            lineHeight: 20,
            textAlign: 'left',
            color: theme.primaryBlack,
            backgroundColor: 'white',
            padding: normalize(6)
        }
    });