import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { FetchTopMenuSuccessPayloadType, TopMenuItemType } from './types';
import { fetchTopMenuFailed, fetchTopMenuSuccess } from './action';
import { FETCH_TOP_MENU } from './actionTypes';
import { fetchTopMenuApi } from 'src/services/topMenuService';
import { isNonEmptyArray } from 'src/shared/utils';

const returnResponse = (response: any): FetchTopMenuSuccessPayloadType => {
  const responseData: FetchTopMenuSuccessPayloadType = {
    topMenuData: []
  }
    if (response && isNonEmptyArray(response.rows)) {
      const results: TopMenuItemType[] = [];
      for (const [index,item] of response.rows.entries()) {
        const topMenuItem: TopMenuItemType = {
          sectionId: item.sectionid,
          tabName: item.title,
          keyName: item.keyname,
          isSelected: false,
          parentId: item.parent_export,
          uuid: item.uuid_export,
          field_sections: item.field_sections
        };
        results.push(topMenuItem);
      }
      responseData.topMenuData = results
    }

  return responseData
}

export function* fetchTopMenu() {

  try {
    const payload: FetchTopMenuSuccessPayloadType = yield call(
        fetchTopMenuApi,
    );
    const response = returnResponse(payload)
    yield put(fetchTopMenuSuccess(response));
  } catch (error) {
    const errorResponse: AxiosError = error as AxiosError;
    if (errorResponse.response) {
      const errorMessage: { message: string } = errorResponse.response.data;
      yield put(fetchTopMenuFailed({ error: errorMessage.message }));
    }
  }
}

function* topMenuSaga() {
  yield all([takeLatest(FETCH_TOP_MENU, fetchTopMenu)]);
}

export default topMenuSaga;
