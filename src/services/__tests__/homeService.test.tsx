import axios, {AxiosError} from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {requestHomeApi} from 'src/services/homeService';
export const homePayload = {page:1};
describe('Test Home Widget services', () => {
  const mock = new MockAdapter(axios);
  afterEach(() => {
    mock.reset();
  });
  it('test getToken when response code is 200', () => {
    mock.onPost().reply(200, {
      result: true,
    });

    return requestHomeApi(homePayload).then(response => {
      console.log(`response: ${JSON.stringify(response)}`);
      expect(response).toBeInstanceOf(Object);
    });
  });
  it('test getToken when response code is 500', () => {
    mock.onPost().reply(500, {
      error: 'Something Went Wrong',
    });

    return requestHomeApi(homePayload).catch((error: unknown) => {
      const errorReponse = error as AxiosError;
      expect(errorReponse.response?.status).toEqual(500);
    });
  });
});
