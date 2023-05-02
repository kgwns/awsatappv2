import { useDispatch, useSelector } from 'react-redux';
import {
    getDMAIntroductionData,
    getIsLoading,
    getDMAIntroductionError,
} from 'src/redux/deleteMyAccount/selectors';
import { fetchDMAIntroduction } from 'src/redux/deleteMyAccount/action';
import { DMAIntroductionItemType } from 'src/redux/deleteMyAccount/types';

export interface UseDeleteMyAccountReturn {
    isLoading: boolean;
    dmaIntroductionData: DMAIntroductionItemType[];
    dmaIntroductionError: string;
    fetchDMAIntroductionRequest(): void;
}

export const useDeleteMyAccount = (): UseDeleteMyAccountReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const dmaIntroductionData = useSelector(getDMAIntroductionData);
    const dmaIntroductionError = useSelector(getDMAIntroductionError);
    const fetchDMAIntroductionRequest = () => {
        dispatch(fetchDMAIntroduction());
    };
    return {
        isLoading,
        dmaIntroductionData,
        dmaIntroductionError,
        fetchDMAIntroductionRequest,
    };
};
