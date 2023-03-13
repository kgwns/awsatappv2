import {AppState, Selector} from 'src/redux/rootReducer';
import { BaseUrlConfigType, ServerEnvironment, Theme } from 'src/redux/appCommon/types';

export const getThemeState: Selector<Theme> = (state: AppState) => state.appCommon.theme

export const getIsFirstSession: Selector<boolean> = (state: AppState) => state.appCommon.isAppFirstSession

export const getServerEnvironment: Selector<ServerEnvironment> = (state: AppState) => state.appCommon.serverEnvironment

export const getArticleFontSize: Selector<number> = (state: AppState) => state.appCommon.articleFontSize

export const getBaseUrlConfig: Selector<BaseUrlConfigType> = (state: AppState) => state.appCommon.baseUrlConfig;
