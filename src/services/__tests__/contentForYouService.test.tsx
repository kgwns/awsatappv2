import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchFavouriteOpinionsApi, fetchFavouriteArticleApi } from 'src/services/contentForYouService';
import {FavouriteArticlesBodyGet, FavouriteOpinionsBodyGet} from 'src/redux/contentForYou/types'

describe('Test ContentForYou Services', () => {
    const mock = new MockAdapter(axios);
    
    const requestObject1: FavouriteArticlesBodyGet = {
        page: 0,
        items_per_page: 5,
        topicsList: [
            {
                name: 'الحكومة',
                tid: '12'
            },
            {
                name: 'الحكومة',
                tid: '13'
            }
        ],
    };

    const requestObject2: FavouriteOpinionsBodyGet = {
        page: 0,
        items_per_page: 5,
        authorsList: [
            {
                name: 'الحكومة',
                field_opinion_writer_photo_export: 'https://picsum.photos/200/300',
                tid: '12'
            },
            {
                name: 'الحكومة',
                field_opinion_writer_photo_export: 'https://picsum.photos/200/300',
                tid: '13'
            },
        ],
    };
    
    beforeEach(() => {
        jest.useFakeTimers({
            legacyFakeTimers: true
        });
    })
    afterEach(() => {
        mock.reset();
    });
    it('test when opinion response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchFavouriteOpinionsApi({page: 0, items_per_page: 5}).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when opinion response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchFavouriteOpinionsApi(requestObject2).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when opinion response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchFavouriteOpinionsApi(requestObject2).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when article response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });
  
        return fetchFavouriteArticleApi({page: 0, items_per_page: 5}).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
      });
    it('test when article response code is 200', () => {
      mock.onGet().reply(200, {
          result: true,
      });

      return fetchFavouriteArticleApi(requestObject1).then(response => {
          expect(response).toBeInstanceOf(Object);
      });
    });
    it('test when article response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchFavouriteArticleApi(requestObject1).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
});