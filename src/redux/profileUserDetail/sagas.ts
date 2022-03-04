import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  FetchProfileUserDetailsSuccessPayloadType,
  FetchProfileUserDetailsType,
  SendUserDataType,
} from './types';
import {
  fetchUserProfileDetailFailed, fetchUserProfileDetailsSuccess,
  sendUserDataFailed, sendUserDataSuccess
} from './action';
import { FETCH_PROFILE_USER_DETAILS, SEND_USER_DETAILS } from './actionTypes';
import { fetchUserProfileApi, sendUserProfileApi } from 'src/services/profileUserService'

export function* fetchUserProfileDetail(action: FetchProfileUserDetailsType) {
  try {
    const payload: FetchProfileUserDetailsSuccessPayloadType = yield call(
      fetchUserProfileApi,
    );
    yield put(fetchUserProfileDetailsSuccess({ userProfileData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchUserProfileDetailFailed({ error: errorMessage.message }));
    }
  }
}

export function* postUserData(action: SendUserDataType) {
  try {
    const payload: FetchProfileUserDetailsSuccessPayloadType = yield call(
      sendUserProfileApi,
      action.payload,
    );
    yield put(sendUserDataSuccess({ saveData: payload }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(sendUserDataFailed({ error: errorMessage.message }));
    }
  }
}

function* userProfileSaga() {
  yield all([takeLatest(FETCH_PROFILE_USER_DETAILS, fetchUserProfileDetail)]);
  yield all([takeLatest(SEND_USER_DETAILS, postUserData)]);
}

export default userProfileSaga;
