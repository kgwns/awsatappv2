import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {horizontalAndTop} from 'src/shared/utils';
import {ScreenContainer} from '../ScreenContainer/ScreenContainer';
import { View } from 'react-native';
import { UIManager, findNodeHandle, PixelRatio, Dimensions } from 'react-native';
import { DownloadNewsViewManager } from './DownloadNewsViewManager';

interface DownloadNewsProps {}

const createFragment = (viewId:number|null) =>{
  UIManager.dispatchViewManagerCommand(
    viewId,
    "2",
    [viewId]
  );
}

const WINDOW_HEIGHT = Dimensions.get('window').height; // device height
const WINDOW_WIDTH = Dimensions.get('window').width; // device height

export const DownloadNews = (props: DownloadNewsProps) => {
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
        <DownloadNewsViewManager
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