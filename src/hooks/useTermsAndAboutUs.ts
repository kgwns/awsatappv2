import { useDispatch, useSelector } from 'react-redux';
import {
    getIsLoading, getData, getError
} from 'src/redux/termsAndAboutUs/selectors';
import { StaticDetailBodyGet, StaticDetailDataType } from 'src/redux/termsAndAboutUs/types';
import { requestStaticDetail } from 'src/redux/termsAndAboutUs/action';

export interface UseTermsAndAboutUsReturn {
    isLoading: boolean;
    data: StaticDetailDataType[];
    error: string;
    fetchStaticDetail(payload: StaticDetailBodyGet): void;
}

export const useTermsAndAboutUs = (): UseTermsAndAboutUsReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const data = useSelector(getData);
    const error = useSelector(getError);
    const fetchStaticDetail = (payload: StaticDetailBodyGet) => {
        dispatch(requestStaticDetail(payload));
    };
    return {
        isLoading,
        data,
        error,
        fetchStaticDetail
    };
};
