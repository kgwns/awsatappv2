
import { getSelectedNewsLetters, postSelectedNewsLetters } from '../sagas';
import { GET_SELECTED_NEWS_LETTERS, SEND_SELECTED_NEWS_LETTERS } from '../actionTypes';

const errorResponse = {
    response: { data: 'Error', status: 500, statusText: 'Error' },
};

describe('Test newsletters  error', () => {
    it('check postSelectedNewsLetters failed', () => {
        const genObject = postSelectedNewsLetters({
            type: SEND_SELECTED_NEWS_LETTERS,
            payload: { tid: '123' },
        });
        genObject.next();
        genObject.throw(errorResponse);
    });

    it('check getSelectedNewsLetters failed', () => {
        const genObject = getSelectedNewsLetters({
            type: GET_SELECTED_NEWS_LETTERS
        });
        genObject.next();
        genObject.throw(errorResponse);
    });
});
