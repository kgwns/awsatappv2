import { useDispatch, useSelector } from 'react-redux';
import {
  getTopMenuData,
  getIsLoading,
  getTopMenuError,
} from 'src/redux/topMenu/selectors';
import { fetchTopMenu } from 'src/redux/topMenu/action';
import { TopMenuItemType } from 'src/redux/topMenu/types';

export interface UseTopMenuReturn {
  isLoading: boolean;
  topMenuData: TopMenuItemType[];
  topMenuError: string;
  fetchTopMenuRequest(): void;
}

export const useTopMenu = (): UseTopMenuReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const topMenuData = useSelector(getTopMenuData);
  const topMenuError = useSelector(getTopMenuError);
  const fetchTopMenuRequest = () => {
    dispatch(fetchTopMenu());
  };
  return {
    isLoading,
    topMenuData,
    topMenuError,
    fetchTopMenuRequest,
  };
};
