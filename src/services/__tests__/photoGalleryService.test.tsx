import axios, { AxiosError } from "axios"
import MockAdapter from "axios-mock-adapter"
import { fetchAlbumDetailApi, fetchAlbumListApi } from "../photoGalleryService";
import { AlbumListBodyGet, AlbumDetailBodyGet } from 'src/redux/photoGallery/types';
import * as serviceApi from 'src/services/api';
describe('Test Photo Gallery Screen', () => {
    const mock = new MockAdapter(axios);
    const cachedAxiosMock = new MockAdapter(serviceApi.apiWithCache);

    const body: AlbumListBodyGet = {
        page: 1,
        items_per_page: 10,
    }
    const fetchAlbumDetailBody: AlbumDetailBodyGet = {
        nid: 10,
    }

    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    });
    afterEach(() => {
        mock.reset();
        cachedAxiosMock.reset();
    });

    it('test fetchAlbumListApi when response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchAlbumListApi(body).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });

    it('test fetchAlbumListApi when response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchAlbumListApi(body).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });

    it('test fetchAlbumDetailApi when response code is 200', () => {
        cachedAxiosMock.onGet().reply(200, {
            result: true,
        });

        return fetchAlbumDetailApi(fetchAlbumDetailBody).then(response => {
            expect(response).toBeInstanceOf(Object);
        })
    });

    it('test fetchAlbumDetailApi throws error', () => {
        const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
        getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

        return fetchAlbumDetailApi(fetchAlbumDetailBody).catch((error) => {
            expect(error.message).toEqual('Not able to fetch api');
        })
    });
});