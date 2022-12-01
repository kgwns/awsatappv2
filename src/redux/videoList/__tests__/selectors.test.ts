import { storeInfo } from "src/constants/Constants"
import { getIsLoading, getVideoData, getVideoError} from "../selectors"
import { VideoItemType } from "../types"

describe('VideoList Selector', () => {
    const storeData = storeInfo[0]
    it('Get getIsLoading state', () => {
        const isLoading: boolean = getIsLoading(storeData)
        expect(isLoading).toEqual(false)
    })

    it('test getVideoData', () => {
        const data: VideoItemType[] = getVideoData(storeData)
        expect(data).toEqual([])
    })
    it('test getVideoError', () => {
        const error: string = getVideoError(storeData)
        expect(error).toEqual('')
    })
})
