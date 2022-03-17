import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SectionArticlesBodyGet } from 'src/redux/sectionArticles/types';
import { fetchSectionArticlesApi } from '../sectionArticlesService';

describe('Test Section Articles Services', () => {
    const mock = new MockAdapter(axios);

    const body: SectionArticlesBodyGet = {
        sectionId: '12345',
        page: 1
    }
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

        return fetchSectionArticlesApi(body).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test when response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchSectionArticlesApi(body).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});