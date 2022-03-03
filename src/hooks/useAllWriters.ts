import { useDispatch, useSelector } from 'react-redux';
import {
    getAllWritersData,
    getIsLoading,
    getAllWritersError,
    getSentAuthorInfoData,
    getSelectedAuthorsDataList,
} from 'src/redux/allWriters/selectors';
import { fetchAllWriters, sendSelectedAuthor,getSelectedAuthors,emptySelectedAuthorsInfo } from 'src/redux/allWriters/action';
import { AllWritersItemType, AllWritersBodyGet, SendSelectedAuthorBody, ResponseMessage,SelectedAuthorDataType } from 'src/redux/allWriters/types';

export interface UseAllWritersReturn {
    isLoading: boolean;
    allWritersData: AllWritersItemType[];
    sentAuthorInfoData: ResponseMessage
    selectedAuthorsData: SelectedAuthorDataType
    allWritersError: string;
    fetchAllWritersRequest(payload: AllWritersBodyGet): void;
    sendSelectedWriterInfo(payload: SendSelectedAuthorBody): void
    getSelectedAuthorsData(): void;
    emptySelectedAuthorsInfoData(): void;
}

export const useAllWriters = (): UseAllWritersReturn => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getIsLoading);
    const allWritersData = useSelector(getAllWritersData);
    const sentAuthorInfoData = useSelector(getSentAuthorInfoData);
    const selectedAuthorsData = useSelector(getSelectedAuthorsDataList);
    const allWritersError = useSelector(getAllWritersError);
    const fetchAllWritersRequest = (payload: AllWritersBodyGet) => {
        dispatch(fetchAllWriters(payload));
    };

    const sendSelectedWriterInfo = (payload: SendSelectedAuthorBody) => {
      dispatch(sendSelectedAuthor(payload))
    }

    const getSelectedAuthorsData = () => {
        dispatch(getSelectedAuthors())
      }
    
      const emptySelectedAuthorsInfoData = () => {
        dispatch(emptySelectedAuthorsInfo())
      };
    

    return {
        isLoading,
        allWritersData,
        sentAuthorInfoData,
        selectedAuthorsData,
        allWritersError,
        fetchAllWritersRequest,
        sendSelectedWriterInfo,
        getSelectedAuthorsData,
        emptySelectedAuthorsInfoData,
    };
};