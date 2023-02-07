import { EMPTY_SELECTED_NEWS_LETTERS_INFO, 
    GET_SELECTED_NEWS_LETTERS, 
    GET_SELECTED_NEWS_LETTERS_ERROR, 
    GET_SELECTED_NEWS_LETTERS_SUCCESS, 
    SEND_SELECTED_NEWS_LETTERS, 
    SEND_SELECTED_NEWS_LETTERS_ERROR, 
    SEND_SELECTED_NEWS_LETTERS_SUCCESS, 
    GET_MY_NEWS_LETTERS, GET_MY_NEWS_LETTERS_SUCCESS, 
    GET_MY_NEWS_LETTERS_ERROR, 
    EMPTY_SELECTED_NEWSLETTER_DATA_FROM_ONBOARD, 
    SELECTED_DATA_FROM_NEWSLETTER_ONBOARD  } from "./actionTypes";
import { GetSelectedNewsLettersFailedPayloadtype, 
    GetSelectedNewsLettersFailedType, 
    GetSelectedNewsLettersSuccessPayloadType, 
    GetSelectedNewsLettersSuccessType, 
    SendSelectedNewsLettersBody, 
    SendSelectedNewsLettersFailedPayloadtype, 
    SendSelectedNewsLettersFailedType, 
    SendSelectedNewsLettersSuccessType, 
    SendSelectedNewsLettesrsSuccessPayloadType, 
    GetMyNewsLettersSuccessType, GetMyNewsLettersSuccessPayloadType, 
    GetMyNewsLettersFailedType, GetMyNewsLettersFailedPayloadtype, 
    SelectedDataFromNewsLetterOnboardPayload,  } from "./types";

export const sendSelectedNewsLetters = (payload: SendSelectedNewsLettersBody) => {
    return {
        type: SEND_SELECTED_NEWS_LETTERS,
        payload,
    };
};

export const sendSelectedNewsLettersSuccess = (
    payload: SendSelectedNewsLettesrsSuccessPayloadType,
): SendSelectedNewsLettersSuccessType => {
    return {
        type: SEND_SELECTED_NEWS_LETTERS_SUCCESS,
        payload,
    };
};

export const sendSelectedNewsLettersFailed = (
    payload: SendSelectedNewsLettersFailedPayloadtype,
): SendSelectedNewsLettersFailedType => {
    return {
        type: SEND_SELECTED_NEWS_LETTERS_ERROR,
        payload,
    };
};

export const getSelectedNewsletters = () => {
    return {
        type: GET_SELECTED_NEWS_LETTERS,
    };
};

export const getSelectedNewsLettersSuccess = (
    payload: GetSelectedNewsLettersSuccessPayloadType,
): GetSelectedNewsLettersSuccessType => {
    return {
        type: GET_SELECTED_NEWS_LETTERS_SUCCESS,
        payload,
    };
};

export const getSelectedNewsLettersFailed = (
    payload: GetSelectedNewsLettersFailedPayloadtype,
): GetSelectedNewsLettersFailedType => {
    return {
        type: GET_SELECTED_NEWS_LETTERS_ERROR,
        payload,
    };
};

export const getMyNewsletters = () => {
    return {
        type: GET_MY_NEWS_LETTERS,
    };
};

export const getMyNewsLettersSuccess = (
    payload: GetMyNewsLettersSuccessPayloadType,
): GetMyNewsLettersSuccessType => {
    return {
        type: GET_MY_NEWS_LETTERS_SUCCESS,
        payload,
    };
};

export const getMyNewsLettersFailed = (
    payload: GetMyNewsLettersFailedPayloadtype,
): GetMyNewsLettersFailedType => {
    return {
        type: GET_MY_NEWS_LETTERS_ERROR,
        payload,
    };
};

export const emptySelectedNewsLettersInfo = () => {
    return {
        type: EMPTY_SELECTED_NEWS_LETTERS_INFO,
    };
};

export const setSelectedDataFromNewsLetterOnboard = (payload: SelectedDataFromNewsLetterOnboardPayload) => {
    return {
        type: SELECTED_DATA_FROM_NEWSLETTER_ONBOARD,
        payload,
    };
};

export const emptySelectedNewsletterDataFromOnboard = () => {
    return {
        type: EMPTY_SELECTED_NEWSLETTER_DATA_FROM_ONBOARD
    }
}
