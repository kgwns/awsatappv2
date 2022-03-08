import { sendSelectedNewsLetters, sendSelectedNewsLettersSuccess, sendSelectedNewsLettersFailed, getSelectedNewsLettersFailed, getSelectedNewsLettersSuccess, getSelectedNewsletters } from 'src/redux/newsLetter/action';
import { GET_SELECTED_NEWS_LETTERS, GET_SELECTED_NEWS_LETTERS_ERROR, GET_SELECTED_NEWS_LETTERS_SUCCESS, SEND_SELECTED_NEWS_LETTERS, SEND_SELECTED_NEWS_LETTERS_ERROR, SEND_SELECTED_NEWS_LETTERS_SUCCESS } from '../actionTypes';

describe('News Letter Action', () => {

    test('Check request send news letters data type', () => {
        const request = sendSelectedNewsLetters({ tid: '123' })
        expect(request.type).toEqual(SEND_SELECTED_NEWS_LETTERS)
    })

    test('Check request send news letters data success type', () => {
        const request = sendSelectedNewsLettersSuccess({
            saveData: {}
        })
        expect(request.type).toEqual(SEND_SELECTED_NEWS_LETTERS_SUCCESS)
    })

    test('Check request send news letters data failed type', () => {
        const request = sendSelectedNewsLettersFailed({
            error: ''
        })
        expect(request.type).toEqual(SEND_SELECTED_NEWS_LETTERS_ERROR)
    })

    test('Check request get news letters data type', () => {
        const request = getSelectedNewsletters()
        expect(request.type).toEqual(GET_SELECTED_NEWS_LETTERS)
    })

    test('Check request get news letters data success type', () => {
        const request = getSelectedNewsLettersSuccess({
            selectedNewsLettersData: {}
        })
        expect(request.type).toEqual(GET_SELECTED_NEWS_LETTERS_SUCCESS)
    })

    test('Check request get news letters data failed type', () => {
        const request = getSelectedNewsLettersFailed({
            error: ''
        })
        expect(request.type).toEqual(GET_SELECTED_NEWS_LETTERS_ERROR)
    })

})