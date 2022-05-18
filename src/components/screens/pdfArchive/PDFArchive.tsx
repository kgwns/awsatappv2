import * as React from 'react';
import { requireNativeComponent } from 'react-native';
import { horizontalAndTop } from 'src/shared/utils';
import { TranslateConstants, TranslateKey } from 'src/constants/TranslateConstants';
import { ScreenContainer } from '..';

const PDFArchiveView = requireNativeComponent('PDFArchivesRootViewController')

const Props = {
  style: { flex: 1 }
}

export const PDFArchive = () => {
  return (
    <ScreenContainer
      edge={horizontalAndTop}
      showHeader={true}
      headerTitle={TranslateConstants({ key: TranslateKey.DRAWER_PDF_ARCHIVE })}>
      <PDFArchiveView {...Props} />
    </ScreenContainer>
  );
};