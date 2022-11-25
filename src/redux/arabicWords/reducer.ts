import { FETCH_ARABIC_DATA } from "./actionType";
import { FetchArabicWordsAction } from "./types";

const initialData = {
    arabic:{}
}

export default (state = initialData,action:FetchArabicWordsAction) => {
    switch(action.type) {
        case FETCH_ARABIC_DATA:
            state.arabic = {...action.payload}
            return state.arabic
        default:
            return state
    }
}