import { storeInfo } from "src/constants/Constants"
import { getIsLoading, getTopMenuData, getTopMenuError} from "../selectors"
import { TopMenuItemType } from "../types"

describe('TopMenu Selector', () => {
    const storeData = storeInfo[0]
    it('Get getIsLoading state', () => {
        const isLoading: boolean = getIsLoading(storeData)
        expect(isLoading).toEqual(false)
    })

    it('test getTopMenuData', () => {
        const data: TopMenuItemType[] = getTopMenuData(storeData)
        expect(data).toEqual([])
    })
    it('test getTopMenuError', () => {
        const error: string = getTopMenuError(storeData)
        expect(error).toEqual('')
    })
})
