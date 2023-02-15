import {useDispatch, useSelector} from 'react-redux';
import {
  getIsLoading,
  getNewPassword,
  getNewPasswordError
} from 'src/redux/changePassword/selectors';
import { changePassword, emptyPasswordResponse } from 'src/redux/changePassword/action';
import {SendNewPasswordSuccessPayloadType, SendNewPassword
} from 'src/redux/changePassword/types';

export interface UseChangePassword {
  isLoading: boolean;
  changePasswordData: SendNewPasswordSuccessPayloadType | null;
  changePasswordError: string;
  changePasswordInfo(payload: SendNewPassword): void
  emptyPasswordResponseInfo(): void
}

export const useNewPassword = (): UseChangePassword => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const changePasswordData = useSelector(getNewPassword);
  const changePasswordError = useSelector(getNewPasswordError);
  const changePasswordInfo = (payload: SendNewPassword) => {
    dispatch(changePassword(payload));
  };
  const emptyPasswordResponseInfo = ( ) => {
    dispatch(emptyPasswordResponse());
  };
  return {
    isLoading,
    changePasswordData,
    changePasswordError,
    changePasswordInfo,
    emptyPasswordResponseInfo
  };
};

