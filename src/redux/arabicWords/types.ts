import { FETCH_ARABIC_DATA } from "./actionType";

export interface fetchArabicWordsPayloadType {
    arabic:any;
};

export type FetchArabicWordsType = {
    type: typeof FETCH_ARABIC_DATA,
    payload: fetchArabicWordsPayloadType
};

export type FetchArabicWordsAction = FetchArabicWordsType;