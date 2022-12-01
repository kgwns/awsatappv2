import { storeInfo } from "src/constants/Constants"
import { getIsLoading, getSideMenuData, getSideMenuError} from "../selectors"
import { SideMenuItemType } from "../types"

describe('LatestNewsTab Selector', () => {
    const storeData = storeInfo[0]
    it('Get getIsLoading state', () => {
        const isLoading: boolean = getIsLoading(storeData)
        expect(isLoading).toEqual(false)
    })

    it('test getSideMenuData', () => {
        const data: SideMenuItemType[] = getSideMenuData(storeData)
        expect(data).toEqual([])
    })
    it('test getSideMenuError', () => {
        const error: string = getSideMenuError(storeData)
        expect(error).toEqual('')
    })
})
