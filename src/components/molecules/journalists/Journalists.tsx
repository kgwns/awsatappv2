import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FunctionComponent, useState } from 'react';
import { Label } from 'src/components/atoms';
import { isNonEmptyArray, normalize } from 'src/shared/utils';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { ScreensConstants } from 'src/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fonts } from 'src/shared/styles/fonts';

export interface JournalistProps {
    journalistId: string[],
    journalistName: string[],
    journalistCity: string[]
}

export const Journalist: FunctionComponent<JournalistProps> = ({
    journalistId, journalistName, journalistCity
}) => {
    const style = useThemeAwareObject(customStyle)
    const navigation = useNavigation<StackNavigationProp<any>>()

    const onPressJournalist = (id: string) => {
        navigation.push(ScreensConstants.JOURNALIST_DETAIL_SCREEN, { tid: '92602', isRelatedArticle: true })
    }

    return (
        <View style={style.containerStyle}>
            {isNonEmptyArray(journalistId) && isNonEmptyArray(journalistName) && isNonEmptyArray(journalistCity) && journalistId.map((item: any, index: number) => {
                return (
                    <View style={[style.container, index % 2 == 0 ? style.rowViewStyle : style.columnViewStyle]}>
                        {item[index] && <View style={style.rowViewStyle}>
                            <Label children={journalistCity[index] + ' : '} style={style.headerLabel} />
                            <TouchableOpacity onPress={() => onPressJournalist(item)}>
                                <Label children={journalistName[index]} style={style.authorLabel} />
                            </TouchableOpacity>
                            {index % 2 == 0 && <Label children={'|'} style={{ paddingHorizontal: normalize(15), color: colors.silverChalice }} />}
                        </View>}
                    </View>
                );
            })}
        </View>
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        paddingBottom: normalize(10),
        backgroundColor: theme.backgroundColor,
    },
    containerStyle: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        paddingHorizontal: normalize(15)
    },
    headerLabel: {
        lineHeight: 18,
        // fontFamily: fonts.Effra_Regular,
        fontSize: 14,
        color: theme.primaryBlack
    },
    authorLabel: {
        lineHeight: 18,
        // fontFamily: fonts.AwsatDigital_Regular,
        fontSize: 14,
        color: theme.primary
    },
    rowViewStyle: {
        flexDirection: 'row'
    },
    columnViewStyle: {
        flexDirection: 'column'
    }
});


