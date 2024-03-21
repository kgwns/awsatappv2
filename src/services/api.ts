import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { store } from 'src/redux/store';
import { setupCache } from 'axios-cache-adapter';

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
  exclude: {
    // Store responses from requests with query parameters in cache
    query: false
}
})
const APPLICATION_JSON = 'application/json';
export const api = axios.create({
  adapter: cache.adapter
})

export const getCacheApiRequest = (
  url: string,
  config?: AxiosRequestConfig | undefined,
) => {
  return api
    .get(url, {
      headers: {
        'Content-Type': APPLICATION_JSON,
        Accept: APPLICATION_JSON,
        Authorization: 'Bearer some_token',
      },
      ...config,
    })
    .then(response => {
      return response.data;
    })
    .catch((error: unknown) => {
      const errorResponse = error as AxiosError;
      handleErrorResponses(errorResponse);
    });
};

export const getApiRequest = (
  url: string,
  config?: AxiosRequestConfig | undefined,
) => {
  return axios
    .get(url, {
      headers: {
        'Content-Type': APPLICATION_JSON,
        Accept: APPLICATION_JSON,
        Authorization: 'Bearer some_token',
      },
      ...config,
    })
    .then(response => {
      return response.data;
    })
    .catch((error: unknown) => {
      const errorResponse = error as AxiosError;
      handleErrorResponses(errorResponse);
    });
};

export const getApiRequestWithoutAuth = (
  url: string,
  config?: AxiosRequestConfig | undefined,
) => {
  return axios
    .get(url, {
      headers: {
        'Content-Type': APPLICATION_JSON,
        Accept: APPLICATION_JSON,
      },
      ...config,
    })
    .then(response => {
      return response.data;
    })
    .catch((error: unknown) => {
      const errorResponse = error as AxiosError;
      handleErrorResponses(errorResponse);
    });
};

export const postApiRequest = (
  url: string,
  data?: unknown | undefined,
  config?: AxiosRequestConfig | undefined,
  header?: AxiosRequestHeaders | undefined
) => {
  const loginData = store.getState().login?.loginData
  let tokenInfo = {}
  if (loginData) {
    const type = `${loginData.token.token_type} ` || 'Bearer '
    const accessToken = loginData.token.access_token
    tokenInfo = {
      Authorization: type + accessToken
    }
  }

  return axios
    .post(url, data, {
      headers: {
        'Content-Type': APPLICATION_JSON,
        Accept: APPLICATION_JSON,
        ...header,
        ...tokenInfo
      },
      ...config,
    })
    .then(response => {
      return response.data;
    })
    .catch((error: unknown) => {
      const errorResponse = error as AxiosError;
      handleErrorResponses(errorResponse);
    });
};

const handleErrorResponses = (error: AxiosError) => {
  throw error;
};