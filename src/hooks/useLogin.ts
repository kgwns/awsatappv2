import { useDispatch, useSelector } from 'react-redux';
import {
  getLoginData,
  getIsLoading,
  getLoginError,
  getIsSkipped,
} from 'src/redux/login/selectors';
import { fetchLogin, userLoginSkipped, userLogout } from 'src/redux/login/action';
import { FetchLoginPayloadType } from 'src/redux/login/types';

export interface UseLoginReturn {
  isLoading: boolean;
  loginData: any;
  loginError: string;
  fetchLoginRequest(payload: FetchLoginPayloadType): void;
  isLoggedIn: boolean;
  token: string;
  user: any;
  fetchLogoutRequest(): void;
  loginSkipped(): void;
  isSkipped: boolean;
}

export const useLogin = (): UseLoginReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const loginData = useSelector(getLoginData);
  const loginError = useSelector(getLoginError);
  const isSkipped = useSelector(getIsSkipped)
  const isLoggedIn = loginData?.token?.access_token ? true : false;
  const token = loginData?.token?.access_token ? loginData?.token?.access_token : null;
  const user = loginData?.user;
  const fetchLoginRequest = (payload: FetchLoginPayloadType) => {
    dispatch(fetchLogin(payload));
  };
  const fetchLogoutRequest = () => {
    dispatch(userLogout());
  }
  const loginSkipped = () => {
    dispatch(userLoginSkipped());
  }
  return {
    isLoading,
    loginData,
    loginError,
    fetchLoginRequest,
    isLoggedIn,
    token,
    user,
    fetchLogoutRequest,
    loginSkipped,
    isSkipped
  };
};