import axios, {AxiosError} from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {requestOpinionArticleDetailAPI,fetchRelatedOpinionAPI} from 'src/services/opinionArticleDetailService';
import {OpinionArticleDetailBodyGet, RelatedOpinionBodyGet} from 'src/redux/opinionArticleDetail/types';

describe('Test OpinionArticleDetail Services', () => {
  const mock = new MockAdapter(axios);
  const body: OpinionArticleDetailBodyGet = {
    nid: 123,
  };
  const relatedOpinionBody: RelatedOpinionBodyGet = {
    page: 1,
  };
  console.log = jest.fn();
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

    return requestOpinionArticleDetailAPI(body).then(response => {
      console.log(`response: ${JSON.stringify(response)}`);
      expect(response).toBeInstanceOf(Object);
    });
  });
  it('test when response code is 500', () => {
    mock.onGet().reply(500, {
      error: 'Something Went Wrong',
    });

    return requestOpinionArticleDetailAPI(body).catch((error: unknown) => {
      const errorResponse = error as AxiosError;
      expect(errorResponse.response?.status).toEqual(500);
    });
  });
  it('test related opinion when response code is 200', () => {
    mock.onGet().reply(200, {
      result: true,
    });

    return fetchRelatedOpinionAPI(relatedOpinionBody).then(response => {
      console.log(`response: ${JSON.stringify(response)}`);
      expect(response).toBeInstanceOf(Object);
    });
  });
  it('test related opinion when response code is 500', () => {
    mock.onGet().reply(500, {
      error: 'Something Went Wrong',
    });

    return fetchRelatedOpinionAPI(relatedOpinionBody).catch((error: unknown) => {
      const errorResponse = error as AxiosError;
      expect(errorResponse.response?.status).toEqual(500);
      expect(console.log).toHaveBeenCalledWith(`error: ${error}`);
    });
  });
});