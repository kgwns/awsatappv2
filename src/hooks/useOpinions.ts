import {useDispatch, useSelector} from 'react-redux';
import {
  getOpinionsData,
  getIsLoading,
  getOpinionsError,
} from 'src/redux/opinions/selectors';
import {fetchOpinions} from 'src/redux/opinions/action';
import {OpinionsBodyGet, OpinionsListItemType} from 'src/redux/opinions/types';

export interface UseOpinionsReturn {
  isLoading: boolean;
  opinionsData: OpinionsListItemType[];
  opinionsError: string;
  fetchOpinionsRequest(payload: OpinionsBodyGet): void;
}

export const useOpinions = (): UseOpinionsReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const opinionsData = useSelector(getOpinionsData);
  const opinionsError = useSelector(getOpinionsError);
  const fetchOpinionsRequest = (payload: OpinionsBodyGet) => {
    dispatch(fetchOpinions(payload));
  };
  return {
    isLoading,
    opinionsData,
    opinionsError,
    fetchOpinionsRequest,
  };
};
