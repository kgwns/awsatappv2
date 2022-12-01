import { FETCH_ARABIC_DATA } from "./actionType"
import { fetchArabicWordsPayloadType } from "./types"

export const fetchArabicWords = (payload:fetchArabicWordsPayloadType) => {
    return{
        type: FETCH_ARABIC_DATA,
        payload
    }
}
