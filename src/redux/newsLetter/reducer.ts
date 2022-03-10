import {
    EMPTY_SELECTED_NEWS_LETTERS_INFO,
    GET_SELECTED_NEWS_LETTERS, GET_SELECTED_NEWS_LETTERS_ERROR, GET_SELECTED_NEWS_LETTERS_SUCCESS, SEND_SELECTED_NEWS_LETTERS, SEND_SELECTED_NEWS_LETTERS_ERROR, SEND_SELECTED_NEWS_LETTERS_SUCCESS
} from './actionTypes';
import { NewsLettersActions, NewsLetterState } from './types';

const initialState: NewsLetterState = {
    error: '',
    isLoading: false,
    sendNewsLettersInfo: {},
    selectedNewsLettersData: {},
};

export default (state = initialState, action: NewsLettersActions) => {
    switch (action.type) {
        case SEND_SELECTED_NEWS_LETTERS:
            return { ...state, isLoading: true }
        case SEND_SELECTED_NEWS_LETTERS_SUCCESS:
            return { ...state, isLoading: false, sendNewsLettersInfo: action.payload.saveData }
        case SEND_SELECTED_NEWS_LETTERS_ERROR:
            return { ...state, isLoading: false, error: action.payload.error }
        case GET_SELECTED_NEWS_LETTERS:
            return { ...state, isLoading: true }
        case GET_SELECTED_NEWS_LETTERS_SUCCESS:
            return { ...state, isLoading: false, selectedNewsLettersData: action.payload.selectedNewsLettersData, error: '' }
        case GET_SELECTED_NEWS_LETTERS_ERROR:
            return { ...state, isLoading: false, error: action.payload.error }
        case EMPTY_SELECTED_NEWS_LETTERS_INFO:
            return { ...state, isLoading: false, sendNewsLettersInfo: {}, error: '', }
        default:
            return { ...state };
    }
};