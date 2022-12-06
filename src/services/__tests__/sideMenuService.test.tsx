import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchSideMenuApi } from '../sideMenuService';
import * as serviceApi from 'src/services/api';
describe('Test Side Menu Services', () => {
    const mock = new MockAdapter(axios);

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

        return fetchSideMenuApi().then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when fetchSideMenuApi throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

        return fetchSideMenuApi().catch((error) => {
            expect(error.message).toEqual('Not able to fetch api');
        });
    });
});