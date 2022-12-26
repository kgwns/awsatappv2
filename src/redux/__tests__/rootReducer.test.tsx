import rootReducer from '../rootReducer';
import { initialAuthState as HomeState } from 'src/redux/home/reducer';
import { createStore } from 'redux'

describe('Root Reducer Suite', () => {
  let store = createStore(rootReducer)

  test('loaded correctly', () => {
    expect(store.getState().home).toEqual(HomeState);
  });
});

