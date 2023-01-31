import { useDispatch, useSelector } from "react-redux";
import { getIsLoading, 
    getJournalistArticleSuccessInfo, 
    getJournalistArticleError, 
    getIsDetailLoading, 
    getJournalistDetailError, 
    getJournalistDetailSuccessInfo } from 'src/redux/journalist/selectors'
import { getJournalistInfoDetail, fetchJournalistDetail, emptyJournalistArticle } from "src/redux/journalist/action";
import { GetJournalistInfoPayload, JournalistArticleData, JournalistDetailBodyGet, JournalistDetailDataType } from "src/redux/journalist/types";

export type UseJournalistReturn = {
    isArticleLoading: boolean;
    journalistArticleInfo: JournalistArticleData[];
    journalistArticleErrorInfo: string;
    getJournalistArticleInfo: (payload: GetJournalistInfoPayload) => void;
    emptyJournalistArticleInfo: () => void;
    isDetailLoading: boolean;
    journalistDetailData: JournalistDetailDataType[];
    journalistDetailErrorInfo: string;
    getJournalistDetailInfo: (payload: JournalistDetailBodyGet) => void;
}

export const useJournalist = (): UseJournalistReturn => {
    const dispatch = useDispatch();

    const isArticleLoading = useSelector(getIsLoading);
    const journalistArticleInfo = useSelector(getJournalistArticleSuccessInfo)
    const journalistArticleErrorInfo = useSelector(getJournalistArticleError)

    const isDetailLoading = useSelector(getIsDetailLoading);
    const journalistDetailData = useSelector(getJournalistDetailSuccessInfo)
    const journalistDetailErrorInfo = useSelector(getJournalistDetailError)

    const getJournalistArticleInfo = (payload: GetJournalistInfoPayload) => {
        dispatch(getJournalistInfoDetail(payload))
    }

    const emptyJournalistArticleInfo = () => {
        dispatch(emptyJournalistArticle())
    }

    const getJournalistDetailInfo = (payload: JournalistDetailBodyGet) => {
        dispatch(fetchJournalistDetail(payload))
    }

    return {
        isArticleLoading,
        journalistArticleInfo,
        journalistArticleErrorInfo,
        getJournalistArticleInfo,
        emptyJournalistArticleInfo,
        isDetailLoading,
        journalistDetailData,
        journalistDetailErrorInfo,
        getJournalistDetailInfo
    }
}
