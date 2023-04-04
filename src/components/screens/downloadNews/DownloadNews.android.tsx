import * as React from 'react';
import {horizontalAndTop} from 'src/shared/utils';
import {ScreenContainer} from '../ScreenContainer/ScreenContainer';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { UIManager, findNodeHandle, PixelRatio, Dimensions, StyleSheet } from 'react-native';
import { DownloadNewsViewManager } from './DownloadNewsViewManager';
import { useAppCommon } from 'src/hooks';
import { TranslateConstants, TranslateKey } from '../../../constants/Constants';


const createFragment = (viewId:number|null) =>{
  UIManager.dispatchViewManagerCommand(
    viewId,
    "2",
    [viewId]
  );
}


const WINDOW_HEIGHT = Dimensions.get('window').height; // device height
const WINDOW_WIDTH = Dimensions.get('window').width; // device height

export const DownloadNews = () => {
  const DRAWER_PDF_ARCHIVE = TranslateConstants({key:TranslateKey.DRAWER_PDF_ARCHIVE})
  const theme = useAppCommon()
  const ref = React.useRef(null);
  const [userTheme,setUserTheme] = React.useState<string>(theme.theme)

  const style = useThemeAwareObject(customStyle);
  
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
      headerTitle={DRAWER_PDF_ARCHIVE}>
      <DownloadNewsViewManager
        style={style.downloadNewsManagerStyle}
        userTheme={userTheme}
        ref={ref}
      />
    </ScreenContainer>
  );
};

const customStyle = () => StyleSheet.create({
  downloadNewsManagerStyle: {
      height: PixelRatio.getPixelSizeForLayoutSize(WINDOW_HEIGHT),
      width: PixelRatio.getPixelSizeForLayoutSize(WINDOW_WIDTH)
  }
})
