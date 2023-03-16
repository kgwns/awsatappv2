import * as React from 'react';
import {horizontalAndTop} from 'src/shared/utils';
import {ScreenContainer} from '../ScreenContainer/ScreenContainer';
import { UIManager, findNodeHandle, PixelRatio, Dimensions,View,StyleSheet } from 'react-native';
import { PDFViewManager } from './PDFArchiveViewManager';
import { TranslateConstants, TranslateKey } from '../../../constants/Constants';

const createFragment = (viewId:number|null) =>{
  UIManager.dispatchViewManagerCommand(
    viewId,
    "1",
    [viewId]
  );
}
const WINDOW_HEIGHT = Dimensions.get('window').height; // device height
const WINDOW_WIDTH = Dimensions.get('window').width; // device height
export const PDFArchive = () => {
  const DRAWER_PDF_ARCHIVE = TranslateConstants({key:TranslateKey.DRAWER_PDF_ARCHIVE})
  const ref = React.useRef(null);

  React.useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);

  return (
    <ScreenContainer
      edge={horizontalAndTop}
      showHeader={true}
      headerTitle={DRAWER_PDF_ARCHIVE}>
      <View>
        <PDFViewManager
          style={style.pdfViewManagerStyle}
          ref={ref}
        />
      </View>
    </ScreenContainer>
  );
};
const style = StyleSheet.create({
  pdfViewManagerStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(WINDOW_HEIGHT),
    width: PixelRatio.getPixelSizeForLayoutSize(WINDOW_WIDTH)
  }
})
