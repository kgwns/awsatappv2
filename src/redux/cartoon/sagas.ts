import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import {
  FetchCartoonListType,
  CartoonDataType,
} from './types';
import {
  fetchCartoonListSuccess,
  fetchCartoonListFailed,
} from './action';
import { fetchCartoonListApi } from 'src/services';
import { decodeHTMLTags, isNonEmptyArray, isNotEmpty } from 'src/shared/utils';
import { FETCH_CARTOON_LIST } from './actionTypes';

const parseCartoonListSuccess = (response: any) => {
  let formattedData: CartoonDataType[] = []
  if (response && isNonEmptyArray(response.rows)) {
    const rows = response.rows
    formattedData = rows.map(
      ({ nid, title, created_export, body_export, type, field_cartoon_photo, field_shorturl, }: any) => ({
        nid,
        title: isNotEmpty(title) ? decodeHTMLTags(title) : '',
        body: body_export,
        image: field_cartoon_photo,
        created: created_export,
        type,
        shortUrl: field_shorturl,
      })
    );
  }
  return formattedData
};

export function* fetchCartoonListInfo(action: FetchCartoonListType) {
  try {
    const payload: { rows: any[], pager: any } = yield call(
      fetchCartoonListApi,
      action.payload,
    );
    yield put(fetchCartoonListSuccess({
      data: parseCartoonListSuccess(payload),
      hasNextPage: payload.pager?.total_pages ?
        (action.payload.page + 1 <= payload.pager.total_pages) : false
    }));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchCartoonListFailed({ error: errorMessage.message }));
    }
  }
}

function* albumListSaga() {
  yield all([takeLatest(FETCH_CARTOON_LIST, fetchCartoonListInfo)]);
}

export default albumListSaga;
