import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { FetchSideMenuSuccessPayloadType } from './types';
import { fetchSideMenuFailed, fetchSideMenuSuccess } from './action';
import { FETCH_SIDE_MENU } from './actionTypes';
import { fetchSideMenuApi } from 'src/services/sideMenuService';

export function* fetchSideMenu() {

  try {
    const payload: FetchSideMenuSuccessPayloadType = yield call(
        fetchSideMenuApi,
    );
    yield put(fetchSideMenuSuccess({ sideMenuData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchSideMenuFailed({ error: errorMessage.message }));
    }
  }
}

function* sideMenuSaga() {
  yield all([takeLatest(FETCH_SIDE_MENU, fetchSideMenu)]);
}

export default sideMenuSaga;
