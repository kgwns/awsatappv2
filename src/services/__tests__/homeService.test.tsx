import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { requestHomeApi } from 'src/services/homeService';
export const homePayload = { page: 1 };
describe('Test Home Widget services', () => {
  const mock = new MockAdapter(axios);
  beforeEach(() => {
    jest.useFakeTimers({
      legacyFakeTimers: true
    });
  })

  afterEach(() => {
    mock.reset();
  });
  it('test getToken when response code is 200', () => {
    mock.onGet().reply(200, {
      result: true,
    });

    return requestHomeApi(homePayload).then(response => {
      console.log(`response: ${JSON.stringify(response)}`);
      expect(response).toBeInstanceOf(Object);
    });
  });
  it('test getToken when response code is 500', () => {
    mock.onGet().reply(500, {
      error: 'Something Went Wrong',
    });

    return requestHomeApi(homePayload).catch((error: unknown) => {
      const errorRepose = error as AxiosError;
      expect(errorRepose.response?.status).toEqual(500);
    });
  });
});
