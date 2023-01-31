import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { ContactUsInfoSuccessPayload, SendContactUsInfoType } from './types';
import { sendContactUsService } from 'src/services/contactUsService';
import { SEND_CONTACT_US_INFO } from './actionType';
import { sendContactUsInfoDetailFailed, sendContactUsInfoDetailSuccess } from './action';
import { isObjectNonEmpty } from 'src/shared/utils';

const formatData = (response: any): ContactUsInfoSuccessPayload => {
  let formattedData: ContactUsInfoSuccessPayload = {}
    if (response && isObjectNonEmpty(response)) {
      const message = response.message
      formattedData = message
    }
  return formattedData
}


export function* sendContactUsInfo(action: SendContactUsInfoType) {
  try {
    const payload: { message: any } = yield call(
      sendContactUsService,
      action.payload
    );
    const response = formatData(payload)
    yield put(sendContactUsInfoDetailSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(sendContactUsInfoDetailFailed({ error: errorMessage.message }));
    }
  }
}

export function* contactUsSaga() {
  yield all([
    takeLatest(SEND_CONTACT_US_INFO, sendContactUsInfo),
  ]);
}

export default contactUsSaga;
