import { AppState, Selector } from "../rootReducer";

export const getArabicData: Selector<any> = (state: AppState)  => state.arabicWords;
