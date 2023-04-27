import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { GetSelectedNewsLettersSuccessPayloadType, 
    GetSelectedNewsLettersType, 
    SendSelectedNewsLettersType, 
    GetMyNewsLettersType, 
    GetMyNewsLettersSuccessPayloadType } from "./types";
import { getSelectedNewsLettersFailed, 
    getSelectedNewsLettersSuccess, 
    sendSelectedNewsLettersFailed, 
    sendSelectedNewsLettersSuccess, 
    getMyNewsLettersSuccess, 
    getMyNewsLettersFailed } from './action';
import { GET_SELECTED_NEWS_LETTERS, SEND_SELECTED_NEWS_LETTERS, GET_MY_NEWS_LETTERS } from './actionTypes';
import { getSelectedNewsLettersApi, sendSelectedNewsLettersApi, getMyNewsLettersApi } from 'src/services/newsLettersService';

export function* postSelectedNewsLetters(action: SendSelectedNewsLettersType) {
    try {
        const payload: { message: any } = yield call(
            sendSelectedNewsLettersApi,
            action.payload,
        );
        yield put(sendSelectedNewsLettersSuccess({ saveData: payload.message }));
    } catch (error) {
        const errorResponse: AxiosError = error as AxiosError;
        if (errorResponse.response) {
            const errorMessage: { message: string } = errorResponse.response.data;
            yield put(sendSelectedNewsLettersFailed({ error: errorMessage.message }));
        }
    }
}

export function* getSelectedNewsLetters(action: GetSelectedNewsLettersType) {
    try {
        const payload: GetSelectedNewsLettersSuccessPayloadType = yield call(
            getSelectedNewsLettersApi,
        );
        yield put(getSelectedNewsLettersSuccess({ selectedNewsLettersData: payload }));
    } catch (error) {
        const errorResponse: AxiosError = error as AxiosError;
        if (errorResponse.response) {
            const errorMessage: { message: string } = errorResponse.response.data;
            yield put(getSelectedNewsLettersFailed({ error: errorMessage.message }));
        }
    }
}

export function* getMyNewsLetters(action: GetMyNewsLettersType) {
    try {
        const payload: GetMyNewsLettersSuccessPayloadType = yield call(
            getMyNewsLettersApi,
        );
        yield put(getMyNewsLettersSuccess({ myNewsLettersData: payload }));
    } catch (error) {
        const errorResponse: AxiosError = error as AxiosError;
        if (errorResponse.response) {
            const errorMessage: { message: string } = errorResponse.response.data;
            yield put(getMyNewsLettersFailed({ error: errorMessage.message }));
        }
    }
}


function* newsLettersSaga() {
    yield all([takeLatest(SEND_SELECTED_NEWS_LETTERS, postSelectedNewsLetters)]);
    yield all([takeLatest(GET_SELECTED_NEWS_LETTERS, getSelectedNewsLetters)]);
    yield all([takeLatest(GET_MY_NEWS_LETTERS, getMyNewsLetters)]);
}

export default newsLettersSaga;
