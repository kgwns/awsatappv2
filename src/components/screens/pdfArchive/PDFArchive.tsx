import * as React from 'react';
import { requireNativeComponent } from 'react-native';
import { horizontalAndTop } from 'src/shared/utils';
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensConstants } from 'src/constants';
import { ScreenContainer } from '../ScreenContainer/ScreenContainer';

const PDFArchiveView: any = requireNativeComponent('RNPDFArchiveView')

export const PDFArchive = () => {
  const navigation = useNavigation<StackNavigationProp<any>>()

  const onClickOpenPDF = (selectedPDF: any) => {
    navigation.navigate(ScreensConstants.PDF_EDITOR_VIEW, { selectedPDF: selectedPDF })
  }

  const headerTitle = TranslateConstants({ key: TranslateKey.DRAWER_PDF_ARCHIVE })
  
  return (
    <ScreenContainer edge={horizontalAndTop} showHeader={true} headerTitle={headerTitle}>
        <PDFArchiveView style={{flex: 1}} onItemClick={(data: any) => onClickOpenPDF(data.nativeEvent.SelectedPDF)}/>
    </ScreenContainer>
  );
};