import { all, call, put, takeLatest } from "redux-saga/effects";
import { FETCH_ENTITY_QUEUE_DATA } from "./actionType";
import { fetchEntityQueueAPI } from "src/services/entityQueueService";
import { fetchEntityQueueFailed, fetchEntityQueueSuccess } from "./action";
import { AxiosError } from "axios";
import { EntityQueueListType, FetchEntityQueueType } from "./types";
import { decodeHTMLTags, getArticleImage, isNonEmptyArray, isNotEmpty } from "src/shared/utils/utilities";

export const parseArticleSectionSuccess = (response: any) => {
    let formattedData = [];
  
    if (isNonEmptyArray(response)) {
            formattedData = response.map(
              ({ title, type, body_export, nid, field_image_export, field_new_photo, 
                 field_publication_date_export, field_news_categories_export, field_display_export,
                 changed}: any) => ({
                  body: isNotEmpty(body_export) ? body_export : '',
                  title: isNotEmpty(title) ? decodeHTMLTags(title) : '',
                  nid,
                  image: getArticleImage(field_image_export,field_new_photo),
                  field_news_categories_export,
                  displayType: isNotEmpty(field_display_export) ? field_display_export.toLowerCase() : '',
                  field_publication_date_export,
                  type,
                  changed
                })
            );
    }
    return formattedData
  }

export function* fetchEntityQueueInfo(action: FetchEntityQueueType) {
    try{
        const payload: EntityQueueListType = yield call(
            fetchEntityQueueAPI,
            action.payload
        );
        const response = parseArticleSectionSuccess(payload);
        yield put(fetchEntityQueueSuccess({entityQueueList: response}));
    } catch(error) {
        const errorResponse: AxiosError = error as AxiosError;
        yield put(fetchEntityQueueFailed({entityQueueListError: errorResponse.message}));
    }
}

export function* entityQueueSaga() {
    yield all([
        takeLatest(FETCH_ENTITY_QUEUE_DATA, fetchEntityQueueInfo)
    ])
}

export default entityQueueSaga;
