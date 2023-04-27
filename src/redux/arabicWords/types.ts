import { FETCH_ARABIC_DATA } from "./actionType";

export interface FetchArabicWordsPayloadType {
    arabic:any;
}

export type FetchArabicWordsType = {
    type: typeof FETCH_ARABIC_DATA,
    payload: FetchArabicWordsPayloadType
}

export type FetchArabicWordsAction = FetchArabicWordsType;
