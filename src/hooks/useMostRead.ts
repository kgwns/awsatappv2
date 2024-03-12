import {useDispatch, useSelector} from 'react-redux';
import {
  getMostReadData,
  getIsLoading,
  getMostReadError,
} from 'src/redux/mostRead/selectors';
import {fetchMostRead} from 'src/redux/mostRead/action';

export interface UseMostReadReturn {
  isLoading: boolean;
  mostReadData: any;
  mostReadError: string;
  fetchMostReadRequest(): void;
}

export const useMostRead = (): UseMostReadReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const mostReadData = useSelector(getMostReadData);
  const mostReadError = useSelector(getMostReadError);
  const fetchMostReadRequest = () => {
    dispatch(fetchMostRead());
  };
  return {
    isLoading,
    mostReadData,
    mostReadError,
    fetchMostReadRequest,
  };
};
