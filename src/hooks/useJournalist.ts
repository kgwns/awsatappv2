import { useDispatch, useSelector } from "react-redux";
import { getIsLoading, getJournalistArticleSuccessInfo, getJournalistArticleError } from 'src/redux/journalist/selectors'
import { getJournalistInfoDetail } from "src/redux/journalist/action";
import { GetJournalistInfoPayload, JournalistArticleData } from "src/redux/journalist/types";

export type UseJournalistReturn = {
    isArticleLoading: boolean;
    journalistArticleInfo: JournalistArticleData[];
    journalistArticleErrorInfo: string;
    getJournalistArticleInfo: (payload: GetJournalistInfoPayload) => void;
}

export const useJournalist = (): UseJournalistReturn => {
    const dispatch = useDispatch();

    const isArticleLoading = useSelector(getIsLoading);
    const journalistArticleInfo = useSelector(getJournalistArticleSuccessInfo)
    const journalistArticleErrorInfo = useSelector(getJournalistArticleError)

    const getJournalistArticleInfo = (payload: GetJournalistInfoPayload) => {
        dispatch(getJournalistInfoDetail(payload))
    }

    return {
        isArticleLoading,
        journalistArticleInfo,
        journalistArticleErrorInfo,
        getJournalistArticleInfo,
    }
}