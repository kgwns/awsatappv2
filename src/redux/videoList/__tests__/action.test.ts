import { fetchVideoList, fetchVideoListSuccess, fetchVideoListFailed } from "../action"
import { FETCH_VIDEO, FETCH_VIDEO_FAILED, FETCH_VIDEO_SUCCESS } from "../actionTypes"



describe('<TermsAndAboutUs Action', () => {
    const id: number = 56
    const errorMessage = 'This is sample error'

    it('Check requestVideoList', () => {
        const result = fetchVideoList()
        expect(result.type).toEqual(FETCH_VIDEO)
    })

    it('Check request requestVideoList success', () => {
        const result = fetchVideoListSuccess({ videoData: [] })
        expect(result.type).toEqual(FETCH_VIDEO_SUCCESS)
        expect(result.payload.videoData).toEqual([])
    })

    it('Check requestVideoList failed', () => {
        const result = fetchVideoListFailed({ error: errorMessage })
        expect(result.type).toEqual(FETCH_VIDEO_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })
})