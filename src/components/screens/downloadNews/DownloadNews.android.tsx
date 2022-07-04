import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {horizontalAndTop} from 'src/shared/utils';
import {ScreenContainer} from '../ScreenContainer/ScreenContainer';
import { ScrollView, View } from 'react-native';
import { UIManager, findNodeHandle, PixelRatio, Dimensions } from 'react-native';
import { DownloadNewsViewManager } from './DownloadNewsViewManager';
import { useAppCommon } from 'src/hooks';

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
  const theme = useAppCommon()
  const ref = React.useRef(null);
  const [userTheme,setUserTheme] = React.useState<String>(theme.theme)
  
  React.useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);

  React.useEffect(()=>{
    console.log('themeSelected',theme)
    setUserTheme(theme.theme)
  },[theme])

  return (
    <ScreenContainer
      edge={horizontalAndTop}
      showHeader={false}
      headerTitle={t('drawer.pdfArchive')}>
      <DownloadNewsViewManager
        style={{
          height: PixelRatio.getPixelSizeForLayoutSize(WINDOW_HEIGHT),
          width: PixelRatio.getPixelSizeForLayoutSize(WINDOW_WIDTH)
        }}
        userTheme={userTheme}
        ref={ref}
      />
    </ScreenContainer>
  );
};