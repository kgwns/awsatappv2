import {combineReducers} from 'redux';
import homeReducer from 'src/redux/home/reducer';
import appCommon from 'src/redux/appCommon/reducer';
import mostReadReducer from 'src/redux/mostRead/reducer';
import articleDetail from 'src/redux/articleDetail/reducer';

export const RESET_STORE = 'RESET_STORE';

const rootReducer = combineReducers({
  home: homeReducer,
  appCommon: appCommon,
  mostRead: mostReadReducer,
  articleDetail: articleDetail
});

export type AppState = ReturnType<typeof rootReducer>;

export type Selector<T> = (state: AppState) => T;

export default rootReducer;
