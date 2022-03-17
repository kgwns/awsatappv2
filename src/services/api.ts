import axios, { AxiosError, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { store } from 'src/redux/store';

export const getApiRequest = (
  url: string,
  config?: AxiosRequestConfig | undefined,
) => {
  return axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
  const { loginData } = store.getState().login
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
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
