import { View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Label } from 'src/components/atoms/label/Label';
import { isIOS, isInvalidOrEmptyArray, isNonEmptyArray, isTab, normalize } from 'src/shared/utils';
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

type AuthorComponentPros = {
    name: string;
    id: string;
    disabled: boolean;
    addStyle?: StyleProp<ViewStyle>;
}

export const Journalist: FunctionComponent<JournalistProps> = ({
    journalistId, journalistName, journalistCity,
}) => {
    const style = useThemeAwareObject(customStyle)
    const navigation = useNavigation<StackNavigationProp<any>>()
    const [activeJournalist, setActiveJournalist] = useState<boolean[]>([]);
    const [isJournalist,setJournalist] = useState(false);
    const { emptyJournalistArticleInfo } = useJournalist();

    useEffect(() => {
        getActiveJournalist(journalistId);
    },[journalistId])

    useEffect(() => {
        setActiveJournalist(activeJournalist);
    },[activeJournalist])

     useEffect(() => {
        setJournalist(true);
    },[isJournalist])

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
        setJournalist(false);
        emptyJournalistArticleInfo();
        navigation.push(ScreensConstants.JOURNALIST_DETAIL_SCREEN, { tid: id, isRelatedArticle: true })
    }

    const renderVerticalDivider = () => (
        <Label children={'|'} style={style.separatorStyle} testID={'separatorId'} />
    );

    const renderCityName = (city: string) => (
        <Label children={city + ' : '} style={style.headerLabel} />
    );

    const renderAuthorName = ({ name, id, disabled, addStyle }: AuthorComponentPros) => (
        <TouchableOpacity onPress={() => onPressJournalist(id)}
            disabled={disabled}>
            <Label children={name} style={StyleSheet.flatten([style.authorLabel, addStyle])} />
        </TouchableOpacity>
    );

    if (isInvalidOrEmptyArray(journalistCity) && isInvalidOrEmptyArray(journalistId) && isInvalidOrEmptyArray(journalistName)) {
        return null;
    }

    const uniqueCityList = isNonEmptyArray(journalistCity) ? [...new Set(journalistCity)] : []
    if (journalistCity.length === uniqueCityList.length) {
        const journalistLength = isNonEmptyArray(journalistId) ? journalistId.length : 0
        return (
            <View style={[style.containerStyle, isTab && { flex: 1 }]}>
                {journalistId.map((item: any, index: number) => {
                    const mainViewStyle = [style.container, index % 2 === 0 ? style.rowViewStyle : style.columnViewStyle]
                    const showDivider = (index !== journalistLength - 1);
                    return (
                        <View key={index} testID={'containerId'} style={mainViewStyle}>
                            {item[index] && <View style={style.rowViewStyle}>
                                {renderCityName(journalistCity[index])}
                                {isJournalist && renderAuthorName(
                                    {
                                        name: journalistName[index],
                                        disabled: activeJournalist[index],
                                        id: item,
                                    }
                                )}
                                {showDivider && renderVerticalDivider()}
                            </View>}
                        </View>
                    );
                })}
            </View>
        )
    } else { // If city name common for both jName then we need to combine and separated by space.
        const journalistLength = isNonEmptyArray(uniqueCityList) ? uniqueCityList.length : 0
        return (
            <View style={[style.containerStyle, isTab && { flex: 1 }]}>
                {uniqueCityList.map((item: any, index: number) => {
                    const showDivider = (index !== journalistLength - 1);
                    const nameList = [];
                    const idList: string[] = [];

                    for (let i = 0; i < journalistCity.length; i++) {
                        if (item === journalistCity[i]) {
                            nameList.push(journalistName[i]);
                            idList.push(journalistId[i]);
                        }
                    }

                    const mainViewStyle = [style.container, index % 2 === 0 ? style.rowViewStyle : style.columnViewStyle]
                    return (
                        <View key={index} testID={'containerId'} style={mainViewStyle}>
                            {item[index] && <View style={style.rowViewStyle}>
                                {renderCityName(uniqueCityList[index])}
                                {isJournalist && nameList.map((nameItem, nameIndex) => {
                                    const currentIndex = journalistName.findIndex((jItem) => jItem === nameItem);
                                    const canDisable = activeJournalist[currentIndex];
                                    return renderAuthorName(
                                        {
                                            name: nameItem,
                                            disabled: canDisable,
                                            id: idList[nameIndex],
                                            addStyle: { marginRight: 5 }
                                        }
                                    );
                                })}
                                {showDivider && renderVerticalDivider()}
                            </View>}
                        </View>
                    );
                })}
            </View>
        )
    }
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    container: {
        paddingBottom: normalize(10),
        backgroundColor: theme.backgroundColor,
    },
    containerStyle: {
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        paddingHorizontal: isTab ? 0 : normalize(15)
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


