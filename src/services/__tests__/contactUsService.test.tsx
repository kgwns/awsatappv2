import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { sendContactUsService } from 'src/services/contactUsService';

describe('Test sendContactUsService', () => {
  const mock = new MockAdapter(axios);
  beforeEach(() => {
    jest.useFakeTimers('legacy');
  })

  afterEach(() => {
    mock.reset();
  });

  it('test sendContactUsService when response code is 404', () => {
    mock.onGet().reply(404, {
      error: 'Something Went Wrong',
    });

    return sendContactUsService({ name: 'abc', email: 'abc@gmail.com', msg: 'example' }).catch((error: unknown) => {
      const errorRepose = error as AxiosError;
      expect(errorRepose.response?.status).toEqual(404);
    });
  });
});
