import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {View } from 'react-native';
import {horizontalAndTop} from 'src/shared/utils';
import {ScreenContainer} from '../ScreenContainer/ScreenContainer';
import { UIManager, findNodeHandle, PixelRatio, Dimensions, StatusBar } from 'react-native';
import { PDFViewManager } from './PDFArchiveViewManager';

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
  const [t] = useTranslation()
  const ref = React.useRef(null);

  React.useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);

  return (
    <ScreenContainer
      edge={horizontalAndTop}
      showHeader={true}
      headerTitle={t('drawer.pdfArchive')}>
      <View>
        <PDFViewManager
          style={{
            height: PixelRatio.getPixelSizeForLayoutSize(WINDOW_HEIGHT),
            width: PixelRatio.getPixelSizeForLayoutSize(WINDOW_WIDTH)
          }}
          ref={ref}
        />
      </View>
    </ScreenContainer>
  );
};
