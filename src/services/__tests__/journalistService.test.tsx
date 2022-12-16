import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getJournalistArticleService } from '../journalistService';
import * as serviceApi from 'src/services/api';
describe('Test Side Menu Services', () => {
    const mock = new MockAdapter(axios);
    const journalistPayload = { nid: '1', page: 1 };
    beforeEach(() => {
        jest.useFakeTimers('legacy');
    });

    afterEach(() => {
        mock.reset();
    });

    it('test when response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return getJournalistArticleService(journalistPayload).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test getJournalistArticleService throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

        return getJournalistArticleService(journalistPayload).catch((error) => {
            expect(error.message).toEqual('Not able to fetch api')
        });
    });
});
