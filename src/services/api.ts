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
export const apiWithCache = axios.create({
  withCredentials: false,
  adapter: cache.adapter
})

export const api = axios.create({
  withCredentials: false
})

export const getCacheApiRequest = (
  url: string,
  config?: AxiosRequestConfig | undefined,
) => {
  const token = getToken(url);
  return apiWithCache
    .get(url, {
      headers: getHeader(token),
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
  const token = getToken(url);
  return api
    .get(url, {
      headers: getHeader(token),
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
  return api
    .get(url, {
      headers: getHeader(),
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
  const token = getToken(url);
  return api
    .post(url, data, {
      headers: getHeader(token, header),
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

function getHeader(token?: string,
  header?: AxiosRequestHeaders | undefined) {
    if (token) {
      return {
        'Content-Type': APPLICATION_JSON,
        'Accept': APPLICATION_JSON,
        'Authorization': token,
        ...header
      }
    } else {
      return {
        'Content-Type': APPLICATION_JSON,
        'Accept': APPLICATION_JSON,
        ...header
      }
    }
}

function getToken(url: string) {
  const loginData = store.getState().login?.loginData;  
  if (loginData) {
    const isUms = url.includes('ums');
    const type = isUms ? 'Bearer ' : 'Basic ';
    const accessToken = loginData.token.access_token;
    return type + accessToken;
  }
  return '';
}