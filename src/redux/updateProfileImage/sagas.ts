import { all, call, put, takeLatest } from 'redux-saga/effects';
import { UPDATE_PROFILE_USER_IMAGE } from './actionTypes';
import { updateProfileUserImage } from 'src/services/updateProfileImageService';
import { updateUserImageSuccess, updateUserImageFailed } from './action';
import { UpdateUserImageSuccessPayloadType, UpdateUserImageType } from './types';
import { AxiosError } from 'axios';
import { Alert } from 'react-native';

export function* UpdateUserImage(action: UpdateUserImageType) {
  try {
    const payload: UpdateUserImageSuccessPayloadType = yield call(
      updateProfileUserImage,
      action.payload,
    );
    //Alert.alert(payload.message.message);
    yield put(updateUserImageSuccess(payload));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    Alert.alert(errorResponse.message);
    yield put(updateUserImageFailed({ error: errorResponse.message }));
  }
}

function* updateProfileUserImageSaga() {
  yield all([takeLatest(UPDATE_PROFILE_USER_IMAGE, UpdateUserImage)]);
}

export default updateProfileUserImageSaga;
