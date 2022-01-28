import {AppState, Selector} from 'src/redux/rootReducer';
import { Theme } from '../../redux/appCommon/types';

export const getThemeState: Selector<Theme> = (state: AppState) => state.appCommon.theme
