import { KeepNotifiedState } from '../types'
import { GET_LIST_OF_NOTIFICATION, GET_LIST_OF_NOTIFICATION_FAILED, GET_LIST_OF_NOTIFICATION_SUCCESS, GET_SELECTED_NOTIFICATION, GET_SELECTED_NOTIFICATION_FAILED, GET_SELECTED_NOTIFICATION_SUCCESS, REMOVE_NOTIFICATION_INFO, REMOVE_SELECTED_NOTIFICATION, SEND_SELECTED_NOTIFICATION, SEND_SELECTED_NOTIFICATION_FAILED, SEND_SELECTED_NOTIFICATION_SUCCESS } from '../actionType'
import keepNotifiedReducer from '../reducer'

describe('KeepNotified Reducer', () => {
    const nid: string = '123'
    const sendResponse = {
        code: 200,
        message: 'Success'
    }

    const getNotificationResponse = {
        code: 200,
        message: 'success',
        data: []
    }

    const errorMessage = 'This is sample error'

    let initialState: KeepNotifiedState;
    beforeEach(() => {
        initialState = {
            isLoading: false,
            sendSelectedError: '',
            sendSelectedNotificationInfo: {},
            getSelectedNotificationInfo: {},
            getSelectedError: '',
            allNotificationList: {},
            allNotificationListError: '',
            isMyNotificationLoading: false,
        }
    })

    test('Check loading state when request API', () => {
        const nextState = keepNotifiedReducer(initialState, {
            type: SEND_SELECTED_NOTIFICATION,
            payload: { nid: nid }
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of send keep notified details API', () => {
        const nextState = keepNotifiedReducer(initialState, {
            type: SEND_SELECTED_NOTIFICATION_SUCCESS,
            payload: {message: sendResponse}
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of send keep notified details API', () => {
        const nextState = keepNotifiedReducer(initialState, {
            type: SEND_SELECTED_NOTIFICATION_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request Related Article API', () => {
        const nextState = keepNotifiedReducer(initialState, {
            type: GET_SELECTED_NOTIFICATION
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Success of keep notification details API', () => {
        const nextState = keepNotifiedReducer(initialState, {
            type: GET_SELECTED_NOTIFICATION_SUCCESS,
            payload: getNotificationResponse
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of keep notification details API', () => {
        const nextState = keepNotifiedReducer(initialState, {
            type: GET_SELECTED_NOTIFICATION_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request Related Article API', () => {
        const nextState = keepNotifiedReducer(initialState, {
            type: GET_LIST_OF_NOTIFICATION
        })
        expect(nextState.isLoading).toBe(true)
    })

    test('On Success of keep notification details API', () => {
        const nextState = keepNotifiedReducer(initialState, {
            type: GET_LIST_OF_NOTIFICATION_SUCCESS,
            payload: getNotificationResponse
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('On Failed of keep notification details API', () => {
        const nextState = keepNotifiedReducer(initialState, {
            type: GET_LIST_OF_NOTIFICATION_FAILED,
            payload: { error: errorMessage }
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request Related Article API', () => {
        const nextState = keepNotifiedReducer(initialState, {
            type: REMOVE_NOTIFICATION_INFO
        })
        expect(nextState.isLoading).toBe(false)
    })

    test('Check loading state when request Related Article API', () => {
        const nextState = keepNotifiedReducer(initialState, {
            type: REMOVE_SELECTED_NOTIFICATION
        })
        expect(nextState.isLoading).toBe(false)
    })
})