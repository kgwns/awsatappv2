import { AllSiteCategoriesBodyGet } from 'src/redux/allSiteCategories/types';
import {
   FETCH_ALL_SITE_CATEGORIES,
   FETCH_ALL_SITE_CATEGORIES_SUCCESS,
   FETCH_ALL_SITE_CATEGORIES_ERROR,
   SEND_SELECTED_TOPIC,
   SEND_SELECTED_TOPIC_ERROR,
   SEND_SELECTED_TOPIC_SUCCESS
} from 'src/redux/allSiteCategories/actionTypes';
import { fetchAllSiteCategories, fetchAllSiteCategoriesSuccess, fetchAllSiteCategoriesFailed,
    sendSelectedTopic, sendSelectedTopicSuccess, sendSelectedTopicFailed } from 'src/redux/allSiteCategories/action';


describe('AllWriters Action', () => {
    const payload: AllSiteCategoriesBodyGet = {
        items_per_page: 10,
    }

    test('Check request all site categories data type', () => {
        const request = fetchAllSiteCategories(payload)
        expect(request).toEqual({
            type: FETCH_ALL_SITE_CATEGORIES,
            payload
        })
    })

    test('Check request all site categories data success type', () => {
        const request = fetchAllSiteCategoriesSuccess({
            allSiteCategoriesListData: []
        })
        expect(request.type).toEqual(FETCH_ALL_SITE_CATEGORIES_SUCCESS)
    })

    test('Check request all site categories data failed type', () => {
        const request = fetchAllSiteCategoriesFailed({
            error: ''
        })
        expect(request.type).toEqual(FETCH_ALL_SITE_CATEGORIES_ERROR)
    })

    test('Check request send topics data type', () => {
        const request = sendSelectedTopic({tid: '123'})
        expect(request.type).toEqual(SEND_SELECTED_TOPIC)
    })

    test('Check request send topics data success type', () => {
        const request = sendSelectedTopicSuccess({
            saveData: {}
        })
        expect(request.type).toEqual(SEND_SELECTED_TOPIC_SUCCESS)
    })

    test('Check request send topics data failed type', () => {
        const request = sendSelectedTopicFailed({
            error: ''
        })
        expect(request.type).toEqual(SEND_SELECTED_TOPIC_ERROR)
    })
})