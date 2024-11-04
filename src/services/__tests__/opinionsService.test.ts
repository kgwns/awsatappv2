import MockAdapter from 'axios-mock-adapter';
import { fetchHomeOpinionsListApi, fetchOpinionsApi, fetchOpinionsListApi, fetchWriterOpinionsApi } from 'src/services/opinionsService';
import { OpinionsBodyGet, WriterOpinionsBodyGet } from 'src/redux/opinions/types';
import * as serviceApi from 'src/services/api';
describe('Test Opinions Services', () => {
  const cachedAxiosMock = new MockAdapter(serviceApi.apiWithCache);

  const body: OpinionsBodyGet = {
    page: 0,
  };
  const payload: WriterOpinionsBodyGet = {
    tid: '12345',
    page: 1,
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

    return fetchOpinionsApi(body).then(response => {
      console.log(`response: ${JSON.stringify(response)}`);
      expect(response).toBeInstanceOf(Object);
    });
  });
  it('test fetchOpinionsApi throws error', () => {
    const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
    getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

    return fetchOpinionsApi(body).catch((error) => {
      expect(error.message).toEqual('Not able to fetch api');
    });
  });

  it('test when response code is 200', () => {
    cachedAxiosMock.onGet().reply(200, {
      result: true,
    });

    return fetchWriterOpinionsApi(payload).then(response => {
      expect(response).toBeInstanceOf(Object);
    });
  });

  it('test fetchWriterOpinionsApi throws error', () => {
    const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
    getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

    return fetchWriterOpinionsApi(payload).catch((error) => {
      expect(error.message).toEqual('Not able to fetch api');
    });
  });

  it('test when response code is 200', () => {
    cachedAxiosMock.onGet().reply(200, {
      result: true,
    });

    return fetchOpinionsListApi({
      nid: '12345',
      page: 1,
    }).then(response => {
      expect(response).toBeInstanceOf(Object);
    });
  });

  it('test when response code is 200', () => {
    cachedAxiosMock.onGet().reply(200, {
      result: true,
    });

    return fetchOpinionsListApi({
      nid: '',
      page: 1,
    }).then(response => {
      expect(response).toBeInstanceOf(Object);
    });
  });

  it('test fetchOpinionsListApi throws error', () => {
    const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
    getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

    return fetchOpinionsListApi({
      nid: '12345',
      page: 1,
    }).catch((error) => {
      expect(error.message).toEqual('Not able to fetch api');

    });
  });

  it('test when response code is 200', () => {
    cachedAxiosMock.onGet().reply(200, {
      result: true,
    });

    return fetchHomeOpinionsListApi().then(response => {
      expect(response).toBeInstanceOf(Object);
    });
  });

  it('test fetchHomeOpinionsListApi throws error', () => {
    const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
    getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

    return fetchHomeOpinionsListApi().catch((error) => {
      expect(error.message).toEqual('Not able to fetch api');
    });
  });

});
