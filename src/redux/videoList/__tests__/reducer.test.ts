import { FETCH_VIDEO, FETCH_VIDEO_FAILED, FETCH_VIDEO_SUCCESS } from '../actionTypes'
import videoList from '../reducer'
import { VideoState } from '../types'

describe('VideoList Reducer', () => {

    const errorMessage = 'This is sample error'

    let initialState: VideoState;
    beforeEach(() => {
        initialState = {
            isLoading: true,
            videoData: [],
            error: ''
        }
    })

    test('Check loading state when request API', () => {
        const nextState = videoList(initialState, {
            type: FETCH_VIDEO,
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of static detail API', () => {
        const nextState = videoList(initialState, {
            type: FETCH_VIDEO_SUCCESS,
            payload: { videoData: [] }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of static detail API', () => {
        const nextState = videoList(initialState, {
            type: FETCH_VIDEO_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Default State', () => {
        const nextState = videoList(
          initialState, { type:'' }
        )
        expect(nextState.isLoading).toBeTruthy()
      })
})