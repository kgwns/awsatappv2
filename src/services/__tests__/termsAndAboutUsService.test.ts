import MockAdapter from 'axios-mock-adapter';
import {requestStaticDetail} from 'src/services/termsAndAboutUsService';
import {StaticDetailBodyGet} from 'src/redux/termsAndAboutUs/types';
import * as serviceApi from 'src/services/api';
describe('Test Opinions Services', () => {
  const cachedAxiosMock = new MockAdapter(serviceApi.apiWithCache);

  const body: StaticDetailBodyGet = {
    id: 56,
  };
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

    return requestStaticDetail(body).then(response => {
      console.log(`response: ${JSON.stringify(response)}`);
      expect(response).toBeInstanceOf(Object);
    });
  });
  it('test requestStaticDetail throws error', () => {
    const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
    getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

    return requestStaticDetail(body).catch((error) => {
      expect(error.message).toEqual('Not able to fetch api');
    });
  });
});
