import { storeInfo } from "src/constants/Constants"
import { getData, getIsLoading, getError } from "../selectors"
import { StaticDetailDataType } from "../types"

describe('TermsAndAboutUs Selector', () => {
    const storeData = storeInfo[0]
    test('Get loading state', () => {
        const isLoading: boolean = getIsLoading(storeData)
        expect(isLoading).toEqual(true)
    })

    test('Get article detail state', () => {
        const data: StaticDetailDataType[] = getData(storeData)
        expect(data).toEqual([])
    })

    test('Get article detail error state', () => {
        const error: string = getError(storeData)
        expect(error).toEqual('')
    })
})
