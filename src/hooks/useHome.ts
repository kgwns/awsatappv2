import {useDispatch, useSelector} from 'react-redux';
import {
  getHomeData,
  getIsLoading,
  getHomeError,
} from 'src/redux/home/selectors';
import {HomeBodyType} from 'src/redux/home/types';
import {requestHome} from 'src/redux/home/action';

export interface UseHomeReturn {
  isLoading: boolean;
  homeData: string;
  homeError: string;
  fetchHomeRequest(payload: HomeBodyType): void;
}

export const useHome = (): UseHomeReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const homeData = useSelector(getHomeData);
  const homeError = useSelector(getHomeError);
  const fetchHomeRequest = (payload: HomeBodyType) => {
    dispatch(requestHome(payload));
  };
  return {
    isLoading,
    homeData,
    homeError,
    fetchHomeRequest,
  };
};
