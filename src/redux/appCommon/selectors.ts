import {AppState, Selector} from 'src/redux/rootReducer';
import { Theme } from 'src/redux/appCommon/types';

export const getThemeState: Selector<Theme> = (state: AppState) => state.appCommon.theme

export const getIsFirstSession: Selector<boolean> = (state: AppState) => state.appCommon.isAppFirstSession

export const getArticleFontSize: Selector<number> = (state: AppState) => state.appCommon.articleFontSize