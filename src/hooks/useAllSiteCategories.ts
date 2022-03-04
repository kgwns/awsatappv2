import { useDispatch, useSelector } from 'react-redux';
import {
    getAllSiteCategoriesData,
    getIsLoading,
    getAllSiteCategoriesError,
    getTopicsData,
    getSelectedTopicsDataList
} from 'src/redux/allSiteCategories/selectors';
import { fetchAllSiteCategories, sendSelectedTopic,getSelectedTopics,emptySelectedTopicsInfo } from 'src/redux/allSiteCategories/action';
import { AllSiteCategoriesItemType, AllSiteCategoriesBodyGet,SelectedTopicsDataType } from 'src/redux/allSiteCategories/types';
import { ResponseMessage, SendSelectedTopicBody } from 'src/redux/allSiteCategories/types';

export interface UseAllSiteCategoriesReturn {
    isLoading: boolean;
    allSiteCategoriesData: AllSiteCategoriesItemType[];
    allSiteCategoriesError: string;
    sentTopicsData: ResponseMessage
    selectedTopicsData : SelectedTopicsDataType;
    fetchAllSiteCategoriesRequest(payload: AllSiteCategoriesBodyGet): void;
    sendSelectedTopicInfo(payload: SendSelectedTopicBody): void
    getSelectedTopicsData(): void;
    emptySelectedTopicsInfoData(): void;
}

export const useAllSiteCategories = (): UseAllSiteCategoriesReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const allSiteCategoriesData = useSelector(getAllSiteCategoriesData);
    const sentTopicsData = useSelector(getTopicsData);
    const allSiteCategoriesError = useSelector(getAllSiteCategoriesError);
    const selectedTopicsData = useSelector(getSelectedTopicsDataList);
    const fetchAllSiteCategoriesRequest = (payload: AllSiteCategoriesBodyGet) => {
        dispatch(fetchAllSiteCategories(payload));
    };
    const sendSelectedTopicInfo = (payload: SendSelectedTopicBody) => {
        dispatch(sendSelectedTopic(payload))
      }

    const getSelectedTopicsData = () => {
        dispatch(getSelectedTopics())
    }

    const emptySelectedTopicsInfoData = () => {
        dispatch(emptySelectedTopicsInfo())
      };

    return {
        isLoading,
        allSiteCategoriesData,
        allSiteCategoriesError,
        sentTopicsData,
        selectedTopicsData,
        fetchAllSiteCategoriesRequest,
        sendSelectedTopicInfo,
        getSelectedTopicsData,
        emptySelectedTopicsInfoData
    };
};