import { useDispatch, useSelector } from 'react-redux';
import {
  getLoginData,
  getIsLoading,
  getLoginError,
} from 'src/redux/login/selectors';
import { fetchLogin } from 'src/redux/login/action';
import { FetchLoginPayloadType } from 'src/redux/login/types';

export interface UseLoginReturn {
  isLoading: boolean;
  loginData: any;
  loginError: string;
  fetchLoginRequest(payload: FetchLoginPayloadType): void;
}

export const useLogin = (): UseLoginReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const loginData = useSelector(getLoginData);
  const loginError = useSelector(getLoginError);
  const fetchLoginRequest = (payload: FetchLoginPayloadType) => {
    dispatch(fetchLogin(payload));
  };
  return {
    isLoading,
    loginData,
    loginError,
    fetchLoginRequest,
  };
};