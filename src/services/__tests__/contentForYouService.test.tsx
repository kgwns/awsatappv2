import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchFavouriteOpinionsApi, fetchFavouriteArticleApi } from 'src/services/contentForYouService';
import {FavouriteArticlesBodyGet} from 'src/redux/contentForYou/types'

describe('Test ContentForYou Services', () => {
    const mock = new MockAdapter(axios);
    const requestObject: FavouriteArticlesBodyGet = {
      page: 0,
    };
    beforeEach(() => {
        jest.useFakeTimers('legacy');
    })
    afterEach(() => {
        mock.reset();
    });
    it('test when opinion response code is 200', () => {
        mock.onGet().reply(200, {
            result: true,
        });

        return fetchFavouriteOpinionsApi(requestObject).then(response => {
            expect(response).toBeInstanceOf(Object);
        });
    });
    it('test when opinion response code is 500', () => {
        mock.onGet().reply(500, {
            error: 'Something Went Wrong',
        });

        return fetchFavouriteOpinionsApi(requestObject).catch((error: unknown) => {
            const errorResponse = error as AxiosError;
            expect(errorResponse.response?.status).toEqual(500);
        });
    });
    it('test when article response code is 200', () => {
      mock.onGet().reply(200, {
          result: true,
      });

      return fetchFavouriteArticleApi(requestObject).then(response => {
          expect(response).toBeInstanceOf(Object);
      });
  });
  it('test when article response code is 500', () => {
      mock.onGet().reply(500, {
          error: 'Something Went Wrong',
      });

      return fetchFavouriteArticleApi(requestObject).catch((error: unknown) => {
          const errorResponse = error as AxiosError;
          expect(errorResponse.response?.status).toEqual(500);
      });
  });
});