import {
  HomeBodyType,
  RequestHomeType,
  HomeSuccessPayloadType,
  HomeSuccessType,
  HomeFailedPayloadtype,
  HomeFailedType,
} from 'src/redux/home/types';
import {
  REQUEST_HOME,
  REQUEST_HOME_SUCCESS,
  REQUEST_HOME_ERROR,
} from './actionType';

export const requestHome = (
  payload: HomeBodyType,
): RequestHomeType => {
  console.log(`authAction - userLogin: ${JSON.stringify(payload)}`);
  return {
    type: REQUEST_HOME,
    payload,
  };
};

export const requestHomeSuccess = (
  payload: HomeSuccessPayloadType,
): HomeSuccessType => {
  return {
    type: REQUEST_HOME_SUCCESS,
    payload,
  };
};

export const requestHomeFailed = (
  payload: HomeFailedPayloadtype,
): HomeFailedType => {
  return {
    type: REQUEST_HOME_ERROR,
    payload,
  };
};

export const homeActions = {
  requestHome,
  requestHomeSuccess,
  requestHomeFailed,
};
