import axios, {AxiosError} from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchHomeOpinionsListApi, fetchOpinionsApi, fetchOpinionsListApi, fetchWriterOpinionsApi } from 'src/services/opinionsService';
import { OpinionsBodyGet, WriterOpinionsBodyGet } from 'src/redux/opinions/types';

describe('Test Opinions Services', () => {
  const mock = new MockAdapter(axios);
  const body: OpinionsBodyGet = {
    page: 0,
  };
  const payload: WriterOpinionsBodyGet = {
    tid: '12345',
    page: 1,
  }
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

    return fetchOpinionsApi(body).then(response => {
      console.log(`response: ${JSON.stringify(response)}`);
      expect(response).toBeInstanceOf(Object);
    });
  });
  it('test when response code is 500', () => {
    mock.onGet().reply(500, {
      error: 'Something Went Wrong',
    });

    return fetchOpinionsApi(body).catch((error: unknown) => {
      const errorResponse = error as AxiosError;
      expect(errorResponse.response?.status).toEqual(500);
    });
  });

  it('test when response code is 200', () => {
    mock.onGet().reply(200, {
      result: true,
    });

    return fetchWriterOpinionsApi(payload).then(response => {
      expect(response).toBeInstanceOf(Object);
    });
  });

  it('test when response code is 500', () => {
    mock.onGet().reply(500, {
      error: 'Something Went Wrong',
    });

    return fetchWriterOpinionsApi(payload).catch((error: unknown) => {
      const errorResponse = error as AxiosError;
      expect(errorResponse.response?.status).toEqual(500);
    });
  });

  it('test when response code is 200', () => {
    mock.onGet().reply(200, {
      result: true,
    });

    return fetchOpinionsListApi({
      nid: '12345',
      page: 1,
    }).then(response => {
      expect(response).toBeInstanceOf(Object);
    });
  });

  it('test when response code is 500', () => {
    mock.onGet().reply(500, {
      error: 'Something Went Wrong',
    });

    return fetchOpinionsListApi({
      nid: '12345',
      page: 1,
    }).catch((error: unknown) => {
      const errorResponse = error as AxiosError;
      expect(errorResponse.response?.status).toEqual(500);
    });
  });

  it('test when response code is 200', () => {
    mock.onGet().reply(200, {
      result: true,
    });

    return fetchHomeOpinionsListApi().then(response => {
      expect(response).toBeInstanceOf(Object);
    });
  });

  it('test when response code is 500', () => {
    mock.onGet().reply(500, {
      error: 'Something Went Wrong',
    });

    return fetchHomeOpinionsListApi().catch((error: unknown) => {
      const errorResponse = error as AxiosError;
      expect(errorResponse.response?.status).toEqual(500);
    });
  });

});
