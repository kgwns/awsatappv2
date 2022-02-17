import axios, {AxiosError} from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {fetchOpinionWriterApi} from 'src/services/opinionWriterService';
import {WritersBodyGet} from 'src/redux/writers/types';

describe('Test OpinionWriters Services', () => {
  const mock = new MockAdapter(axios);
  const body: WritersBodyGet = {
    items_per_page: 10,
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

    return fetchOpinionWriterApi(body).then(response => {
      console.log(`response: ${JSON.stringify(response)}`);
      expect(response).toBeInstanceOf(Object);
    });
  });
  it('test when response code is 500', () => {
    mock.onGet().reply(500, {
      error: 'Something Went Wrong',
    });

    return fetchOpinionWriterApi(body).catch((error: unknown) => {
      const errorResponse = error as AxiosError;
      expect(errorResponse.response?.status).toEqual(500);
    });
  });
});
