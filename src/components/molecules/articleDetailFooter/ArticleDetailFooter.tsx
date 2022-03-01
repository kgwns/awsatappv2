import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { ButtonImage } from 'src/components/atoms';
import { getSvgImages } from 'src/shared/styles/svgImages';
import { ImagesName } from 'src/shared/styles';
import { isDarkTheme, normalize } from 'src/shared/utils';
import { CustomThemeType } from 'src/shared/styles/colors';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import Share from 'react-native-share'
import { useDispatch } from 'react-redux';
import { storeAppTheme } from 'src/redux/appCommon/action';
import { useAppCommon } from 'src/hooks';
import { Theme } from 'src/redux/appCommon/types';
import { ArticleDetailDataType } from 'src/redux/articleDetail/types';

export const ArticleDetailFooter = ({ articleDetailData }: { articleDetailData: ArticleDetailDataType }) => {
    const { theme } = useAppCommon()
    const [saveState, setSaveState] = useState(false)
    let articleSaveIcon = saveState ? ImagesName.bookMarkActiveSVG : ImagesName.bookMarkSVG

    const dispatch = useDispatch()

    const onPressSave = () => {
        setSaveState(!saveState)
    }

    // const onPressThemeChange = () => {
    //     const isDark = isDarkTheme(theme)
    //     const updateTheme = isDark ? Theme.LIGHT : Theme.DARK
    //     dispatch(storeAppTheme(updateTheme))
    // }

    const onPressShare = async () => {
        const { title, view_node } = articleDetailData
        await Share.open({
            title,
            url: view_node,
            failOnCancel: true,
            subject: title
        }).then(response => {
            console.log('Shared successfully :::', response)
        }).catch((error) => {
            console.log('Cancelled share request :::', error)
        })
    }

    const { themeData } = useTheme()
    const style = useThemeAwareObject(customStyle)
    return (
        <View style={style.container}>
            <ButtonImage icon={() => {
                return getSvgImages({
                    name: ImagesName.fontScaling,
                    size: normalize(21),
                    fill: themeData.primaryBlack
                });
            }} onPress={() => { }}
            />
            <ButtonImage icon={() => {
                return getSvgImages({
                    name: ImagesName.share,
                    size: normalize(18),
                    fill: themeData.primaryBlack
                });
            }} onPress={onPressShare}
            />
            <ButtonImage icon={() => {
                return getSvgImages({
                    name: articleSaveIcon,
                    size: normalize(18),
                    fill: themeData.primaryBlack
                });
            }} onPress={onPressSave}
            />
        </View>
    );
};

const customStyle = (theme: CustomThemeType) => {
    return StyleSheet.create({
        container: {
            width: '100%',
            height: normalize(80),
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: theme.secondaryWhite,
            position: 'absolute',
            bottom: 0
        }
    })
}