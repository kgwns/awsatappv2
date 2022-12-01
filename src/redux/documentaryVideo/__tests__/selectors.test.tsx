import { storeInfo } from "src/constants/Constants"
import { getIsLoading, getDocumentaryVideo, getDocumentaryVideoError} from "../selectors"
import { VideoItemType } from "../types"

describe('VideoDocumentary Selector', () => {
    const storeData = storeInfo[0]
    it('Get getIsLoading state', () => {
        const isLoading: boolean = getIsLoading(storeData)
        expect(isLoading).toEqual(false)
    })

    it('test getVideoData', () => {
        const data: VideoItemType[] = getDocumentaryVideo(storeData)
        expect(data).toEqual([])
    })
    it('test getVideoError', () => {
        const error: string = getDocumentaryVideoError(storeData)
        expect(error).toEqual('')
    })
})
