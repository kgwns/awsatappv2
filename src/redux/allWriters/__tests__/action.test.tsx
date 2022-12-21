import { AllWritersBodyGet } from 'src/redux/allWriters/types';
import {
    FETCH_ALL_WRITERS,
    FETCH_ALL_WRITERS_SUCCESS,
    FETCH_ALL_WRITERS_ERROR,
    SEND_SELECTED_AUTHOR,
    SEND_SELECTED_AUTHOR_SUCCESS,
    SEND_SELECTED_AUTHOR_ERROR,
    GET_SELECTED_AUTHOR,
    GET_SELECTED_AUTHOR_ERROR,
    GET_SELECTED_AUTHOR_SUCCESS,
    EMPTY_SELECTED_AUTHORS_INFO,
    REMOVE_AUTHOR,
    FETCH_ALL_SELECTED_WRITERS_DETAILS,
    DESELECT_ALL_WRITERS,
    SELECTED_DATA_FROM_ONBOARD,
    EMPTY_SEND_AUTHOR_INFO,
    EMPTY_SELECTED_WRITERS_DATA_FROM_ONBOARD,
} from 'src/redux/allWriters/actionTypes';
import { fetchAllWritersFailed, fetchAllWritersSuccess, fetchAllWriters, sendSelectedAuthor, sendSelectedAuthorSuccess, sendSelectedAuthorFailed, getSelectedAuthors, getSelectedAuthorsSuccess, getSelectedAuthorsFailed, emptySelectedAuthorsInfo, removeAuthor, fetchAllSelectedWritersDetails, deselectAllWriters, setSelectedDataFromOnboard, emptySendAuthorInfo, emptySelectedWritersDataFromOnboard } from 'src/redux/allWriters/action';

describe('AllWriters Action', () => {
    const payload: AllWritersBodyGet = {
        items_per_page: 10,
    }

    test('Check request all writers data type', () => {
        const request = fetchAllWriters(payload)
        expect(request).toEqual({
            type: FETCH_ALL_WRITERS,
            payload
        })
    })

    test('Check request all writers data success type', () => {
        const request = fetchAllWritersSuccess({
            allWritersListData: []
        })
        expect(request.type).toEqual(FETCH_ALL_WRITERS_SUCCESS)
    })

    test('Check request all writers data failed type', () => {
        const request = fetchAllWritersFailed({
            error: ''
        })
        expect(request.type).toEqual(FETCH_ALL_WRITERS_ERROR)
    })

    test('Check request send writers data type', () => {
        const request = sendSelectedAuthor({ tid: '123', isList: false })
        expect(request.type).toEqual(SEND_SELECTED_AUTHOR)
    })

    test('Check request send writers data success type', () => {
        const request = sendSelectedAuthorSuccess({
            saveData: {}
        })
        expect(request.type).toEqual(SEND_SELECTED_AUTHOR_SUCCESS)
    })

    test('Check request send writers data failed type', () => {
        const request = sendSelectedAuthorFailed({
            error: ''
        })
        expect(request.type).toEqual(SEND_SELECTED_AUTHOR_ERROR)
    })

    test('Check request get selected writers data type', () => {
        const request = getSelectedAuthors()
        expect(request.type).toEqual(GET_SELECTED_AUTHOR)
    })

    test('Check request get selected writers data success type', () => {
        const request = getSelectedAuthorsSuccess({
            selectedAuthorsData: {}
        })
        expect(request.type).toEqual(GET_SELECTED_AUTHOR_SUCCESS)
    })

    test('Check request get selected writers data failed type', () => {
        const request = getSelectedAuthorsFailed({
            error: ''
        })
        expect(request.type).toEqual(GET_SELECTED_AUTHOR_ERROR)
    })

    test('Check request emptySelectedAuthorsInfo', () => {
        const request = emptySelectedAuthorsInfo()
        expect(request.type).toEqual(EMPTY_SELECTED_AUTHORS_INFO)
    })

    test('Check request removeAuthor', () => {
        const request = removeAuthor({
            tid: '2'
        })
        expect(request.type).toEqual(REMOVE_AUTHOR)
    })

    test('Check request fetchAllSelectedWritersDetails', () => {
        const request = fetchAllSelectedWritersDetails({
            tid: '2',
            items_per_page: 2
        })
        expect(request.type).toEqual(FETCH_ALL_SELECTED_WRITERS_DETAILS)
    })

    test('Check request deselectAllWriters', () => {
        const request = deselectAllWriters()
        expect(request.type).toEqual(DESELECT_ALL_WRITERS)
    })

    test('Check request emptySendAuthorInfo', () => {
        const request = emptySendAuthorInfo()
        expect(request.type).toEqual(EMPTY_SEND_AUTHOR_INFO)
    })

    test('Check request emptySelectedWritersDataFromOnboard', () => {
        const request = emptySelectedWritersDataFromOnboard()
        expect(request.type).toEqual(EMPTY_SELECTED_WRITERS_DATA_FROM_ONBOARD)
    })

    test('Check request setSelectedDataFromOnboard', () => {
        const request = setSelectedDataFromOnboard({
            data: []
        })
        expect(request.type).toEqual(SELECTED_DATA_FROM_ONBOARD)
    })
})