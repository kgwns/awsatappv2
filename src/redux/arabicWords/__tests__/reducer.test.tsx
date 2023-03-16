import { FetchArabicWordsAction } from "../types";
import { FETCH_ARABIC_DATA } from "../actionType";
import arabicWords from '../reducer'

describe('arabic Word reducer', () => {
    let initialState: {arabic:''};

    test('Check FETCH_ARABIC_DATA', () => {
        const nextState = arabicWords(initialState, {
            type: FETCH_ARABIC_DATA,
            payload:  {arabic:''}
        });
        expect(nextState).toHaveProperty("arabic","");
      });
})
