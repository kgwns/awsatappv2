import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {Text, View } from 'react-native';
import {horizontalAndTop} from 'src/shared/utils';
import {ScreenContainer} from '..';

export const PDFArchive = () => {
    const [t] = useTranslation()
  return (
    <ScreenContainer
      edge={horizontalAndTop}
      showHeader={true}
      headerTitle={t('drawer.pdfArchive')}>
      <View>
        <Text>PDFArchive</Text>
      </View>
    </ScreenContainer>
  );
};