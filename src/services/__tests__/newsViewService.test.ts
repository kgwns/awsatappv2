import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchNewsViewApi,fetchSubArticleSectionApi } from 'src/services/newsViewService';
import { NewsViewBodyGet } from 'src/redux/newsView/types';

describe('Test Opinions Services', () => {
  const mock = new MockAdapter(axios);
  const body: NewsViewBodyGet = {
    items_per_page: 10,
    page: 0,
    offset: 0,
  };
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
  });
  afterEach(() => {
    mock.reset();
  });
  it('test when response code is 200', () => {
    mock.onGet().reply(200, {
      result: true,
    });

    return fetchNewsViewApi(body).then(response => {
      console.log(`response: ${JSON.stringify(response)}`);
      expect(response).toBeInstanceOf(Object);
    });
  });
  it('test when response code is 500', () => {
    mock.onGet().reply(500, {
      error: 'Something Went Wrong',
    });

    return fetchNewsViewApi(body).catch((error: unknown) => {
      const errorResponse = error as AxiosError;
      expect(errorResponse.response?.status).toEqual(500);
    });
  });
  it('test fetchSubArticleSectionApi when response code is 200', () => {
    mock.onGet().reply(200, {
      result: true,
    })

    return fetchSubArticleSectionApi(body).then(response=>{
      expect(response).toBeInstanceOf(Object);
    })
  });
  it('test fetchSubArticleSectionApi when response code is 500',()=>{
    mock.onGet().reply(500,{
      error: 'Something Went Wrong',
    })

    return fetchSubArticleSectionApi(body).catch((error: unknown)=>{
      const errorResponse = error as AxiosError;
      expect(errorResponse.response?.status).toEqual(500);
    })
  })
});
