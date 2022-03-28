import {useDispatch, useSelector} from 'react-redux';

import {
  getIsLoading,
  getRegisterError,
  getRegisterUserInfo,
  getSocialLoginInProgress,
} from 'src/redux/register/selectors';

import {
  RegisterBodyType,
  RegisterSuccessPayloadType,
} from 'src/redux/register/types';
import {
  userRegister,
  socialLoginStart,
  socialLoginEnd,
  emptyUserInfoData
} from 'src/redux/register/action';

export interface UseRegisterReturn {
  isRegisterLoading: boolean;
  registerUserInfo: RegisterSuccessPayloadType | null;
  registerError: string;
  socialLoginInProgress: boolean;
  createUserRequest(payload: RegisterBodyType): void;
  socialLoginStarted(): void;
  socialLoginEnded(): void;
  emptyUserInfo(): void;
}

export const useRegister = (): UseRegisterReturn => {
  const dispatch = useDispatch();
  const isRegisterLoading = useSelector(getIsLoading);
  const registerUserInfo = useSelector(getRegisterUserInfo);
  const registerError = useSelector(getRegisterError);
  const socialLoginInProgress = useSelector(getSocialLoginInProgress);
  const createUserRequest = (payload: RegisterBodyType) => {
    dispatch(userRegister(payload));
  };
  const socialLoginStarted = () => {
    dispatch(socialLoginStart());
  };

  const socialLoginEnded = () => {
    dispatch(socialLoginEnd());
  };
  const emptyUserInfo = () => {
    dispatch(emptyUserInfoData());
  };

  return {
    isRegisterLoading,
    registerUserInfo,
    registerError,
    socialLoginInProgress,
    createUserRequest,
    socialLoginStarted,
    socialLoginEnded,
    emptyUserInfo
  };
};
