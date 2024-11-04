import * as React from 'react';
import {horizontalAndTop, recordLogEvent, screenWidth} from 'src/shared/utils';
import {ScreenContainer} from '../ScreenContainer/ScreenContainer';
import { useThemeAwareObject } from 'src/shared/styles/useThemeAware'
import { UIManager, findNodeHandle, PixelRatio, Dimensions, StyleSheet, NativeModules, NativeEventEmitter } from 'react-native';
import { DownloadNewsViewManager } from './DownloadNewsViewManager';
import { useAppCommon } from 'src/hooks';
import { TranslateConstants, TranslateKey } from '../../../constants/Constants';
import { getFullDate } from 'src/shared/utils/utilities';
import { AnalyticsEvents } from 'src/shared/utils/analytics';


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
  const downloadStatus = React.useRef(-1);

  const style = useThemeAwareObject(customStyle);
  
  React.useEffect(() => {
    const viewId = findNodeHandle(ref.current);
    createFragment(viewId);
  }, []);

  React.useEffect(()=>{
    console.log('themeSelected',theme)
    setUserTheme(theme.theme)
  },[theme])

  const storeDownloadEvent = (event: any) => {
    const createdDate = getFullDate(event.downloadStatus * 1000);
    if(event.downloadStatus === 0) {
      if(downloadStatus.current === -1) {
        downloadStatus.current = event.downloadStatus
      }
    }
    if(event.downloadStatus === 2) {
      if(downloadStatus.current === 0) {
        recordLogEvent(AnalyticsEvents.TODAY_COPY_DOWNLOAD,{newspaper_date: createdDate});
        downloadStatus.current = -1
      }
    }
  }

  React.useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.PDFViewListener);
    eventEmitter.addListener('pdfInfo', event => {
      console.log(event) // 0 -> download clicked, 1 -> downloading, 2 -> downloaded
      storeDownloadEvent(event);
    });
  }, []);

  return (
    <ScreenContainer
      edge={horizontalAndTop}
      showHeader={false}
      headerTitle={DRAWER_PDF_ARCHIVE}>
      <DownloadNewsViewManager
        style={style.downloadNewsManagerStyle}
        userTheme={userTheme}
        screenWidth={screenWidth}
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
