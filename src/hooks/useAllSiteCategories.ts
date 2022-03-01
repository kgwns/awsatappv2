import { useDispatch, useSelector } from 'react-redux';
import {
    getAllSiteCategoriesData,
    getIsLoading,
    getAllSiteCategoriesError,
    getTopicsData
} from 'src/redux/allSiteCategories/selectors';
import { fetchAllSiteCategories, sendSelectedTopic } from 'src/redux/allSiteCategories/action';
import { AllSiteCategoriesItemType, AllSiteCategoriesBodyGet } from 'src/redux/allSiteCategories/types';
import { ResponseMessage, SendSelectedTopicBody } from 'src/redux/allSiteCategories/types';

export interface UseAllSiteCategoriesReturn {
    isLoading: boolean;
    allSiteCategoriesData: AllSiteCategoriesItemType[];
    allSiteCategoriesError: string;
    sentTopicsData: ResponseMessage
    fetchAllSiteCategoriesRequest(payload: AllSiteCategoriesBodyGet): void;
    sendSelectedTopicInfo(payload: SendSelectedTopicBody): void
}

export const useAllSiteCategories = (): UseAllSiteCategoriesReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const allSiteCategoriesData = useSelector(getAllSiteCategoriesData);
    const sentTopicsData = useSelector(getTopicsData);
    const allSiteCategoriesError = useSelector(getAllSiteCategoriesError);
    const fetchAllSiteCategoriesRequest = (payload: AllSiteCategoriesBodyGet) => {
        dispatch(fetchAllSiteCategories(payload));
    };
    const sendSelectedTopicInfo = (payload: SendSelectedTopicBody) => {
        dispatch(sendSelectedTopic(payload))
      }

    return {
        isLoading,
        allSiteCategoriesData,
        allSiteCategoriesError,
        sentTopicsData,
        fetchAllSiteCategoriesRequest,
        sendSelectedTopicInfo
    };
};