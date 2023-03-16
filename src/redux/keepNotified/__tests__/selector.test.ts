import { storeInfo } from "src/constants/Constants"
import { getAllNotificationSuccessInfo, getIsMyNotificationLoading, getAllNotificationError, getIsLoading, getSelectedNotificationSuccessInfo, sendSelectedNotificationErrorInfo, sendSelectedNotificationSuccessInfo } from "../selectors"
import { GetListOfNotificationSuccessPayload, GetSelectedNotificationSuccessPayload, SendSelectedNotificationSuccessPayload } from "../types"

describe('KeepNotification Selector', () => {
    const storeData = storeInfo[0]
    test('Send Notification Get loading state', () => {
       const isLoading: boolean = getIsLoading(storeData)
       expect(isLoading).toEqual(true)
    })

    test('Send keep notified detail state', () => {
        const data: SendSelectedNotificationSuccessPayload = sendSelectedNotificationSuccessInfo(storeData)
        expect(data).toEqual({})
    })

    test('Send keep notified detail state', () => {
        const data: string = sendSelectedNotificationErrorInfo(storeData)
        expect(data).toEqual('')
    })
 
    test('Get keep notified detail state', () => {
         const data: GetSelectedNotificationSuccessPayload = getSelectedNotificationSuccessInfo(storeData)
         expect(data).toEqual({})
    })

    test('getAllNotificationSuccessInfo', () => {
        const allNotificationList: GetListOfNotificationSuccessPayload = getAllNotificationSuccessInfo(storeData)
        expect(allNotificationList).toEqual({})
    })

    test('getAllNotificationError', () => {
        const allNotificationListError: string = getAllNotificationError(storeData)
        expect(allNotificationListError).toEqual('')
    })

    test('getIsMyNotificationLoading', () => {
        const isMyNotificationLoading: boolean = getIsMyNotificationLoading(storeData)
        expect(isMyNotificationLoading).toEqual(false)
     })
})
