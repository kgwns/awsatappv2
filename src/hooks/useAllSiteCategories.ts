import { useDispatch, useSelector } from 'react-redux';
import {
    getAllSiteCategoriesData,
    getIsLoading,
    getAllSiteCategoriesError,
} from 'src/redux/allSiteCategories/selectors';
import { fetchAllSiteCategories } from 'src/redux/allSiteCategories/action';
import { AllSiteCategoriesItemType, AllSiteCategoriesBodyGet } from 'src/redux/allSiteCategories/types';

export interface UseAllSiteCategoriesReturn {
    isLoading: boolean;
    allSiteCategoriesData: AllSiteCategoriesItemType[];
    allSiteCategoriesError: string;
    fetchAllSiteCategoriesRequest(payload: AllSiteCategoriesBodyGet): void;
}

export const useAllSiteCategories = (): UseAllSiteCategoriesReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const allSiteCategoriesData = useSelector(getAllSiteCategoriesData);
    const allSiteCategoriesError = useSelector(getAllSiteCategoriesError);
    const fetchAllSiteCategoriesRequest = (payload: AllSiteCategoriesBodyGet) => {
        dispatch(fetchAllSiteCategories(payload));
    };
    return {
        isLoading,
        allSiteCategoriesData,
        allSiteCategoriesError,
        fetchAllSiteCategoriesRequest,
    };
};