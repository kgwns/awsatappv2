import axios, {AxiosError} from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {requestStaticDetail} from 'src/services/termsAndAboutUsService';
import {StaticDetailBodyGet} from 'src/redux/termsAndAboutUs/types';

describe('Test Opinions Services', () => {
  const mock = new MockAdapter(axios);
  const body: StaticDetailBodyGet = {
    id: 56,
  };
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

    return requestStaticDetail(body).then(response => {
      console.log(`response: ${JSON.stringify(response)}`);
      expect(response).toBeInstanceOf(Object);
    });
  });
  it('test when response code is 500', () => {
    mock.onGet().reply(500, {
      error: 'Something Went Wrong',
    });

    return requestStaticDetail(body).catch((error: unknown) => {
      const errorResponse = error as AxiosError;
      expect(errorResponse.response?.status).toEqual(500);
    });
  });
});
