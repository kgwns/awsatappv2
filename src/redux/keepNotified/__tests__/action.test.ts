import { getListOfNotification, getListOfNotificationFailed, getListOfNotificationSuccess, getSelectedNotification, getSelectedNotificationFailed, getSelectedNotificationSuccess, removeNotificationInfo, removeSelectedNotification, sendSelectedNotification, sendSelectedNotificationFailed, sendSelectedNotificationSuccess } from "../action"
import { GET_LIST_OF_NOTIFICATION, GET_LIST_OF_NOTIFICATION_FAILED, GET_LIST_OF_NOTIFICATION_SUCCESS, GET_SELECTED_NOTIFICATION, GET_SELECTED_NOTIFICATION_FAILED, GET_SELECTED_NOTIFICATION_SUCCESS, REMOVE_NOTIFICATION_INFO, REMOVE_SELECTED_NOTIFICATION, SEND_SELECTED_NOTIFICATION, SEND_SELECTED_NOTIFICATION_FAILED, SEND_SELECTED_NOTIFICATION_SUCCESS } from "../actionType"

describe('<KeepNotification Action', () => {
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

    it('Check send selected notification', () => {
        const result = sendSelectedNotification({nid})
        expect(result.type).toEqual(SEND_SELECTED_NOTIFICATION)
        expect(result.payload.nid).toEqual(nid)
    })

    it('Check send selected notification success', () => {
        const result = sendSelectedNotificationSuccess({message: sendResponse})
        expect(result.type).toEqual(SEND_SELECTED_NOTIFICATION_SUCCESS)
        expect(result.payload.message).toEqual(sendResponse)
    })

    it('Check send selected notification failed', () => {
        const result = sendSelectedNotificationFailed({error: errorMessage})
        expect(result.type).toEqual(SEND_SELECTED_NOTIFICATION_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })

    it('Check request selected notification', () => {
        const result = getSelectedNotification()
        expect(result.type).toEqual(GET_SELECTED_NOTIFICATION)
    })

    it('Check request removeNotificationInfo', () => {
        const result = removeNotificationInfo()
        expect(result.type).toEqual(REMOVE_NOTIFICATION_INFO)
    })

    it('Check request removeSelectedNotification', () => {
        const result = removeSelectedNotification()
        expect(result.type).toEqual(REMOVE_SELECTED_NOTIFICATION)
    })

    it('Check request getListOfNotification', () => {
        const result = getListOfNotification()
        expect(result.type).toEqual(GET_LIST_OF_NOTIFICATION)
    })

    it('Check request getListOfNotificationSuccess', () => {
        const result = getListOfNotificationSuccess(getNotificationResponse)
        expect(result.type).toEqual(GET_LIST_OF_NOTIFICATION_SUCCESS)
    })

    it('Check  getListOfNotificationFailed', () => {
        const result = getListOfNotificationFailed({error: errorMessage})
        expect(result.type).toEqual(GET_LIST_OF_NOTIFICATION_FAILED)
    })

    it('Check request selected notification success', () => {
        const result = getSelectedNotificationSuccess(getNotificationResponse)
        expect(result.type).toEqual(GET_SELECTED_NOTIFICATION_SUCCESS)
        expect(result.payload.code).toEqual(200)
    })

    it('Check request selected notification Failed', () => {
        const result = getSelectedNotificationFailed({error: errorMessage})
        expect(result.type).toEqual(GET_SELECTED_NOTIFICATION_FAILED)
        expect(result.payload.error).toEqual(errorMessage)
    })
    
})