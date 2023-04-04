import {useDispatch, useSelector} from 'react-redux';
import { SaveTokenAfterRegistraionBodyType, SaveTokenBodyType, SaveTokenSuccessPayloadType } from 'src/redux/notificationSaveToken/types';
import { SaveToken, SaveTokenAfterRegistration } from 'src/redux/notificationSaveToken/action';
import { getIsLoading, getSaveTokenError, getSaveTokenInfo } from 'src/redux/notificationSaveToken/selectors';

export interface UseSaveTokenReturn {
  isSaveTokenLoading: boolean;
  saveTokenData: SaveTokenSuccessPayloadType | null;
  saveTokenError: string;
  saveTokenRequest(payload: SaveTokenBodyType): void;
  saveTokenAfterRegistrationRequest(payload: SaveTokenAfterRegistraionBodyType): void;
}

export const useNotificationSaveToken = (): UseSaveTokenReturn => {
  const dispatch = useDispatch();
  const isSaveTokenLoading = useSelector(getIsLoading);
  const saveTokenData = useSelector(getSaveTokenInfo);
  const saveTokenError = useSelector(getSaveTokenError);
  const saveTokenRequest = (
    payload: SaveTokenBodyType,
  ) => {
    dispatch(SaveToken(payload));
  };
  const saveTokenAfterRegistrationRequest = (
    payload: SaveTokenAfterRegistraionBodyType,
  ) => {
    dispatch(SaveTokenAfterRegistration(payload));
  };

  return {
    isSaveTokenLoading,
    saveTokenData,
    saveTokenError,
    saveTokenRequest,
    saveTokenAfterRegistrationRequest,
  };
};
