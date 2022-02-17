import { useDispatch, useSelector } from 'react-redux';
import {
    getAllWritersData,
    getIsLoading,
    getAllWritersError,
} from 'src/redux/allWriters/selectors';
import { fetchAllWriters } from 'src/redux/allWriters/action';
import { AllWritersItemType, AllWritersBodyGet } from 'src/redux/allWriters/types';

export interface UseAllWritersReturn {
    isLoading: boolean;
    allWritersData: AllWritersItemType[];
    allWritersError: string;
    fetchAllWritersRequest(payload: AllWritersBodyGet): void;
}

export const useAllWriters = (): UseAllWritersReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const allWritersData = useSelector(getAllWritersData);
    const allWritersError = useSelector(getAllWritersError);
    const fetchAllWritersRequest = (payload: AllWritersBodyGet) => {
        dispatch(fetchAllWriters(payload));
    };
    return {
        isLoading,
        allWritersData,
        allWritersError,
        fetchAllWritersRequest,
    };
};