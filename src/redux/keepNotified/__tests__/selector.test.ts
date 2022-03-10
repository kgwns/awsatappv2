import { storeInfo } from "src/constants/SampleData"
import { getIsLoading, getSelectedNotificationSuccessInfo, sendSelectedNotificationErrorInfo, sendSelectedNotificationSuccessInfo } from "../selectors"
import { GetSelectedNotificationSuccessPayload, SendSelectedNotificationSuccessPayload } from "../types"

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
})
