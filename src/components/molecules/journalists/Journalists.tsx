import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Label } from 'src/components/atoms';
import { isTab, normalize } from 'src/shared/utils';
import { decodeHTMLTags, isNonEmptyArray, isNotEmpty } from 'src/shared/utils/utilities';
import { colors, CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { fonts } from 'src/shared/styles/fonts';
import FixedTouchable from 'src/shared/utils/FixedTouchable';
import { decode } from 'html-entities';
import { ScreensConstants } from 'src/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { color } from 'react-native-reanimated';
import { useSSR } from 'react-i18next';

export interface JournalistProps {
    data: []
}

export const Journalist: FunctionComponent<JournalistProps> = ({
    data
}) => {
    const style = useThemeAwareObject(customStyle)
    const navigation = useNavigation<StackNavigationProp<any>>()
    const [isJournalistData, setIsJournalistData] = useState([])
    let splicedArray: any[] = []
    const dataArray = data
    const count = data.length
    // if (count > 2) {
    //     for (let i = 0; i < 2; i++) {
    //         splicedArray.push(dataArray.splice(0, 2))
    //     }
    // }
    // else if (isNonEmptyArray(data)) {
    //     splicedArray.push(data)
    // }
    const onPressJournalist = () => {
        navigation.push(ScreensConstants.JOURNALIST_DETAIL_SCREEN, { tid: '92602', isRelatedArticle: true })
    }

    return (
        <>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: normalize(15) }}>
                {data.map((item: any, index: number) => {
                    return (
                        <View style={style.container}>
                                {item[0] && <View style={{ flexDirection: 'row' }}>
                                    <Label children={item[0].location + ' : '} style={style.headerLabel} />
                                    <TouchableOpacity onPress={onPressJournalist}>
                                        <Label children={item[0].author} style={style.authorLabel} />
                                    </TouchableOpacity>
                                </View>}
                                <>
                                    {item[1] && <>
                                        <Label children={'|'} style={{ paddingHorizontal: normalize(15), color: colors.silverChalice }} />
                                        <View style={{ flexDirection: 'row' }}>
                                            <Label children={item[1].location + ' : '} style={style.headerLabel} />
                                            <TouchableOpacity onPress={onPressJournalist}>
                                                <Label children={item[1].author} style={style.authorLabel} />
                                            </TouchableOpacity>
                                        </View>
                                    </>}
                                </>
                            {/* } */}
                        </View>
                    );
                })}
            </View>
        </>
    )
}

const customStyle = (theme: CustomThemeType) => StyleSheet.create({
    flatList: {
        flex: 1,
    },
    container: {
        paddingBottom: normalize(10),
        backgroundColor: theme.backgroundColor,
        flexDirection: 'row',
        width: '100%'
        // paddingHorizontal: normalize(15)
    },
    containers: {
        paddingBottom: normalize(10),
        backgroundColor: theme.backgroundColor,
        flexDirection: 'row',
    },
    headerLabel: {
        lineHeight: 18,
        // fontFamily: fonts.Effra_Regular,
        fontSize: 14,
        color: theme.primaryBlack
    },
    authorLabel: {
        lineHeight: 18,
        // fontFamily: fonts.AwsatDigitalBetav10_Regular,
        fontSize: 14,
        color: theme.primary
    },
});


