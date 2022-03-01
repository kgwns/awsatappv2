import axios, {AxiosError, AxiosRequestConfig, AxiosRequestHeaders} from 'axios';

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

export const postApiRequest = (
  url: string,
  data?: unknown | undefined,
  config?: AxiosRequestConfig | undefined,
  header?: AxiosRequestHeaders | undefined
) => {
  return axios
    .post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...header
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
