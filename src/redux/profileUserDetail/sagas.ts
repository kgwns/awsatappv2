import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  FetchProfileUserDetailsSuccessPayloadType,
  FetchProfileUserDetailsType,
  SendUserDataType,
  UpdateUserImageSuccessPayloadType,
  UpdateUserImageType
} from './types';
import {
  fetchUserProfileDetailFailed, fetchUserProfileDetailsSuccess,
  sendUserDataFailed, sendUserDataSuccess,
  updateUserImageSuccess, updateUserImageFailed
} from './action';
import { FETCH_PROFILE_USER_DETAILS, SEND_USER_DETAILS, UPDATE_PROFILE_USER_IMAGE, } from './actionTypes';
import { fetchUserProfileApi, sendUserProfileApi, updateProfileUserImage  } from 'src/services/profileUserService'
import { Alert } from 'react-native';

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

export function* UpdateUserImage(action: UpdateUserImageType) {
  try {
    const payload: UpdateUserImageSuccessPayloadType = yield call(
      updateProfileUserImage,
      action.payload,
    );

    yield put(updateUserImageSuccess(payload));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    Alert.alert(errorResponse.message);
    yield put(updateUserImageFailed({ error: errorResponse.message }));
  }
}

function* userProfileSaga() {
  yield all([takeLatest(FETCH_PROFILE_USER_DETAILS, fetchUserProfileDetail)]);
  yield all([takeLatest(SEND_USER_DETAILS, postUserData)]);
  yield all([takeLatest(UPDATE_PROFILE_USER_IMAGE, UpdateUserImage)]);
}

export default userProfileSaga;
