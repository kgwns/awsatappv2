import {useDispatch, useSelector} from 'react-redux';

import {
  getIsLoading,
  getRegisterError,
  getRegisterUserInfo,
} from 'src/redux/register/selectors';

import {
  RegisterBodyType,
  RegisterSuccessPayloadType,
} from 'src/redux/register/types';
import {userRegister} from 'src/redux/register/action';

export interface UseRegisterReturn {
  isRegisterLoading: boolean;
  registerUserInfo: RegisterSuccessPayloadType | null;
  registerError: string;
  createUserRequest(payload: RegisterBodyType): void;
}

export const useRegister = (): UseRegisterReturn => {
  const dispatch = useDispatch();
  const isRegisterLoading = useSelector(getIsLoading);
  const registerUserInfo = useSelector(getRegisterUserInfo);
  const registerError = useSelector(getRegisterError);
  const createUserRequest = (payload: RegisterBodyType) => {
    dispatch(userRegister(payload));
  };
  return {
    isRegisterLoading,
    registerUserInfo,
    registerError,
    createUserRequest,
  };
};
