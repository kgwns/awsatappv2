import {
    EMPTY_SELECTED_NEWS_LETTERS_INFO,
    GET_SELECTED_NEWS_LETTERS, GET_SELECTED_NEWS_LETTERS_ERROR, 
    GET_SELECTED_NEWS_LETTERS_SUCCESS, SEND_SELECTED_NEWS_LETTERS, 
    SEND_SELECTED_NEWS_LETTERS_ERROR, SEND_SELECTED_NEWS_LETTERS_SUCCESS,
    GET_MY_NEWS_LETTERS, GET_MY_NEWS_LETTERS_SUCCESS, 
    GET_MY_NEWS_LETTERS_ERROR, SELECTED_DATA_FROM_NEWSLETTER_ONBOARD, 
    EMPTY_SELECTED_NEWSLETTER_DATA_FROM_ONBOARD,
} from './actionTypes';
import { NewsLettersActions, NewsLetterState } from './types';

const initialState: NewsLetterState = {
    error: '',
    isLoading: false,
    sendNewsLettersInfo: {},
    selectedNewsLettersData: {},
    isMyNewsLoading: false,
    myNewsError: '',
    myNewsLetters: {},
    selectedDataFromNewsLetterOnboard: [],
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
        case GET_MY_NEWS_LETTERS:
            return { ...state, isMyNewsLoading: true }
        case GET_MY_NEWS_LETTERS_SUCCESS:
            return { ...state, isMyNewsLoading: false, myNewsLetters: action.payload.myNewsLettersData, myNewsError: '' }
        case GET_MY_NEWS_LETTERS_ERROR:
            return { ...state, isMyNewsLoading: false, myNewsError: action.payload.error }
        case EMPTY_SELECTED_NEWS_LETTERS_INFO:
            return { ...state, isLoading: false, sendNewsLettersInfo: {}, error: '', myNewsLetters: {}, myNewsError: '', isMyNewsLoading: false}
        case SELECTED_DATA_FROM_NEWSLETTER_ONBOARD:
            return { ...state, selectedDataFromNewsLetterOnboard: action.payload }
        case EMPTY_SELECTED_NEWSLETTER_DATA_FROM_ONBOARD:
            return { ...state, selectedDataFromNewsLetterOnboard: [] }
        default:
            return { ...state };
    }
};
