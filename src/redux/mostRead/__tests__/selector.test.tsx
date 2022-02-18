import { storeInfo } from "src/constants/SampleData"
import { getMostReadData } from "../selectors"
import { MostReadItemType } from "../types"

describe('LatestNewsTab Selector', () => {
    const storeData = storeInfo[0]
    test('Get mostRead  state', () => {
        const mostRead: MostReadItemType[] = getMostReadData(storeData)
        expect(mostRead).toEqual([])
    })
})