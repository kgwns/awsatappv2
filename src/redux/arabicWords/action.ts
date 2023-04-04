import { FETCH_ARABIC_DATA } from "./actionType"
import { FetchArabicWordsPayloadType } from "./types"

export const fetchArabicWords = (payload:FetchArabicWordsPayloadType) => {
    return{
        type: FETCH_ARABIC_DATA,
        payload
    }
}
