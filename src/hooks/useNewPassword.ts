import {useDispatch, useSelector} from 'react-redux';
import {
  getIsLoading,
  getNewPassword,
  getNewPasswordError
} from 'src/redux/changePassword/selectors';
import { changePassword } from 'src/redux/changePassword/action';
import {SendNewPasswordSuccessPayloadType, SendNewPassword
} from 'src/redux/changePassword/types';

export interface useChangePassword {
  isLoading: boolean;
  changePasswordData: SendNewPasswordSuccessPayloadType | null;
  changePasswordError: string;
  changePasswordInfo(payload: SendNewPassword): void
}

export const useNewPassword = (): useChangePassword => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const changePasswordData = useSelector(getNewPassword);
  const changePasswordError = useSelector(getNewPasswordError);
  const changePasswordInfo = (payload: SendNewPassword) => {
    dispatch(changePassword(payload));
  };
  return {
    isLoading,
    changePasswordData,
    changePasswordError,
    changePasswordInfo,
  };
};

