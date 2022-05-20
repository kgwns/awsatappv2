import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { requireNativeComponent } from 'react-native'
import { ScreensConstants } from 'src/constants';
import { useTheme } from 'src/shared/styles/ThemeProvider';
import { LIGHT_THEME_ID } from 'src/shared/styles/colors';


const NativeView: any = requireNativeComponent('RNTodayTabView');

export const DownloadNewsIOS = () => {
    const navigation = useNavigation<StackNavigationProp<any>>()

    const { themeData } = useTheme()
    const [appTheme, setAppTheme] = useState<string>('unspecified')

    useEffect(() => {
        setTimeout(() => { //Adding some delay then only willsSet will call in iOS Native
            const themeMode = themeData.id === LIGHT_THEME_ID ? 'light' : 'dark'
            setAppTheme(themeMode)
        }, 50)
    }, [themeData])


    const onClickOpenPDF = (selectedPDF: any) => {
        navigation.navigate(ScreensConstants.PDF_EDITOR_VIEW, { selectedPDF: selectedPDF })
    }

    const onClickArchive = () => {
        navigation.navigate(ScreensConstants.PDFArchive)
    }

    return (
        <NativeView style={{ flex: 1 }}
            onItemClick={(data: any) => onClickOpenPDF(data.nativeEvent.SelectedPDF)}
            onArchiveButtonClick={onClickArchive}
            userInterfaceStyle={appTheme}
        />
    );
};
