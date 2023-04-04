import { FETCH_ARABIC_DATA } from "./actionType";
import { FetchArabicWordsAction } from "./types";

const initialData = {
    arabic:{}
}

export default (state = initialData,action:FetchArabicWordsAction) => {
    if(action.type === FETCH_ARABIC_DATA){
        state.arabic = {...action.payload}
                return state.arabic
    } else {
        return state
    }
}
