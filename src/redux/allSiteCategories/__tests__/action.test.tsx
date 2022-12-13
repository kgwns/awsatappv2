import { AllSiteCategoriesBodyGet } from 'src/redux/allSiteCategories/types';
import {
   FETCH_ALL_SITE_CATEGORIES,
   FETCH_ALL_SITE_CATEGORIES_SUCCESS,
   FETCH_ALL_SITE_CATEGORIES_ERROR,
   SEND_SELECTED_TOPIC,
   SEND_SELECTED_TOPIC_ERROR,
   SEND_SELECTED_TOPIC_SUCCESS,
   EMPTY_SELECTED_TOPICS_INFO,
   DESELECT_ALL_TOPICS_INFO,
   EMPTY_SEND_TOPICS_INFO,
   GET_SELECTED_TOPICS,
   GET_SELECTED_TOPICS_SUCCESS,
   GET_SELECTED_TOPICS_ERROR
} from 'src/redux/allSiteCategories/actionTypes';
import { fetchAllSiteCategories, fetchAllSiteCategoriesSuccess, fetchAllSiteCategoriesFailed,
    sendSelectedTopic, sendSelectedTopicSuccess, sendSelectedTopicFailed, emptySelectedTopicsInfo, emptySendTopicsInfo, getSelectedTopics, deselectAllTopicsInfo, getSelectedTopicsSuccess, getSelectedTopicsFailed } from 'src/redux/allSiteCategories/action';


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

    test('Check request emptySelectedTopicsInfo', () => {
        const request = emptySelectedTopicsInfo()
        expect(request.type).toEqual(EMPTY_SELECTED_TOPICS_INFO)
    })

    test('Check request emptySendTopicsInfo', () => {
        const request = emptySendTopicsInfo()
        expect(request.type).toEqual(EMPTY_SEND_TOPICS_INFO)
    })

    test('Check request getSelectedTopics', () => {
        const request = getSelectedTopics()
        expect(request.type).toEqual(GET_SELECTED_TOPICS)
    })

    test('Check request deselectAllTopicsInfo', () => {
        const request = deselectAllTopicsInfo({})
        expect(request.type).toEqual(DESELECT_ALL_TOPICS_INFO)
    })

    test('Check request getSelectedTopicsSuccess', () => {
        const request = getSelectedTopicsSuccess({selectedTopicsData:''})
        expect(request.type).toEqual(GET_SELECTED_TOPICS_SUCCESS)
    })

    test('Check request getSelectedTopicsFailed', () => {
        const request = getSelectedTopicsFailed({error:''})
        expect(request.type).toEqual(GET_SELECTED_TOPICS_ERROR)
    })
})