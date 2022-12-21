import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { requestOpinionArticleDetailAPI, fetchRelatedOpinionAPI } from 'src/services/opinionArticleDetailService';
import { OpinionArticleDetailBodyGet, RelatedOpinionBodyGet } from 'src/redux/opinionArticleDetail/types';
import * as serviceApi from 'src/services/api';
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

  it('test requestOpinionArticleDetailAPI throws error', () => {
    const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
    getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

    return requestOpinionArticleDetailAPI(body).catch((error) => {
      expect(error.message).toEqual('Not able to fetch api');
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

  it('test fetchRelatedOpinionAPI throws error', () => {
    const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
    getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

    return fetchRelatedOpinionAPI(relatedOpinionBody).catch((error) => {
      expect(error.message).toEqual('Not able to fetch api');
    });
  });

});