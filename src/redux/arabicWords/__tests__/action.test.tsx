import {fetchArabicWords}  from "../action"
import { FETCH_ARABIC_DATA } from "../actionType"
import { FetchArabicWordsPayloadType } from "../types"

describe('<ArabicWordsAction', () => {
    const payload: FetchArabicWordsPayloadType = {
        arabic:'mockWord'
    }

    it('Check Player Control', () => {
        const result = fetchArabicWords(payload)
        expect(result.type).toEqual(FETCH_ARABIC_DATA)
        expect(result.payload).toEqual(payload)
    })
})