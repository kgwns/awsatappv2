import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Label } from 'src/components/atoms/label/Label';
import { isIOS, isNonEmptyArray, normalize } from 'src/shared/utils';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { ScreensConstants } from 'src/constants/Constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { fonts } from 'src/shared/styles/fonts';
import { requestJournalistDetail } from 'src/services/articleDetailService';
import { useJournalist } from 'src/hooks/useJournalist';


export interface JournalistProps {
    journalistId: string[],
    journalistName: string[],
    journalistCity: string[]
}

export const Journalist: FunctionComponent<JournalistProps> = ({
    journalistId, journalistName, journalistCity,
}) => {
    const style = useThemeAwareObject(customStyle)
    const navigation = useNavigation<StackNavigationProp<any>>()
    const [activeJournalist, setActiveJournalist] = useState<boolean[]>([]);
    const { emptyJournalistArticleInfo } = useJournalist();

    useEffect(() => {
        getActiveJournalist(journalistId);
    },[journalistId])

    useEffect(() => {
        setActiveJournalist(activeJournalist);
    },[activeJournalist])

    const getActiveJournalist = async (journalistIdProps: string[]) => {
        const activeJournalistArray: boolean[] = [];
        await Promise.all(
            journalistIdProps.map(async jor_id => {
                const response = await requestJournalistDetail({
                jor_id,
                });
                const flag = response.rows[0].not_clickable === '1';
                    activeJournalistArray.push(flag);
                }),
        );
        setActiveJournalist(activeJournalistArray);
    };

    const onPressJournalist = (id: string) => {
        emptyJournalistArticleInfo();
        navigation.push(ScreensConstants.JOURNALIST_DETAIL_SCREEN, { tid: id, isRelatedArticle: true })
    }

    const journalistLength =  isNonEmptyArray(journalistId) ? journalistId.length : 0

    return (
        <View style={style.containerStyle}>
            {isNonEmptyArray(journalistId) && isNonEmptyArray(journalistName) && isNonEmptyArray(journalistCity) && journalistId.map((item: any, index: number) => {
                return (
                    <View key={index} style={[style.container, index % 2 === 0 ? style.rowViewStyle : style.columnViewStyle]}>
                        {item[index] && <View style={style.rowViewStyle}>
                            <Label children={journalistCity[index] + ' : '} style={style.headerLabel} />
                            <TouchableOpacity onPress={() => onPressJournalist(item)} disabled={activeJournalist[index]}>
                                <Label children={journalistName[index]} style={style.authorLabel} />
                            </TouchableOpacity>
                            {index !== journalistLength - 1 && <Label children={'|'} style={style.separatorStyle} />}
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
        lineHeight: isIOS ? 20 : 26,
        fontFamily: fonts.Effra_Regular,
        fontSize: 14,
        color: theme.secondaryDarkSlate,
        marginHorizontal: 5
    },
    authorLabel: {
        lineHeight: 24,
        fontFamily: fonts.AwsatDigital_Regular,
        fontSize: 14,
        color: theme.primary
    },
    rowViewStyle: {
        flexDirection: 'row'
    },
    columnViewStyle: {
        flexDirection: 'column'
    },
    separatorStyle: {
        fontSize: 16,
        lineHeight: isIOS ? 19 : 22,
        paddingHorizontal: normalize(10),
        color: colors.silverChalice
    }
});


