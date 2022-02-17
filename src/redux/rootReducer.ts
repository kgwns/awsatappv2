import {combineReducers} from 'redux';
import homeReducer from 'src/redux/home/reducer';
import appCommon from 'src/redux/appCommon/reducer';
import mostReadReducer from 'src/redux/mostRead/reducer';
import searchReducer from 'src/redux/search/reducer';
import articleDetail from 'src/redux/articleDetail/reducer';
import latestNewsTab from 'src/redux/latestNews/reducer';
import opinionWriter from 'src/redux/writers/reducer';
import opinionsReducer from 'src/redux/opinions/reducer';
import allWriters from 'src/redux/allWriters/reducer';

export const RESET_STORE = 'RESET_STORE';

const rootReducer = combineReducers({
  home: homeReducer,
  appCommon: appCommon,
  mostRead: mostReadReducer,
  search: searchReducer,
  articleDetail: articleDetail,
  latestNewsTab,
  opinionWriter: opinionWriter,
  opinionsReducer: opinionsReducer,
  allWriters: allWriters,
});

export type AppState = ReturnType<typeof rootReducer>;

export type Selector<T> = (state: AppState) => T;

export default rootReducer;
