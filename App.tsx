import React from 'react';
import { store, persistor } from 'src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import 'src/i18n';
import SplashNavigation from './src/navigation/SplashNavigation';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SplashNavigation />
    </PersistGate>
  </Provider>
)

export default App