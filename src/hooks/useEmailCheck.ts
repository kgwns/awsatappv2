import { useDispatch, useSelector } from 'react-redux';
import {
  getEmailCheckData,
  getIsLoading,
  getEmailCheckError,
} from 'src/redux/auth/selectors';
import { fetchEmailCheck } from 'src/redux/auth/action';
import { FetchEmailCheckPayloadType } from 'src/redux/auth/types';

export interface UseEmailCheckReturn {
  isLoading: boolean;
  emailCheckData: any;
  emailCheckError: string;
  fetchEmailCheckRequest(payload: FetchEmailCheckPayloadType): void;
}

export const useEmailCheck = (): UseEmailCheckReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const emailCheckData = useSelector(getEmailCheckData);
  const emailCheckError = useSelector(getEmailCheckError);
  const fetchEmailCheckRequest = (payload: FetchEmailCheckPayloadType) => {
    dispatch(fetchEmailCheck(payload));
  };
  return {
    isLoading,
    emailCheckData,
    emailCheckError,
    fetchEmailCheckRequest,
  };
};