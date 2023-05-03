import { useDispatch, useSelector } from 'react-redux';
import {
    getDMAIntroductionData,
    getIsLoading,
    getDMAIntroductionError,
    getDMAOptionsListData,
    getDMAOptionsListError,
} from 'src/redux/deleteMyAccount/selectors';
import { fetchDMAIntroduction, fetchDMAOptionsList } from 'src/redux/deleteMyAccount/action';
import { DMAIntroductionItemType, DMAOptionsListItemType } from 'src/redux/deleteMyAccount/types';

export interface UseDeleteMyAccountReturn {
    isLoading: boolean;
    dmaIntroductionData: DMAIntroductionItemType[];
    dmaIntroductionError: string;
    fetchDMAIntroductionRequest(): void;
    dmaOptionsListData: DMAOptionsListItemType[];
    dmaOptionsListError: string;
    fetchDMAOptionsListRequest(): void;
}

export const useDeleteMyAccount = (): UseDeleteMyAccountReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const dmaIntroductionData = useSelector(getDMAIntroductionData);
    const dmaOptionsListData = useSelector(getDMAOptionsListData);
    const dmaIntroductionError = useSelector(getDMAIntroductionError);
    const dmaOptionsListError = useSelector(getDMAOptionsListError);
    const fetchDMAIntroductionRequest = () => {
        dispatch(fetchDMAIntroduction());
    };
    const fetchDMAOptionsListRequest = () => {
        dispatch(fetchDMAOptionsList());
    };
    return {
        isLoading,
        dmaIntroductionData,
        dmaOptionsListData,
        dmaIntroductionError,
        dmaOptionsListError,
        fetchDMAIntroductionRequest,
        fetchDMAOptionsListRequest,
    };
};
