import MockAdapter from 'axios-mock-adapter';
import { SectionArticlesBodyGet } from 'src/redux/sectionArticles/types';
import { fetchSectionArticlesApi } from '../sectionArticlesService';
import * as serviceApi from 'src/services/api';
describe('Test Section Articles Services', () => {
    const cachedAxiosMock = new MockAdapter(serviceApi.apiWithCache);

    const body: SectionArticlesBodyGet = {
        sectionId: '12345',
        page: 1
    }
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });

    afterEach(() => {
        cachedAxiosMock.reset();
    });

    it('test when response code is 200', () => {
        cachedAxiosMock.onGet().reply(200, {
            result: true,
        });

        return fetchSectionArticlesApi(body).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when fetchSectionArticlesApi throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

        return fetchSectionArticlesApi(body).catch((error) => {
            expect(error.message).toEqual('Not able to fetch api');
        });
    });
});