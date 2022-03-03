import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStore, applyMiddleware} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'src/redux/rootReducer';
import {rootSaga} from 'src/redux/rootSaga';
import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'login',
    'appCommon'
  ]
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);
// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

// Mount it on the Store
const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware, logger),
);

// Run the saga
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export {store, persistor};
