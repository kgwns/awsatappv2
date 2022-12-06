import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchOpinionWriterApi } from 'src/services/opinionWriterService';
import { WritersBodyGet } from 'src/redux/writers/types';
import * as serviceApi from 'src/services/api';
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
  it('test fetchOpinionWriterApi throws error', () => {
    const getCacheApiRequest = jest.spyOn(serviceApi, 'getCacheApiRequest');
    getCacheApiRequest.mockImplementationOnce(() => { throw new Error('Not able to fetch api') });

    return fetchOpinionWriterApi(body).catch((error) => {
      expect(error.message).toEqual('Not able to fetch api');
    });
  });
});
