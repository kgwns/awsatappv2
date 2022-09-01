import { sendSelectedNewsLetters, sendSelectedNewsLettersSuccess, sendSelectedNewsLettersFailed, getSelectedNewsLettersFailed, getSelectedNewsLettersSuccess, getSelectedNewsletters, getMyNewsletters, emptySelectedNewsLettersInfo, setSelectedDataFromNewsLetterOnboard, emptySelectedNewsletterDataFromOnboard } from 'src/redux/newsLetter/action';
import { EMPTY_SELECTED_NEWSLETTER_DATA_FROM_ONBOARD, EMPTY_SELECTED_NEWS_LETTERS_INFO, GET_MY_NEWS_LETTERS, GET_SELECTED_NEWS_LETTERS, GET_SELECTED_NEWS_LETTERS_ERROR, GET_SELECTED_NEWS_LETTERS_SUCCESS, SELECTED_DATA_FROM_NEWSLETTER_ONBOARD, SEND_SELECTED_NEWS_LETTERS, SEND_SELECTED_NEWS_LETTERS_ERROR, SEND_SELECTED_NEWS_LETTERS_SUCCESS } from '../actionTypes';

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

    test('getMyNewsletters', () => {
        const request = getMyNewsletters()
        expect(request.type).toEqual(GET_MY_NEWS_LETTERS)
    })

    test('emptySelectedNewsLettersInfo', () => {
        const request = emptySelectedNewsLettersInfo()
        expect(request.type).toEqual(EMPTY_SELECTED_NEWS_LETTERS_INFO)
    })

    test('setSelectedDataFromNewsLetterOnboard', () => {
        const request = setSelectedDataFromNewsLetterOnboard({data: []})
        expect(request.type).toEqual(SELECTED_DATA_FROM_NEWSLETTER_ONBOARD)
    })

    test('emptySelectedNewsletterDataFromOnboard', () => {
        const request = emptySelectedNewsletterDataFromOnboard()
        expect(request.type).toEqual(EMPTY_SELECTED_NEWSLETTER_DATA_FROM_ONBOARD)
    })

})