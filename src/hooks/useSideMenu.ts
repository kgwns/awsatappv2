import { useDispatch, useSelector } from 'react-redux';
import {
  getSideMenuData,
  getIsLoading,
  getSideMenuError,
} from 'src/redux/sideMenu/selectors';
import { fetchSideMenu } from 'src/redux/sideMenu/action';
import { SideMenuItemType } from 'src/redux/sideMenu/types';

export interface UseSideMenuReturn {
  isLoading: boolean;
  sideMenuData: SideMenuItemType[];
  sideMenuError: string;
  fetchSideMenuRequest(): void;
}

export const useSideMenu = (): UseSideMenuReturn => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const sideMenuData = useSelector(getSideMenuData);
  const sideMenuError = useSelector(getSideMenuError);
  const fetchSideMenuRequest = () => {
    dispatch(fetchSideMenu());
  };
  return {
    isLoading,
    sideMenuData,
    sideMenuError,
    fetchSideMenuRequest,
  };
};
