import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { requireNativeComponent } from 'react-native';
import { horizontalAndTop } from 'src/shared/utils';
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants';
import { ScreenContainer } from '..';

export const PDFArchive = () => {
  const [t] = useTranslation()
  return (
    <ScreenContainer
      edge={horizontalAndTop}
      showHeader={true}
      headerTitle={TranslateConstants({key: TranslateKey.DRAWER_PDF_ARCHIVE})}>
        <PDFArchiveView />
    </ScreenContainer>
  );
};

const PDFArchiveView = requireNativeComponent('PDFArchivesRootViewController')